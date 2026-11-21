const fs = require('fs');
const path = require('path');

const redirects = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/redirects.json'), 'utf8'));

// 建立反向映射：外部 URL -> /go/xxx
const urlToId = {};
for (const [id, url] of Object.entries(redirects)) {
  urlToId[url] = id;
}

let totalFilesScanned = 0;
let totalFilesModified = 0;
let totalReplacements = 0;
const modifiedFilesList = [];

function processFile(filePath) {
  totalFilesScanned++;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  const ext = path.extname(filePath).toLowerCase();

  // 1. 如果是 HTML 文件，做精准 <a> 标签与属性处理
  if (ext === '.html') {
    // 遍历每一个外部 URL 进行替换
    for (const [id, targetUrl] of Object.entries(redirects)) {
      if (content.includes(targetUrl)) {
        // 全局替换 href
        const hrefRegex = new RegExp(`href=["']${targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
        const matches = content.match(hrefRegex);
        if (matches) {
          fileReplacements += matches.length;
          content = content.replace(hrefRegex, `href="/go/${id}"`);
        }
      }
    }

    // 确保所有指向 /go/ 的 <a> 标签都具有 rel="nofollow sponsored noopener noreferrer"
    content = content.replace(/<a\b([^>]*href=["']\/go\/[^"']+["'][^>]*)>/gi, (match, attrs) => {
      let updatedAttrs = attrs;
      if (/rel=["'][^"']*["']/i.test(updatedAttrs)) {
        updatedAttrs = updatedAttrs.replace(/rel=["'][^"']*["']/i, 'rel="nofollow sponsored noopener noreferrer"');
      } else {
        updatedAttrs = updatedAttrs + ' rel="nofollow sponsored noopener noreferrer"';
      }
      if (!/target=["'][^"']*["']/i.test(updatedAttrs)) {
        updatedAttrs = updatedAttrs + ' target="_blank"';
      }
      return `<a${updatedAttrs}>`;
    });
  } else if (ext === '.json' || ext === '.js' || ext === '.ts' || ext === '.cjs') {
    // 2. 数据与脚本文件替换
    for (const [id, targetUrl] of Object.entries(redirects)) {
      if (content.includes(targetUrl)) {
        const urlRegex = new RegExp(targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(urlRegex);
        if (matches) {
          fileReplacements += matches.length;
          content = content.replace(urlRegex, `/go/${id}`);
        }
      }
    }
  }

  // 3. 检查 rel 属性标准化（sponsored nofollow -> nofollow sponsored noopener noreferrer）
  if (content.includes('sponsored nofollow')) {
    content = content.replace(/rel=["']sponsored nofollow noopener noreferrer["']/g, 'rel="nofollow sponsored noopener noreferrer"');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesModified++;
    totalReplacements += fileReplacements;
    modifiedFilesList.push({ file: path.relative(path.resolve(__dirname, '..'), filePath), count: fileReplacements });
  }
}

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === '.git' || item === 'node_modules') continue;
    const full = path.join(dir, item);
    const rel = path.relative(path.resolve(__dirname, '..'), full).replace(/\\/g, '/');

    // 跳过跳转定义文件本身
    if (
      rel === '_redirects' ||
      rel === 'nginx-redirects.conf' ||
      rel === 'go.html' ||
      rel.startsWith('go/') ||
      rel === 'data/redirects.json' ||
      rel === 'src/data/redirects.json' ||
      rel === 'scripts/scan-aff.cjs' ||
      rel === 'scripts/migrate-to-go-redirects.cjs' ||
      rel === 'scripts/generate-go-pages.cjs'
    ) {
      continue;
    }

    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (/\.(html|js|cjs|ts|json|md)$/i.test(item)) {
      processFile(full);
    }
  }
}

walkDir(path.resolve(__dirname, '..'));

console.log('=== 302 隔离与内链改造迁移完成 ===');
console.log(`总计扫描文件: ${totalFilesScanned}`);
console.log(`提炼独立推广直链数: ${Object.keys(redirects).length}`);
console.log(`修改文件数: ${totalFilesModified}`);
console.log(`批量替换外部 AFF 链接数: ${totalReplacements}`);
console.log('\n详细修改清单：');
modifiedFilesList.forEach(m => console.log(`  - [${m.count} 处] ${m.file}`));
