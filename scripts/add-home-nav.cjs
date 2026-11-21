const fs = require('fs');
const path = require('path');

console.log('=== 开始为全站导航栏添加「首页」入口 ===');

function getAllHtmlFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      getAllHtmlFiles(p, list);
    } else if (item.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles('.');
let updatedCount = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Determine relative prefix for the file
  const norm = file.replace(/\\/g, '/');
  let relPrefix = '';
  if (norm.startsWith('ai-tools/') || norm.startsWith('blog/')) {
    const parts = norm.split('/');
    if (parts.length === 3) {
      relPrefix = '../../';
    } else if (parts.length === 2) {
      relPrefix = '../';
    }
  }

  const isIndex = (norm === 'index.html');

  // Check if main-nav already has "首页"
  const navMatch = content.match(/<nav id="main-nav"[^>]*>([\s\S]*?)<\/nav>/);
  if (navMatch) {
    const navBody = navMatch[1];
    if (!navBody.includes('>首页<')) {
      // We need to add "首页" before "VPN推荐"
      // Match the VPN推荐 link in main-nav
      const vpnLinkRegex = /<a\s+href="[^"]*index\.html(?:#rankings)?"\s+class="([^"]*)">\s*VPN推荐\s*(?:<span[^>]*>.*?<\/span>)?\s*<\/a>/;
      
      if (vpnLinkRegex.test(navBody)) {
        const replacement = isIndex
          ? `<a href="index.html" class="nav-active">首页</a>\n      <a href="#rankings" class="">VPN推荐 <span class="nav-arrow">⌄</span></a>`
          : `<a href="${relPrefix}index.html" class="">首页</a>\n      <a href="${relPrefix}index.html#rankings" class="">VPN推荐 <span class="nav-arrow">⌄</span></a>`;

        const newNavBody = navBody.replace(vpnLinkRegex, replacement);
        content = content.replace(navBody, newNavBody);
      }
    }
  }

  // Also check footer link in footer-col: add 首页 if not present
  if (content.includes('<h3>核心推荐</h3>')) {
    if (!content.includes(`>${relPrefix}index.html">首页<`) && !content.includes(`href="${relPrefix}index.html">首页</a>`)) {
      content = content.replace(
        `<h3>核心推荐</h3>\n      <a href="${relPrefix}index.html">2026 专线排行榜</a>`,
        `<h3>核心推荐</h3>\n      <a href="${relPrefix}index.html">首页</a>\n      <a href="${relPrefix}index.html#rankings">2026 专线排行榜</a>`
      );
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`✓ 已更新导航栏: ${file}`);
  }
}

console.log(`✓ 成功更新 ${updatedCount} 个 HTML 文件中的主导航栏与页脚！`);

// Update generator scripts in scripts/
const scriptsToUpdate = [
  'scripts/build-topic-clusters.cjs',
  'scripts/build-all-pages.cjs',
  'scripts/ai-common.cjs',
  'scripts/review-common.cjs'
];

for (const scPath of scriptsToUpdate) {
  if (fs.existsSync(scPath)) {
    let sc = fs.readFileSync(scPath, 'utf8');
    let origSc = sc;

    // Replace getHeader template if it doesn't have 首页
    if (sc.includes('id="main-nav"') && !sc.includes('>首页<')) {
      sc = sc.replace(
        /<a href="([^"]*index\.html)" class="([^"]*)">\s*VPN推荐\s*<span>.*?<\/span>\s*<\/a>/g,
        '<a href="$1" class="">首页</a>\n      <a href="$1#rankings" class="">VPN推荐 <span class="nav-arrow">⌄</span></a>'
      );
    }

    if (sc !== origSc) {
      fs.writeFileSync(scPath, sc, 'utf8');
      console.log(`✓ 已更新构建脚本: ${scPath}`);
    }
  }
}

console.log('🎉 导航栏「首页」入口部署完毕！');
