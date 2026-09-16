import { defineConfig } from "blume";

export default defineConfig({
  title: "Xceptance Documentation",
  description: "Documentation for XLT, XTC, and Neodymium including manuals and how-tos.",

  // Server runtime configuration:
  // Both the native Ask AI streaming endpoint (/api/ask) and the Model Context Protocol
  // server (/mcp) require dynamic server execution. We configure server output with
  // the Node adapter bundled directly with Blume.
  deployment: {
    output: "server",
    adapter: "node",
  },

  // The "Was this page helpful?" rating widget is enabled by default in Blume.
  // Disabled for now until an analytics provider (e.g. PostHog, GA4, Plausible)
  // or a custom feedback handler is wired up.
  feedback: false,
  github: {
    owner: "Xceptance",
    repo: "xlt-documentation",
    branch: "master",
  },
  content: {
    root: "content/en",
  },
  navigation: {
    sidebar: {
      display: "group",
    },
    tabs: [
      { label: "XLT", path: "/xlt" },
      { label: "XTC", path: "/xtc" },
      { label: "Neodymium", path: "/neodymium" },
    ],
    featured: [
      { label: "Blog", href: "https://blog.xceptance.com/" },
      { label: "GitHub", href: "https://github.com/Xceptance/xlt-documentation" },
    ],
  },
  logo: {
    image: "/images/xceptance_only.svg",
    text: "Docs",
  },
  theme: {
    accent: "#004682",
    fonts: {
      display: { name: "Roboto Condensed" },
      body: "roboto",
      mono: { name: "Ubuntu Mono" },
    },
  },
  redirects: [
    { from: "/xtc/release-notes", to: "/xtc/xtc-release-notes" },
  ],
  ai: {
    // In-browser Ask AI chat assistant
    ask: {
      enabled: true,
      // Connect to Kilo Gateway via Blume's standard OpenAI-compatible provider
      provider: "openai-compatible",
      baseUrl: process.env.ASK_AI_ENDPOINT?.trim() || "https://api.kilo.ai/api/gateway",
      // SECURITY MANDATE: Only specify the environment variable NAME here.
      // NEVER commit or hardcode the raw API key. It is read from process.env at runtime.
      apiKeyEnv: "KILO_API_KEY",
      // Model routed through Kilo BYOK (Bring Your Own Key) to Google AI Studio
      model: "google/gemini-3.8-flash",

      // Corpus-optimized RAG retrieval sizing:
      // - Corpus analysis of 162 core guides/manuals shows a median page length of 4,067 characters.
      // - excerptChars: 4500 ensures that median technical guide pages fit entirely within the
      //   retrieval window, preventing multi-section code examples, XML snippets, and property
      //   tables from being truncated with ellipses.
      // - contextBudget: 32000 (~8,000 tokens) provides sufficient capacity for the actively viewed
      //   page plus all 6 search hits without premature budget exhaustion ((1 + 6) * 4500 = 31,500 <= 32,000).
      // - maxResults: 6 ensures thorough cross-topic coverage across XLT, XTC, and Neodymium.
      // On Gemini 3.8 Flash (1M+ token window), ~8k tokens incurs negligible latency (<200ms) and cost.
      retrieval: {
        excerptChars: 4500,
        contextBudget: 32000,
        maxResults: 6,
      },
      suggestions: [
        { label: "How do I configure load profiles in XLT?", icon: "sliders" },
        { label: "How do I evaluate test results?", icon: "activity" },
        { label: "How do I configure DNS settings in XLT?", icon: "globe" },
      ],
    },

    // Model Context Protocol (MCP) server
    // Exposes a Streamable-HTTP endpoint at /mcp for developer IDE coding agents
    // (Claude Code, Cursor, VS Code) to search, list, and read documentation directly.
    mcp: {
      enabled: true,
      route: "/mcp",
    },

    // Page actions menu: Direct links to open the active page's Markdown in external AI tools
    openInChat: ["claude", "chatgpt", "cursor"],
  },
});
