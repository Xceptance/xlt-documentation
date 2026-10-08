import { defineConfig } from "blume";

export default defineConfig({
  title: "Xceptance Documentation",
  description: "Documentation for XLT, XTC, and Neodymium including manuals and how-tos.",

  // Deployment configuration:
  // Configured as pure static output for drop-in hosting on Apache HTTP Server
  // with pre-configured .htaccess URL rewrites, compression, and caching headers.
  deployment: {
    site: "https://docs.xceptance.com",
  },

  // Client-side search indexing powered by Orama:
  // Indexes headings, text sections, and fenced code block contents
  // so developers can search for Java property keys, annotations, and CLI options.
  search: {
    indexing: {
      includeCodeBlocks: true,
    },
  },

  // AI discoverability:
  // Enables reader page actions to open the current document's clean Markdown mirror
  // directly in external web/desktop AI coding assistants.
  ai: {
    openInChat: ["claude", "chatgpt", "cursor"],
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
  },
  markdown: {
    externalLinks: true,
  },
  lastModified: "git",
  export: {
    pdf: true,
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Xceptance Software Technologies GmbH`,
    links: [
      { label: "Blog", href: "https://blog.xceptance.com/" },
      { label: "Xceptance", href: "https://www.xceptance.com/" },
      { label: "Privacy Policy", href: "https://www.xceptance.com/en/privacy-policy.html" },
      { label: "Imprint", href: "https://www.xceptance.com/en/imprint.html" },
    ],
    socials: {
      github: "https://github.com/Xceptance/xlt-documentation",
      linkedin: "https://www.linkedin.com/company/xceptance-software-technologies-gmbh/",
      x: "https://x.com/xceptance",
    },
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
});
