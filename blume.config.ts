import { defineConfig } from "blume";

export default defineConfig({
  title: "Xceptance Documentation",
  description: "Documentation for XLT, XTC, and Neodymium including manuals and how-tos.",
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
