#!/usr/bin/env node

/**
 * Unified production runner for XLT Documentation + Vertex AI Gateway.
 *
 * Spawns:
 *   1. scripts/vertex-proxy.mjs (Vertex AI Gateway proxy)
 *   2. blume preview (or built server entrypoint)
 *
 * Forwards signals (SIGINT/SIGTERM) for clean container/server shutdown.
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

let proxyProcess = null;
let serverProcess = null;

function shutdown() {
  if (proxyProcess && !proxyProcess.killed) {
    try {
      proxyProcess.kill("SIGTERM");
    } catch {}
  }
  if (serverProcess && !serverProcess.killed) {
    try {
      serverProcess.kill("SIGTERM");
    } catch {}
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("▶ [Production] Starting Vertex AI Gateway Proxy...");
proxyProcess = spawn(process.execPath, [path.join(__dirname, "vertex-proxy.mjs")], {
  cwd: ROOT_DIR,
  stdio: "inherit",
});

proxyProcess.on("exit", (code) => {
  if (code && code !== 0) {
    console.error(`[Vertex Proxy] Exited with code ${code}`);
    shutdown();
  }
});

setTimeout(() => {
  console.log("▶ [Production] Starting Blume production server...");
  const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
  serverProcess = spawn(npxCmd, ["blume", "preview"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
    env: {
      ...process.env,
    },
  });

  serverProcess.on("exit", (code) => {
    shutdown();
  });
}, 300);

