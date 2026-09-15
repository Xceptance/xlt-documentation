# Xceptance Documentation Ask AI Service

A lightweight, scale-to-zero serverless proxy connecting the Blume static documentation site with **Google Vertex AI Gemini Context Caching**.

---

## 🏗 Architecture & Overview

```
┌─────────────────────────────────┐
│ Blume Static Site               │
│ https://docs.xceptance.com      │
│ (Hosted on CDN / S3 / Nginx)    │
└────────────────┬────────────────┘
                 │ POST /ask-ai (streaming chunked text)
                 ▼
┌─────────────────────────────────┐
│ Google Cloud Function (Gen 2)   │
│ services/ask-ai/index.js        │
│ (Scales to 0 when idle)         │
└────────────────┬────────────────┘
                 │ Vertex AI SDK (@google/genai)
                 ▼
┌────────────────────────────────────────────────────────┐
│ Google Vertex AI Gemini 2.5 Flash                      │
│ Context Cache (~360,000 tokens from dist/llms-full.txt) │
│ - Sub-second time-to-first-token                       │
│ - 75–85% cheaper than non-cached queries               │
└────────────────────────────────────────────────────────┘
```

1. **Static Docs Site**: Remains 100% static HTML. Zero backend server or persistent daemon to manage for the website.
2. **Serverless Proxy**: Scales down to 0 instances when idle, incurring zero fixed costs. Handles CORS verification, schema checks, and streams raw text chunks directly to Blume's native `useAskAI` hook.
3. **Context Caching**: Holds the entire XLT, XTC, and Neodymium documentation corpus in Google Vertex AI TPUs for up to 30 days.

---

## 🔒 Git Hygiene & Environment Safety

- All actual environment files (`.env`, `.env.development`, `.env.production`) are excluded by `.gitignore` and **must never be committed to Git**.
- Only `.env.example` is tracked, containing generic placeholders (`your-gcp-project-id`).
- Scripts enforce explicit `GCP_PROJECT_ID` configuration: ambient `gcloud` CLI defaults are never used automatically, protecting production caches from accidental modification.

---

## 🚀 Setup & Local Development

### 1. Prerequisites

- Node.js >= 20.0.0
- Google Cloud CLI (`gcloud`) installed and logged in:
  ```bash
  gcloud auth login
  gcloud auth application-default login
  ```
- Vertex AI API enabled in your GCP project:
  ```bash
  gcloud services enable aiplatform.googleapis.com --project="your-project-id"
  ```

### 2. Configure Environment Profile

Copy `.env.example` to an uncommitted `.env.development` file:

```bash
cp .env.example .env.development
```

Edit `.env.development` with your development GCP project ID:

```bash
GCP_PROJECT_ID="antigravity-rbaumgarten"
GCP_REGION="europe-west3"
FUNCTION_NAME="xlt-docs-ask-ai-dev"
ALLOWED_ORIGIN="http://localhost:4321,http://localhost:3000"
GEMINI_MODEL="gemini-2.5-flash"
```

### 3. Build Documentation Corpus

In the documentation root directory, compile the full documentation corpus:

```bash
npm run build
```

This compiles every Markdown page into `dist/llms-full.txt` (~360,000 tokens).

### 4. Run Automated Unit Tests

Run the offline automated test suite (runs 100% locally with zero GCP billing or credentials):

```bash
npm test
```

### 5. Provision / Refresh Context Cache

Ingest the compiled corpus into Vertex AI Context Caching:

```bash
node refresh-cache.mjs dev
```

The script prints the cache resource identifier:
```text
✅ Context Cache successfully created!
   Cache Name:   projects/123456789/locations/europe-west3/cachedContents/987654321
```

Copy the cache name and save it into `.env.development`:
```bash
GEMINI_CACHE_NAME="projects/123456789/locations/europe-west3/cachedContents/987654321"
```

### 6. Run Local Cloud Function Server

Start the local server using Functions Framework on port 8080:

```bash
npm run dev
```

You can test queries directly using `curl`:

```bash
curl -X POST http://localhost:8080 \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4321" \
  -d '{
    "messages": [
      { "role": "user", "content": "How do I configure DNS in XLT?" }
    ]
  }'
```

### 7. Run Documentation Site with Ask AI

In the repository root:

```bash
ASK_AI_ENDPOINT="http://localhost:8080" npm run dev
```

Open `http://localhost:4321` and click the **Ask AI** button or starter questions in the search modal!

---

## 🚢 Cloud Deployment

### Deploying Development Function

Deploy your development profile to Google Cloud Functions (Gen 2):

```bash
./deploy.sh dev
```

The script outputs the live HTTPS endpoint URL.

### Deploying Production Function

When transitioning to a dedicated company Google Cloud project:

1. Provision the company GCP project (e.g. `xceptance-docs-prod`).
2. Grant the Cloud Functions runtime service account the `roles/aiplatform.user` IAM role.
3. Create `.env.production`:
   ```bash
   GCP_PROJECT_ID="xceptance-docs-prod"
   GCP_REGION="europe-west3"
   FUNCTION_NAME="xlt-docs-ask-ai"
   ALLOWED_ORIGIN="https://docs.xceptance.com"
   GEMINI_MODEL="gemini-2.5-flash"
   ```
4. Build the latest documentation and refresh the production cache:
   ```bash
   npm run build
   node refresh-cache.mjs prod
   ```
5. Deploy to production:
   ```bash
   ./deploy.sh prod
   ```
6. Set the production function URL in your docs deployment pipeline / hosting environment:
   ```bash
   export ASK_AI_ENDPOINT="https://europe-west3-xceptance-docs-prod.cloudfunctions.net/xlt-docs-ask-ai"
   ```

---

## 🔄 Model Versioning & Upgrades

Context Caching stores neural activation weights generated by a specific model checkpoint. Therefore:

> **Important Rule:** `refresh-cache.mjs` and `index.js` **must** always use the exact same `GEMINI_MODEL`.

### How to Upgrade to a Newer Model:

1. Update `GEMINI_MODEL` in your `.env.*` file (e.g. `GEMINI_MODEL="gemini-2.5-flash"` or newer).
2. Re-run `node refresh-cache.mjs [dev|prod]` to provision a new cache with the upgraded model architecture.
3. Update `GEMINI_CACHE_NAME` with the newly returned cache ID.
4. Redeploy via `./deploy.sh [dev|prod]`.

