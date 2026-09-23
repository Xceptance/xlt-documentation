#!/usr/bin/env node

/**
 * Unified development runner for XLT Documentation + Vertex AI Gateway.
 *
 * Spawns:
 *   1. scripts/vertex-proxy.mjs (port 4000)
 *   2. blume dev (Blume docs development server)
 *
 * Forwards signals (SIGINT/SIGTERM) for clean child process termination.
 */

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

let proxyProcess = null;
let blumeProcess = null;

function shutdown() {
  if (proxyProcess && !proxyProcess.killed) {
    try {
      proxyProcess.kill("SIGTERM");
    } catch {}
  }
  if (blumeProcess && !blumeProcess.killed) {
    try {
      blumeProcess.kill("SIGTERM");
    } catch {}
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("▶ Starting Vertex AI Gateway Proxy...");
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

// Give proxy ~300ms to bind port before launching Blume
setTimeout(() => {
  console.log("▶ Starting Blume development server...");
  const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
  blumeProcess = spawn(npxCmd, ["blume", "dev"], {
    cwd: ROOT_DIR,
    stdio: "inherit",
    env: {
      ...process.env,
    },
  });

  blumeProcess.on("exit", (code) => {
    shutdown();
  });
}, 300);

