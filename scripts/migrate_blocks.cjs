const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

const KNOWN_FILES = [
  'project.properties',
  'default.properties',
  'test.properties',
  'my-test.properties',
  'dev.properties',
  'reportgenerator.properties',
  'mastercontroller.properties',
  'agentcontroller.properties',
  'ec2_admin.properties',
  'auto-reporting.properties',
  'jvmargs.cfg',
  'proxy.properties',
  'xlt.properties',
  'dnsservers.properties',
  'dnsmappings.properties'
];

const SHELL_COMMAND_KEYWORDS = [
  /^\s*\$\s+/m,
  /^\s*(npm|pnpm|yarn|mvn|gradle|git|curl|wget|tar|zip|unzip|chmod|chown)\s+/m,
  /^\s*(cd|mkdir|rm|cp|mv|ls|cat|grep|echo|export|source|kill|docker)\s+/m,
  /^\s*\.\/(bin\/|gradlew|mvnw|[a-zA-Z0-9_-]+\.sh|[a-zA-Z0-9_-]+\.cmd|[a-zA-Z0-9_-]+\.bat)/m,
  /^\s*bin\/[a-zA-Z0-9_-]+\.(sh|cmd)/m,
  /^\s*mastercontroller\.(sh|cmd)/m,
  /^\s*agentcontroller\.(sh|cmd)/m,
  /^\s*java\s+/m,
  /Exception:/,
  /Error:/,
  /^\s*at\s+[\w$.]+\(/m
];

function isPropertyLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('!')) return true;

  // Property assignment: key = value or key: value
  // Keys can have dots, underscores, dashes, placeholders like <name>, numbers
  if (/^[a-zA-Z0-9_.-]*(<[^>]+>[a-zA-Z0-9_.-]*)*\s*[:=]/.test(trimmed)) {
    return true;
  }
  // Placeholder key = value like <fully-qualified class name>.<property-name> = <value>
  if (/^<[^>]+>(\.[a-zA-Z0-9_.-<>/]+)*\s*[:=]/.test(trimmed)) {
    return true;
  }
  return false;
}

function isPureProperties(code) {
  const lines = code.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return false;

  for (const regex of SHELL_COMMAND_KEYWORDS) {
    if (regex.test(code)) return false;
  }

  let propCount = 0;
  for (const l of lines) {
    if (l.startsWith('#') || l.startsWith('!')) continue;
    if (isPropertyLine(l)) {
      propCount++;
    } else {
      return false;
    }
  }
  return propCount > 0;
}

function detectTitle(fileText, fenceStart) {
  const preceding = fileText.substring(Math.max(0, fenceStart - 500), fenceStart);

  // First check if any `something.properties` or `*.cfg` is in preceding text
  const customMatch = preceding.match(/([a-zA-Z0-9_.-]+\.properties|[a-zA-Z0-9_.-]+\.cfg)\b/g);
  let bestFile = null;
  let bestIdx = -1;

  const candidates = [...KNOWN_FILES];
  if (customMatch) {
    for (const cm of customMatch) {
      if (!candidates.includes(cm)) candidates.push(cm);
    }
  }

  for (const kf of candidates) {
    const idx = preceding.lastIndexOf(kf);
    if (idx > bestIdx) {
      bestIdx = idx;
      bestFile = kf;
    }
  }

  if (bestFile && (preceding.length - bestIdx) < 350) {
    return bestFile;
  }
  return null;
}

function processFile(filePath, dryRun = true) {
  const text = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Match ```bash or ```sh code blocks
  const fenceRegex = /```(bash|sh)([^\n]*)\n([\s\S]*?)```/g;

  const newText = text.replace(fenceRegex, (match, lang, meta, code, offset) => {
    // If it already has a custom title or non-empty meta, check it
    if (isPureProperties(code)) {
      modified = true;
      const title = detectTitle(text, offset);
      const replacementFence = title ? `\`\`\`properties title="${title}"` : '```properties';
      return `${replacementFence}\n${code}\`\`\``;
    }
    return match;
  });

  if (modified && !dryRun) {
    fs.writeFileSync(filePath, newText, 'utf8');
  }

  return { filePath, modified };
}

module.exports = { walk, processFile, isPureProperties, detectTitle };

if (require.main === module) {
  const dryRun = process.argv.includes('--apply') ? false : true;
  const files = walk('content/en');
  let changedFiles = 0;

  for (const f of files) {
    const { modified } = processFile(f, dryRun);
    if (modified) changedFiles++;
  }

  console.log(`Dry run: ${dryRun}. Files affected: ${changedFiles}`);
}

