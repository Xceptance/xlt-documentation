#!/usr/bin/env bash
# ==============================================================================
# Deploy Ask AI Serverless Proxy to Google Cloud Functions (Gen 2)
#
# Usage:
#   ./deploy.sh dev    # Deploys development profile using .env.development
#   ./deploy.sh prod   # Deploys production profile using .env.production
#   ./deploy.sh        # Deploys using .env or active environment variables
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_ENV="${1:-dev}"

# Load environment configuration profile if file exists
if [[ "${TARGET_ENV}" == "prod" || "${TARGET_ENV}" == "production" ]]; then
  ENV_FILE="${SCRIPT_DIR}/.env.production"
elif [[ "${TARGET_ENV}" == "dev" || "${TARGET_ENV}" == "development" ]]; then
  ENV_FILE="${SCRIPT_DIR}/.env.development"
else
  ENV_FILE="${SCRIPT_DIR}/.env"
fi

if [[ -f "${ENV_FILE}" ]]; then
  echo "📄 Loading environment profile: ${ENV_FILE}"
  # Export non-comment lines
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
elif [[ -f "${SCRIPT_DIR}/.env" ]]; then
  echo "📄 Loading fallback .env: ${SCRIPT_DIR}/.env"
  set -a
  # shellcheck disable=SC1091
  source "${SCRIPT_DIR}/.env"
  set +a
fi

# ==============================================================================
# Strict Project ID Enforcement
# Automatic fallback to ambient `gcloud config get-value project` is disabled
# to ensure developers and CI never accidentally deploy to or mutate the wrong project.
# ==============================================================================
if [[ -z "${GCP_PROJECT_ID:-}" || "${GCP_PROJECT_ID:-}" == "your-gcp-project-id" ]]; then
  echo "" >&2
  echo "❌ Error: GCP_PROJECT_ID is required but not set." >&2
  echo "Please set GCP_PROJECT_ID in your uncommitted local environment file:" >&2
  echo "  ${ENV_FILE}" >&2
  echo "or export it before invoking deploy.sh:" >&2
  echo "  export GCP_PROJECT_ID=\"your-project-id\"" >&2
  echo "(Dynamic gcloud CLI guessing is disabled to prevent accidental production pollution)." >&2
  echo "" >&2
  exit 1
fi

GCP_REGION="${GCP_REGION:-europe-west3}"

# Function name configuration
if [[ "${TARGET_ENV}" == "dev" || "${TARGET_ENV}" == "development" ]]; then
  FUNCTION_NAME="${FUNCTION_NAME:-xlt-docs-ask-ai-dev}"
  ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-http://localhost:4321,http://localhost:3000}"
else
  FUNCTION_NAME="${FUNCTION_NAME:-xlt-docs-ask-ai}"
  ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-https://docs.xceptance.com}"
fi

# ==============================================================================
# Model Selection and Context Caching Synchronization:
# Default: gemini-2.5-flash (or latest model supporting Vertex AI Context Caching)
# IMPORTANT: The model specified here MUST match the model used when creating
# the cache via `npm run refresh-cache`. If you upgrade this model, re-run
# `npm run refresh-cache` with the same model to provision compatible KV weights.
# ==============================================================================
GEMINI_MODEL="${GEMINI_MODEL:-gemini-2.5-flash}"
GEMINI_CACHE_NAME="${GEMINI_CACHE_NAME:-}"

echo "================================================================================"
echo "🚀 Deploying Ask AI Cloud Function"
echo "   Target Profile:   ${TARGET_ENV}"
echo "   Project ID:       ${GCP_PROJECT_ID}"
echo "   Region:           ${GCP_REGION}"
echo "   Function Name:    ${FUNCTION_NAME}"
echo "   Allowed Origin:   ${ALLOWED_ORIGIN}"
echo "   Gemini Model:     ${GEMINI_MODEL}"
echo "   Context Cache:    ${GEMINI_CACHE_NAME:-[None - standard context]}"
echo "================================================================================"

gcloud functions deploy "${FUNCTION_NAME}" \
  --gen2 \
  --runtime=nodejs22 \
  --region="${GCP_REGION}" \
  --source="${SCRIPT_DIR}" \
  --entry-point=askAi \
  --trigger-http \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=10 \
  --memory=512Mi \
  --timeout=60s \
  --project="${GCP_PROJECT_ID}" \
  --set-env-vars="GCP_PROJECT_ID=${GCP_PROJECT_ID},GCP_REGION=${GCP_REGION},ALLOWED_ORIGIN=${ALLOWED_ORIGIN},GEMINI_MODEL=${GEMINI_MODEL},GEMINI_CACHE_NAME=${GEMINI_CACHE_NAME}"

echo ""
echo "✅ Deployment complete!"
echo "Function endpoint URL:"
ENDPOINT_URL=$(gcloud functions describe "${FUNCTION_NAME}" --gen2 --region="${GCP_REGION}" --project="${GCP_PROJECT_ID}" --format='value(serviceConfig.uri)')
echo "  ${ENDPOINT_URL}"
echo ""
echo "To connect your Blume docs site to this endpoint:"
echo "  export ASK_AI_ENDPOINT=\"${ENDPOINT_URL}\""
echo ""

