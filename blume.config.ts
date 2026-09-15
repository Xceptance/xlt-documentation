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
  theme: {
    accent: "#a00000",
    fonts: {
      display: { name: "Outfit" },
      body: "inter",
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
