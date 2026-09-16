import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const CONTENT_ROOT = path.resolve("content/en");

function walk(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, list);
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      list.push(fullPath);
    }
  }
  return list;
}

function stripNumericPrefix(segment) {
  return segment.replace(/^\d+[-_.]/u, "");
}

function computeBlumeRoute(relFromRoot) {
  const parsed = path.parse(relFromRoot);
  const segments = parsed.dir ? parsed.dir.split("/") : [];
  if (parsed.name !== "_index" && parsed.name !== "index") {
    let name = parsed.name;
    if (parsed.dir.includes("release-notes") && /^\d+_\d+_x$/.test(name)) {
      name = "v" + name;
    }
    segments.push(name);
  }
  const cleanSegments = segments.map(stripNumericPrefix);
  const r = "/" + cleanSegments.join("/");
  return r === "/" ? "" : r;
}

// 1. Build lookup index
const allFiles = walk(CONTENT_ROOT);
const fileIndex = new Map();
const basenameIndex = new Map();
const sectionBasenameIndex = new Map();

for (const filePath of allFiles) {
  const relFromRoot = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
  const parsed = path.parse(relFromRoot);
  
  // Canonical Blume route
  const routePath = computeBlumeRoute(relFromRoot);

  const record = {
    filePath,
    relFromRoot,
    routePath,
    basename: parsed.name,
    ext: parsed.ext,
    dir: parsed.dir,
  };

  fileIndex.set(relFromRoot, record);
  fileIndex.set(relFromRoot.replace(/\.(md|mdx)$/, ""), record);
  if (!relFromRoot.startsWith("/")) {
    fileIndex.set("/" + relFromRoot, record);
    fileIndex.set("/" + relFromRoot.replace(/\.(md|mdx)$/, ""), record);
  }

  // Also index with 'v' prefix for release notes
  if (parsed.dir.includes("release-notes") && /^\d+_\d+_x$/.test(parsed.name)) {
    const vName = "v" + parsed.name;
    const vRel = path.posix.join(parsed.dir, vName);
    fileIndex.set(vRel, record);
    fileIndex.set("/" + vRel, record);
    if (!basenameIndex.has(vName)) basenameIndex.set(vName, []);
    basenameIndex.get(vName).push(record);
  }

  // Group by basename
  if (!basenameIndex.has(parsed.name)) {
    basenameIndex.set(parsed.name, []);
  }
  basenameIndex.get(parsed.name).push(record);

  // Group by section + basename
  const section = parsed.dir.split("/")[0] || "";
  const secKey = `${section}:${parsed.name}`;
  if (!sectionBasenameIndex.has(secKey)) {
    sectionBasenameIndex.set(secKey, []);
  }
  sectionBasenameIndex.get(secKey).push(record);
}

function formatRouteWithAnchor(routePath, anchor) {
  if (anchor) return `${routePath}${anchor}`;
  return routePath ? `${routePath}/` : "/";
}

function resolveRelref(target, currentFilePath) {
  let [targetPath, anchor] = target.split("#");
  anchor = anchor ? `#${anchor}` : "";

  // If empty path, it's just an anchor on current page
  if (!targetPath) {
    return anchor || "#";
  }

  targetPath = targetPath.trim();

  // If path already starts with http:// or https:// or mailto:
  if (/^(https?:|mailto:)/.test(targetPath)) {
    return targetPath + anchor;
  }

  // Strip leading and trailing slashes for lookup
  let cleanTarget = targetPath.replace(/^\/+/, "").replace(/\/+$/, "");

  // If target points to xlt/release-notes/<N>_<M>_x, normalize to v<N>_<M>_x
  cleanTarget = cleanTarget.replace(/(release-notes\/)(\d+_\d+_x)/, "$1v$2");
  if (/^\d+_\d+_x(\.md|\.mdx)?$/.test(cleanTarget)) {
    cleanTarget = "v" + cleanTarget;
  }

  // 1. Direct match in fileIndex
  if (fileIndex.has(cleanTarget)) {
    return formatRouteWithAnchor(fileIndex.get(cleanTarget).routePath, anchor);
  }
  if (fileIndex.has("/" + cleanTarget)) {
    return formatRouteWithAnchor(fileIndex.get("/" + cleanTarget).routePath, anchor);
  }

  // 2. Relative from current directory
  const currentRel = path.relative(CONTENT_ROOT, currentFilePath).replace(/\\/g, "/");
  const currentDir = path.dirname(currentRel);
  const resolvedRelative = path.posix.normalize(path.posix.join(currentDir, cleanTarget)).replace(/^\/+/, "");
  if (fileIndex.has(resolvedRelative)) {
    return formatRouteWithAnchor(fileIndex.get(resolvedRelative).routePath, anchor);
  }
  if (fileIndex.has(resolvedRelative.replace(/\.(md|mdx)$/, ""))) {
    return formatRouteWithAnchor(fileIndex.get(resolvedRelative.replace(/\.(md|mdx)$/, "")).routePath, anchor);
  }

  // 3. Basename match within same top-level section
  const currentSection = currentDir.split("/")[0] || "";
  const targetBase = path.basename(cleanTarget, path.extname(cleanTarget));
  const secKey = `${currentSection}:${targetBase}`;
  if (sectionBasenameIndex.has(secKey)) {
    const records = sectionBasenameIndex.get(secKey);
    return formatRouteWithAnchor(records[0].routePath, anchor);
  }

  // 4. Global basename match
  if (basenameIndex.has(targetBase)) {
    const records = basenameIndex.get(targetBase);
    return formatRouteWithAnchor(records[0].routePath, anchor);
  }

  // 5. Special root sections or fallbacks
  if (targetPath === "/xlt/" || targetPath === "xlt" || targetPath === "xlt/") return "/xlt/" + anchor;
  if (targetPath === "/xtc/" || targetPath === "xtc" || targetPath === "xtc/") return "/xtc/" + anchor;
  if (targetPath === "/neodymium/" || targetPath === "neodymium" || targetPath === "neodymium/") return "/neodymium/" + anchor;

  // Fallback: return as root-relative path
  return (targetPath.startsWith("/") ? targetPath : "/" + targetPath) + anchor;
}

const collectedAliases = [];

// 2. Process all files
for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, "utf8");

  // A. Frontmatter
  let hasFrontmatter = false;
  let frontmatterObj = {};
  let body = content;

  if (content.startsWith("---")) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (match) {
      hasFrontmatter = true;
      const yamlStr = match[1];
      body = content.slice(match[0].length);
      try {
        frontmatterObj = yaml.parse(yamlStr) || {};
      } catch (e) {
        console.warn(`Warning: Failed to parse frontmatter in ${filePath}:`, e.message);
      }
    }
  }

  if (hasFrontmatter) {
    // Map linkTitle or linktitle -> sidebar.label
    const linkTitleVal = frontmatterObj.linkTitle || frontmatterObj.linktitle;
    if (linkTitleVal) {
      if (!frontmatterObj.sidebar) frontmatterObj.sidebar = {};
      if (typeof frontmatterObj.sidebar === "object") {
        frontmatterObj.sidebar.label = String(linkTitleVal);
      }
      delete frontmatterObj.linkTitle;
      delete frontmatterObj.linktitle;
    }

    // Map weight -> sidebar.order
    if (frontmatterObj.weight !== undefined) {
      if (!frontmatterObj.sidebar) frontmatterObj.sidebar = {};
      if (typeof frontmatterObj.sidebar === "object") {
        const num = Number(frontmatterObj.weight);
        frontmatterObj.sidebar.order = isNaN(num) ? frontmatterObj.weight : num;
      }
      delete frontmatterObj.weight;
    }

    // Remove duplicate sidebar.order on section index pages to avoid colliding with child pages
    const parsedPath = path.parse(filePath);
    if (parsedPath.name === "_index" || parsedPath.name === "index") {
      if (frontmatterObj.sidebar && frontmatterObj.sidebar.order !== undefined) {
        delete frontmatterObj.sidebar.order;
        if (Object.keys(frontmatterObj.sidebar).length === 0) {
          delete frontmatterObj.sidebar;
        }
      }
    }

    // Fix specific known identical orders in sibling files
    if (parsedPath.name === "155-lt-settings") {
      if (!frontmatterObj.sidebar) frontmatterObj.sidebar = {};
      frontmatterObj.sidebar.order = 155;
    }
    if (parsedPath.name === "get-the-right-mix") {
      if (!frontmatterObj.sidebar) frontmatterObj.sidebar = {};
      frontmatterObj.sidebar.order = 35;
    }
    if (parsedPath.name === "run-a-test") {
      if (!frontmatterObj.sidebar) frontmatterObj.sidebar = {};
      frontmatterObj.sidebar.order = 35;
    }

    // Force description to be a double-quoted string in YAML to avoid Date parser in js-yaml
    if (frontmatterObj.description !== undefined && frontmatterObj.description !== null) {
      const descVal = frontmatterObj.description instanceof Date
        ? frontmatterObj.description.toISOString().slice(0, 10)
        : String(frontmatterObj.description);
      const descScalar = new yaml.Scalar(descVal);
      descScalar.type = "QUOTE_DOUBLE";
      frontmatterObj.description = descScalar;
    }

    // Collect aliases for redirects
    if (frontmatterObj.aliases && Array.isArray(frontmatterObj.aliases)) {
      const relFromRoot = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
      const targetRoute = "/" + relFromRoot.replace(/_index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");
      for (const alias of frontmatterObj.aliases) {
        collectedAliases.push({ from: alias, to: targetRoute });
      }
      delete frontmatterObj.aliases;
    }

    // Remove legacy Hugo keys
    delete frontmatterObj.type;
    delete frontmatterObj.sitemap;
    delete frontmatterObj.resources;
    delete frontmatterObj.cascade;
    delete frontmatterObj.tags;
    delete frontmatterObj.last_updated;
    delete frontmatterObj.toc;
    delete frontmatterObj.layout;
    delete frontmatterObj.url;
    delete frontmatterObj.aliases;
  }

  // B. Body transformations

  // Cleanup any malformed spans from earlier run
  body = body.replace(/<span style=\{\{ color: "([^"]*)" \}\}>}([\s\S]*?)<\/span>}/g, '<span style={{ color: "$1" }}>$2</span>');

  // Handle Hugo comment shortcodes: {{</* ... */>}} and {{%/* ... */%}}
  body = body.replace(/\{\{([%<])\/\*([\s\S]*?)\*\/\1\}\}/g, (match, d, inner) => `\`{{${d}${inner}${d}}}\``);

  // 1. Permission shortcode
  body = body.replace(/\{\{[%<]\s*permission\b([\s\S]*?)[%>]\}\}/g, (match, attrsStr) => {
    const getAttr = (name) => {
      const m = attrsStr.match(new RegExp(`${name}="([^"]*)"`));
      return m ? m[1] : "";
    };
    const type = getAttr("type") || "project";
    const least = getAttr("least");
    const role = getAttr("role") || "reviewer";
    const action = getAttr("action");

    const article = role === "organization administrator" ? "an" : "a";
    const link = type === "project"
      ? "/xtc/basics/050-projects/#user-roles-within-a-project"
      : "/xtc/basics/045-organizations/#user-roles-within-an-organization";
    const scope = type === "project" ? "project." : "organization.";
    const actionText = action ? `To ${action},` : "To use this feature,";
    const leastText = least === "true" ? "at least " : "";

    return `:::info[Role Required]\n${actionText} your account must ${leastText}have the role of ${article} [${role}](${link}) within the ${scope}\n:::`;
  });

  // 2. Note / Warning / Tip / Danger admonitions
  body = body.replace(/\{\{[%<]\s*(note|warning|tip|danger)\b([^%>]*)[%>]\}\}/gi, (match, type, rest) => {
    const lowerType = type.toLowerCase();
    const titleMatch = rest.match(/title="([^"]*)"/i) || rest.match(/"([^"]+)"/);
    if (titleMatch && titleMatch[1]) {
      return `:::${lowerType}[${titleMatch[1]}]`;
    }
    return `:::${lowerType}`;
  });

  body = body.replace(/\{\{\s*[%<]?\s*\/+\s*(?:note|warning|tip|danger)\s*[%<]?\s*\}\}/gi, ":::");

  // 3. Image & Imageres shortcodes
  body = body.replace(/\{\{[<]\s*(?:image|imageres)\b([^>]*?)(?:\s*\/>|>([\s\S]*?)\{\{[<]\s*\/(?:image|imageres)\s*[>]\}\}|>)/gi, (match, attrsStr, innerCaption) => {
    const srcMatch = attrsStr.match(/src="([^"]+)"/);
    if (!srcMatch) return match;
    let src = srcMatch[1];
    if (!src.startsWith("/")) {
      src = "/images/" + src;
    } else if (!src.startsWith("/images/")) {
      src = "/images" + src;
    }

    const caption = (innerCaption || "").trim();
    if (caption) {
      return `![${caption}](${src})\n\n*${caption}*`;
    }
    return `![](${src})`;
  });

  // 4. Kbd shortcode
  body = body.replace(/\{\{[%<]\s*kbd\s*[%>]\}\}([\s\S]*?)\{\{[%<]\s*\/?\s*kbd\s*[%>]\}\}/gi, "<kbd>$1</kbd>");

  // 5. Ctext shortcode
  body = body.replace(/\{\{[%<]\s*ctext(?:\s+color="([^"]*)")?\s*[%>]\}\}([\s\S]*?)\{\{[%<]\s*\/ctext\s*[%>]\}\}/gi, (match, color, inner) => {
    const c = color || "#888";
    return `<span style={{ color: "${c}" }}>${inner}</span>`;
  });

  // 6. TODO shortcode (MDX uses JSX comments)
  body = body.replace(/\{\{[%<]\s*TODO(?:\s+comment="([^"]*)")?\s*\/\s*[%>]\}\}/gi, (match, comment) => {
    const comm = comment ? `TODO: ${comment}` : "TODO";
    return `{/* ${comm} */}`;
  });
  body = body.replace(/\{\{[%<]\s*TODO(?:\s+comment="([^"]*)")?\s*[%>]\}\}([\s\S]*?)\{\{[%<]\s*\/TODO\s*[%>]\}\}/gi, (match, comment, inner) => {
    const comm = comment ? `${comment}: ` : "";
    return `{/* TODO: ${comm}${inner} */}`;
  });

  // Convert HTML comments to JSX comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Convert void tags to self-closing
  body = body.replace(/<br\s*(?!\/)>/gi, '<br />');
  body = body.replace(/<hr\s*(?!\/)>/gi, '<hr />');

  // Fix unquoted heading id attributes (e.g. <h4 id=example1>)
  body = body.replace(/<(h[1-6])\s+id=([^"'\s>]+)>/gi, '<$1 id="$2">');

  // Fix unescaped bracketed placeholders in text
  body = body.replace(/<path to WebDriver>/g, '`<path to WebDriver>`');

  // Lowercase code block language identifiers for Shiki compatibility
  body = body.replace(/^```([A-Za-z0-9_-]+)/gm, (match, lang) => {
    return '```' + lang.toLowerCase();
  });

  // 7. Relref and Ref shortcodes
  body = body.replace(/\{\{[%<]\s*(?:relref|ref)\s+(?:path=)?["']([^"']+)["']\s*[%>]\}\}/g, (match, target) => {
    return resolveRelref(target, filePath);
  });

  // Fix leftover braces in links: [text](url}) -> [text](url)
  body = body.replace(/\]\(([^)\s]+?)\}\)/g, ']($1)');

  // Fix autolinks: <https://...> -> [https://...](https://...)
  body = body.replace(/<(https?:\/\/[^\s>]+)>/g, '[$1]($1)');

  // Fix leftover }} from image shortcodes
  body = body.replace(/!\[\s*\}\}\s*/g, '![');
  body = body.replace(/^\s*\*\s*\}\}\s*/gm, '*');

  // Fix release-notes links: /xlt/release-notes/<N>_<M>_x -> /xlt/release-notes/v<N>_<M>_x
  body = body.replace(/\/xlt\/release-notes\/(\d+_\d+_x)/g, '/xlt/release-notes/v$1');

  // Fix XTC numeric prefixes in links:
  // e.g. /xtc/basics/050-projects/ -> /xtc/basics/projects/
  body = body.replace(/\/(xtc\/(?:basics|integrations|loadtesting|monitoring))\/(\d{2,3})-([a-zA-Z0-9_-]+)/g, '/$1/$3');

  // Fix quick-start demo application link:
  body = body.replace(/\.\.\/\.\.\/quick-start\/20-demo-application\/?/g, '/xlt/quick-start/demo-application/');

  // Fix how-to test run links:
  body = body.replace(/\.\.\/\.\.\/how-tos\/intellij-test-run\/?/g, '/xlt/how-tos/intelliJ-test-run/');
  body = body.replace(/\.\.\/\.\.\/how-tos\/vs-code-test-run\/?/g, '/xlt/how-tos/VS-Code-test-run/');

  // Fix release notes root relative link:
  body = body.replace(/\/(\.\.\/)+release-notes\/?/g, '/xlt/release-notes/');

  // Fix section-relative root links in Neodymium:
  if (filePath.includes('/neodymium/')) {
    body = body.replace(/\]\(\/quick-start\/?\)/g, '](/neodymium/quick-start/)');
    body = body.replace(/\]\(\/browsers\/?\)/g, '](/neodymium/browsers/)');
    // Neodymium GitHub wiki relative links in release notes
    if (filePath.includes('/release-notes/')) {
      body = body.replace(/\]\(WorkInProgress\)/g, '](/neodymium/features/wip-annotation/)');
      body = body.replace(/\]\((JUnit#JUnit5|testrecording|Multi-browser-support[^)]*|Neodymium-configuration-properties[^)]*|Neodymium-context[^)]*|Test-data-provider[^)]*|Utility-classes[^)]*|Logging|Reports[^)]*|Advanced%20Screenshots|Popup-Blocker|Seperate-Browser-Sessions)\)/g, '](https://github.com/Xceptance/neodymium/wiki/$1)');
    }
  }

  // Fix section-relative root links in XLT:
  if (filePath.includes('/xlt/')) {
    body = body.replace(/\]\(\/manual\/?\)/g, '](/xlt/manual/)');
    body = body.replace(/\]\(\/load-testing\/?\)/g, '](/xtc/loadtesting/)');
    body = body.replace(/\]\(\.\.\/\.\.\/load-testing\/?\)/g, '](/xtc/loadtesting/)');
    body = body.replace(/\]\(\/?(?:xlt\/)?basics\/?#/g, '](/xlt/manual/xlt-basics#');
  }

  // Fix accidental nested backticks in inline code: `foo `${bar}` baz` -> `foo ${bar} baz`
  body = body.replace(/`([^`\n]*?)`\$\{([^}]+)\}`([^`\n]*?)`/g, '`$1\${$2}$3`');
  body = body.replace(/`([^`\n]*?)`@\{([^}]+)\}`([^`\n]*?)`/g, '`$1@{$2}$3`');
  body = body.replace(/`([^`\n]*?)`\$\{([^}]+)\}`([^`\n]*?)`/g, '`$1\${$2}$3`');

  // Fix <code>{...}</code> tags containing curly braces
  body = body.replace(/<code>\{([^}]+)\}<\/code>/g, '`{$1}`');

  // Fix < followed by digit (e.g. <40% -> &lt;40%)
  body = body.replace(/<(\d)/g, '&lt;$1');

  // Wrap ellipsis placeholders in backticks so MDX doesn't parse them as JSX expressions
  body = body.replace(/\$\{…\}/g, '`\${…}`');
  body = body.replace(/@\{…\}/g, '`@{…}`');

  // Fix curly braced placeholders like “{u:1}” or “{n:0}”
  body = body.replace(/[“"]\{([a-zA-Z0-9_:-]+)\}[”"]/g, '“`{$1}`”');

  // Reassemble file
  let newFileContent = "";
  if (hasFrontmatter) {
    const yamlString = yaml.stringify(frontmatterObj).trim();
    newFileContent = `---\n${yamlString}\n---\n\n${body.trimStart()}`;
  } else {
    newFileContent = body;
  }

  // Determine target path and extension
  const parsedPath = path.parse(filePath);
  const containsDirectives = /:::([a-z]+)/.test(body) || /<span style=\{\{/.test(body);

  let newName = parsedPath.name;
  let newExt = parsedPath.ext;

  // In Blume, section index files must be index.md / index.mdx (not _index.md)
  if (newName === "_index") {
    newName = "index";
  }

  // In xlt/release-notes, prefix version files with 'v' if not already
  if (parsedPath.dir.endsWith("xlt/release-notes") && /^\d+_\d+_x$/.test(newName)) {
    newName = "v" + newName;
  }

  // Blume requires .mdx for directives and JSX
  if (containsDirectives) {
    newExt = ".mdx";
  }

  const targetPath = path.join(parsedPath.dir, newName + newExt);

  // Write new content
  fs.writeFileSync(targetPath, newFileContent, "utf8");

  // If file was renamed, remove the original file
  if (targetPath !== filePath) {
    fs.unlinkSync(filePath);
  }
}

console.log(`Migration codemod complete. Processed ${allFiles.length} files.`);
console.log("Collected Aliases:", JSON.stringify(collectedAliases, null, 2));
