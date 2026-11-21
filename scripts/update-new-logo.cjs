const fs = require('fs');
const path = require('path');

// 1. The new Master SVG Vector Logo for 翻墙怪 (Fan Qiang Guai)
const newSvgCode = `<svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#19593c"/>
      <stop offset="100%" stop-color="#0e3624"/>
    </linearGradient>
    <linearGradient id="fqg-horn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

// Standalone SVG for assets/favicon.svg
const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#19593c"/>
      <stop offset="100%" stop-color="#0e3624"/>
    </linearGradient>
    <linearGradient id="fqg-horn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

fs.writeFileSync('assets/favicon.svg', faviconSvgContent);
console.log('✓ Updated assets/favicon.svg');

// Inline Data URI (Bypasses Chrome cache on file://)
const dataUri = `data:image/svg+xml,${encodeURIComponent(faviconSvgContent)}`;

// Scan all HTML files
function getHtmlFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      getHtmlFiles(p, list);
    } else if (item.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const htmlFiles = getHtmlFiles('.');
let updatedHtmlCount = 0;

for (const f of htmlFiles) {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Determine relative prefix for assets/
  const norm = f.replace(/\\/g, '/');
  let relPrefix = '';
  if (norm.startsWith('ai-tools/') || norm.startsWith('blog/')) {
    const parts = norm.split('/');
    if (parts.length === 3) {
      // e.g. ai-tools/shadowrocket/index.html -> ../../
      relPrefix = '../../';
    } else if (parts.length === 2) {
      // e.g. ai-tools/index.html -> ../
      relPrefix = '../';
    }
  }

  // 1. Replace <span class="brand-icon">...</span>
  content = content.replace(
    /<span class="brand-icon" aria-hidden="true"><svg[\s\S]*?<\/svg><\/span>/g,
    `<span class="brand-icon" aria-hidden="true">${newSvgCode}</span>`
  );

  // 2. Replace Favicon links in <head>
  // Replace any existing <link rel="icon" ...> or <link rel="alternate icon" ...>
  const newFaviconBlock = `<link rel="icon" type="image/svg+xml" href="${dataUri}">\n  <link rel="alternate icon" href="${relPrefix}assets/favicon.ico">\n  <link rel="icon" type="image/svg+xml" href="${relPrefix}assets/favicon.svg?v=20261118">`;

  if (content.includes('<link rel="icon"')) {
    content = content.replace(
      /<link rel="(?:alternate )?icon"[^>]*>(\s*<link rel="(?:alternate )?icon"[^>]*>)*/g,
      newFaviconBlock
    );
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${newFaviconBlock}\n</head>`);
  }

  if (content !== original) {
    fs.writeFileSync(f, content);
    updatedHtmlCount++;
  }
}
console.log(`✓ Updated ${updatedHtmlCount} HTML files with new SVG logo & cached-busting Data URI favicon!`);

// 3. Update js/app.js to ensure active runtime favicon injection
let appJs = fs.readFileSync('js/app.js', 'utf8');
const runtimeFaviconSnippet = `
// Force browser tab to immediately refresh favicon on local file:// or cached page
(function ensureFaviconActive() {
  try {
    var dataUri = "${dataUri}";
    var icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = dataUri;
  } catch (e) {}
})();
`;

if (!appJs.includes('ensureFaviconActive')) {
  appJs = runtimeFaviconSnippet + '\n' + appJs;
  fs.writeFileSync('js/app.js', appJs);
  console.log('✓ Added runtime favicon refresh to js/app.js');
}

// 4. Update generator scripts in scripts/
const generatorScripts = [
  'scripts/build-all-pages.cjs',
  'scripts/build-topic-clusters.cjs',
  'scripts/build-ai-independent-pages.cjs',
  'scripts/blog-cluster-common.cjs',
  'scripts/ai-common.cjs',
  'scripts/review-common.cjs'
];

for (const gs of generatorScripts) {
  if (fs.existsSync(gs)) {
    let scriptContent = fs.readFileSync(gs, 'utf8');
    let mod = scriptContent;

    // Update any brand-icon SVGs embedded in generator templates
    mod = mod.replace(
      /<span class="brand-icon" aria-hidden="true"><svg[\s\S]*?<\/svg><\/span>/g,
      `<span class="brand-icon" aria-hidden="true">${newSvgCode}</span>`
    );

    if (mod !== scriptContent) {
      fs.writeFileSync(gs, mod);
      console.log(`✓ Updated generator script: ${gs}`);
    }
  }
}

console.log('🎉 Logo and Favicon replacement completed 100%!');
