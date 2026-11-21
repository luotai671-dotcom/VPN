const fs = require('fs');

function getHtmlFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const p = require('path').join(dir, item);
    if (fs.statSync(p).isDirectory()) getHtmlFiles(p, list);
    else if (item.endsWith('.html')) list.push(p);
  }
  return list;
}

const htmlFiles = getHtmlFiles('.');
let cleaned = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/<footer[\s\S]*?<\/footer>/g, (footerBlock) => {
    return footerBlock.replace(/(<a\s+href="[^"]*index\.html"[^>]*>)\s*VPN推荐\s*<span>.*?<\/span>\s*(<\/a>)/g, '$1VPN推荐$2');
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    cleaned++;
  }
}

console.log(`✓ Cleaned footer links in ${cleaned} HTML files.`);
