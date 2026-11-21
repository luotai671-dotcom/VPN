const fs = require('fs');
const path = require('path');

console.log('=== 开始批量更新导航名称：最佳 VPN -> VPN推荐 ===');

function getAllFiles(dir, exts = ['.html', '.cjs', '.js', '.ts']) {
  let list = [];
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      list = list.concat(getAllFiles(p, exts));
    } else if (exts.some(ext => item.endsWith(ext))) {
      list.push(p);
    }
  }
  return list;
}

const files = getAllFiles('.');
let updatedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Navigation items with dropdown arrow:
  // e.g. class="nav-active">VPN推荐 <span>⌄</span></a>
  // or class="">VPN推荐 <span>⌄</span></a>
  // or class="nav-active">最佳 VPN <span class="nav-arrow">⌄</span></a>
  content = content.replace(
    /(<a\s+href="[^"]*index\.html"[^>]*>)\s*最佳\s*VPN\s*(<span[^>]*>.*?<\/span>)?\s*(<\/a>)/g,
    (match, p1, p2, p3) => {
      const arrow = p2 || '<span>⌄</span>';
      return `${p1}VPN推荐 ${arrow}${p3}`;
    }
  );

  // 2. Footer items without arrow:
  // e.g. <a href="index.html">VPN推荐 <span>⌄</span></a> or <a href="../../index.html">VPN推荐 <span>⌄</span></a>
  content = content.replace(
    /(<a\s+href="[^"]*index\.html">)\s*最佳\s*VPN\s*(<\/a>)/g,
    '$1VPN推荐$2'
  );

  // 3. Any remaining nav link text in templates or strings
  content = content.replace(/>最佳\s*VPN\s*<span>⌄<\/span></g, '>VPN推荐 <span>⌄</span><');
  content = content.replace(/>最佳\s*VPN</g, '>VPN推荐<');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`✓ 已更新: ${file}`);
  }
}

console.log(`\n🎉 完成！共更新 ${updatedCount} 个文件中的导航名称为「VPN推荐」。`);
