#!/usr/bin/env node
/**
 * Refresh Gemini Context Cache for Xceptance Documentation
 *
 * This script reads the compiled documentation corpus from `dist/llms-full.txt`
 * and provisions a long-lived CachedContent resource in Google Vertex AI.
 *
 * Requirements:
 * - GCP_PROJECT_ID must be set explicitly. Silent gcloud defaults are prohibited
 *   to avoid accidental modification of production resources.
 * - Model: gemini-2.5-flash (or newest model supporting context caching).
 *   NOTE: The model used here MUST match the GEMINI_MODEL used by index.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Basic .env file parser to load local untracked configs without external dependencies.
 */
function loadEnvFile(envPath) {
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Check for target environment profile (e.g. node refresh-cache.mjs dev or .env.development)
const envArg = process.argv[2];
if (envArg) {
  if (envArg === 'dev' || envArg === 'development') {
    loadEnvFile(path.join(__dirname, '.env.development'));
  } else if (envArg === 'prod' || envArg === 'production') {
    loadEnvFile(path.join(__dirname, '.env.production'));
  } else {
    loadEnvFile(path.resolve(process.cwd(), envArg));
  }
} else {
  loadEnvFile(path.join(__dirname, '.env'));
  loadEnvFile(path.join(__dirname, '.env.development'));
}

// 1. Strict Project ID Enforcement (No ambient gcloud fallback)
const projectId = process.env.GCP_PROJECT_ID;
if (!projectId || projectId === 'your-gcp-project-id') {
  console.error('\n❌ Error: GCP_PROJECT_ID is required but not set.');
  console.error('Please configure your project ID in an uncommitted local .env file (e.g. .env.development)');
  console.error('or export GCP_PROJECT_ID="your-project-id" before running.');
  console.error('(Dynamic gcloud CLI guessing is disabled to protect production caches from accidental corruption).\n');
  process.exit(1);
}

// Populate standard Google SDK environment variables to prevent google-auth-library
// from probing the unreachable GCE metadata server (169.254.169.254) on local machines,
// which would cause a 60-75 second TCP timeout hang before completing.
process.env.GOOGLE_CLOUD_PROJECT = projectId;
process.env.GCLOUD_PROJECT = projectId;

const region = process.env.GCP_REGION || 'europe-west3';

// 2. Model Selection
// Default to gemini-2.5-flash (or latest model with Vertex AI Context Caching support).
// Context Caching requires the query model in index.js to match this model exactly.
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// 3. Locate compiled corpus
const possiblePaths = [
  path.resolve(__dirname, '../../dist/llms-full.txt'),
  path.resolve(process.cwd(), 'dist/llms-full.txt'),
  path.resolve(__dirname, 'dist/llms-full.txt'),
];

let corpusPath = process.env.LLMS_FULL_PATH || possiblePaths.find((p) => fs.existsSync(p));

if (!corpusPath || !fs.existsSync(corpusPath)) {
  console.error(`\n❌ Error: Compiled documentation corpus not found at:`);
  possiblePaths.forEach((p) => console.error(`  - ${p}`));
  console.error('\nPlease run "npm run build" in the documentation repository root first.\n');
  process.exit(1);
}

console.log(`\n📚 Reading documentation corpus from: ${corpusPath}`);
const corpusText = fs.readFileSync(corpusPath, 'utf-8');
const charCount = corpusText.length;
const estimatedTokens = Math.round(charCount / 4);

console.log(`📊 Corpus size: ${charCount.toLocaleString()} characters (~${estimatedTokens.toLocaleString()} tokens)`);

if (estimatedTokens < 32768) {
  console.warn(`⚠️ Warning: Estimated tokens (${estimatedTokens}) is below Vertex AI Context Caching minimum (32,768 tokens).`);
}

console.log(`🚀 Provisioning Vertex AI Context Cache:`);
console.log(`   Project:  ${projectId}`);
console.log(`   Region:   ${region}`);
console.log(`   Model:    ${modelName}`);
console.log(`   TTL:      30 days (2,592,000s)\n`);

const ai = new GoogleGenAI({ vertexai: true, project: projectId, location: region });

try {
  const cache = await ai.caches.create({
    model: modelName,
    config: {
      displayName: `xlt-docs-${Date.now()}`,
      ttl: '2592000s', // 30 days
      contents: [
        {
          role: 'user',
          parts: [{ text: corpusText }],
        },
      ],
    },
  });

  console.log(`✅ Context Cache successfully created!`);
  console.log(`   Cache Name:   ${cache.name}`);
  console.log(`   Model:        ${cache.model}`);
  console.log(`   Expire Time:  ${cache.expireTime || 'in 30 days'}`);
  console.log(`\nTo use this cache with your Cloud Function:`);
  console.log(`   export GEMINI_CACHE_NAME="${cache.name}"`);
  console.log(`   Or set GEMINI_CACHE_NAME="${cache.name}" in your local .env or Cloud Run environment.\n`);
} catch (err) {
  console.error(`\n❌ Failed to create Vertex AI context cache:`, err.message || err);
  process.exit(1);
}

