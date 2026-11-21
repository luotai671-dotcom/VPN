const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('=== 开始执行全站品牌重塑：翻墙怪 -> 翻墙怪 ===');

// 统一的翻墙怪 SVG 图标
const brandSvg = `<svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="56" height="52" rx="16" fill="#112a23" stroke="#225e43" stroke-width="3"/><path d="M20 11 L13 4 M44 11 L51 4" stroke="#34d399" stroke-width="4.5" stroke-linecap="round"/><circle cx="13" cy="4" r="2.5" fill="#a7f3d0"/><circle cx="51" cy="4" r="2.5" fill="#a7f3d0"/><rect x="17" y="19" width="10" height="9" rx="3" fill="#34d399"/><rect x="37" y="19" width="10" height="9" rx="3" fill="#34d399"/><circle cx="23" cy="23.5" r="1.8" fill="#112a23"/><circle cx="43" cy="23.5" r="1.8" fill="#112a23"/><path d="M11 39 H22 M42 39 H53" stroke="#26704f" stroke-width="3.5" stroke-linecap="round"/><path d="M14 47 H20 M44 47 H50" stroke="#1b533a" stroke-width="2.5" stroke-linecap="round"/><polygon points="34,29 24,42 32,42 29,53 42,39 34,39" fill="#34d399" stroke="#a7f3d0" stroke-width="1.5" stroke-linejoin="round"/></svg>`;

function getBrandWordmark(targetIndex = 'index.html') {
  return `<a href="${targetIndex}" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true">${brandSvg}</span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a>`;
}

// 递归查找文件
function getTargetFiles(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'node_modules' || item === '.git' || item === 'artifacts') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getTargetFiles(fullPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.html', '.js', '.cjs', '.ts', '.json', '.md'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const allFiles = getTargetFiles(rootDir);
console.log(`共扫描到 ${allFiles.length} 个代码/内容文件，开始全面处理...`);

let modifiedFiles = [];

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. 替换 wordmark 图标与文字结构
  // 匹配形如 <a href="..." class="wordmark"...>...</a>
  const wordmarkRegex = /<a\s+href="([^"]*index\.html)?"\s+class="wordmark"[^>]*>[\s\S]*?<\/a>/g;
  content = content.replace(wordmarkRegex, (match, p1) => {
    const target = p1 || 'index.html';
    return getBrandWordmark(target);
  });

  // 2. 针对 build 脚本等 template 里的 getBrandWordmark 替换
  // 如果脚本里写了 `<span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="56" height="52" rx="16" fill="#112a23" stroke="#225e43" stroke-width="3"/><path d="M20 11 L13 4 M44 11 L51 4" stroke="#34d399" stroke-width="4.5" stroke-linecap="round"/><circle cx="13" cy="4" r="2.5" fill="#a7f3d0"/><circle cx="51" cy="4" r="2.5" fill="#a7f3d0"/><rect x="17" y="19" width="10" height="9" rx="3" fill="#34d399"/><rect x="37" y="19" width="10" height="9" rx="3" fill="#34d399"/><circle cx="23" cy="23.5" r="1.8" fill="#112a23"/><circle cx="43" cy="23.5" r="1.8" fill="#112a23"/><path d="M11 39 H22 M42 39 H53" stroke="#26704f" stroke-width="3.5" stroke-linecap="round"/><path d="M14 47 H20 M44 47 H50" stroke="#1b533a" stroke-width="2.5" stroke-linecap="round"/><polygon points="34,29 24,42 32,42 29,53 42,39 34,39" fill="#34d399" stroke="#a7f3d0" stroke-width="1.5" stroke-linejoin="round"/></svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong>`);

  // 3. 全局品牌词汇逐级精细替换
  content = content.replace(/翻墙怪首页/g, '翻墙怪首页');
  content = content.replace(/返回翻墙怪首页/g, '返回翻墙怪首页');
  content = content.replace(/翻墙怪\s*VPN\s*Insight/gi, '翻墙怪 VPN Insight');
  content = content.replace(/翻墙怪\s*VPN\s*INSIGHT/g, '翻墙怪 VPN INSIGHT');
  content = content.replace(/翻墙怪专线/g, '翻墙怪专线');
  content = content.replace(/了解翻墙怪/g, '了解翻墙怪');
  content = content.replace(/翻墙怪评测实验室/g, '翻墙怪评测实验室');
  content = content.replace(/翻墙怪实验室/g, '翻墙怪实验室');
  content = content.replace(/翻墙怪团队/g, '翻墙怪团队');
  content = content.replace(/翻墙怪/g, '翻墙怪');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles.push(path.relative(rootDir, filePath));
  }
});

console.log(`✓ 成功更新 ${modifiedFiles.length} 个文件！`);
