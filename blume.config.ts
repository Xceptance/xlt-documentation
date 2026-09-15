import { defineConfig } from "blume";

export default defineConfig({
  title: "Xceptance Documentation",
  description: "Documentation for XLT, XTC, and Neodymium including manuals and how-tos.",
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
});
