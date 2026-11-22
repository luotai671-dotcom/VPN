const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const BING_KEY = 'cb6f8a8025ef67173947437dfa1204ff';
const BING_META = `<meta name="msvalidate.01" content="${BING_KEY}">`;

// 1. 生成 BingSiteAuth.xml
const bingSiteAuthXml = `<?xml version="1.0"?>
<users>
\t<user>${BING_KEY}</user>
</users>
`;

fs.writeFileSync(path.join(rootDir, 'BingSiteAuth.xml'), bingSiteAuthXml, 'utf8');
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'BingSiteAuth.xml'), bingSiteAuthXml, 'utf8');
console.log('✓ BingSiteAuth.xml 已生成至根目录与 public/ 目录');

// 2. 清理 IndexNow key 结尾换行符（保持纯净 32 位字符）
fs.writeFileSync(path.join(rootDir, `${BING_KEY}.txt`), BING_KEY, 'utf8');
fs.writeFileSync(path.join(publicDir, `${BING_KEY}.txt`), BING_KEY, 'utf8');
console.log(`✓ IndexNow 密钥文件 [${BING_KEY}.txt] 已去除尾随换行，精确为 32 位字符串`);

// 3. 递归遍历 HTML 文件并注入/修正 msvalidate.01 与 canonical
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'artifacts') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');

  // 跳过中转跳转页（已设置 noindex）与开发预览页
  if (relPath.startsWith('go/') || relPath === 'go.html' || relPath.startsWith('scripts/')) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 确定该页面的规范 Canonical URL
  let canonicalUrl = '';
  if (relPath === 'index.html') {
    canonicalUrl = 'https://fanqiangguai.blog/';
  } else if (relPath.startsWith('blog/')) {
    const slug = relPath.replace('blog/', '').replace('/index.html', '').replace('.html', '');
    canonicalUrl = `https://fanqiangguai.blog/blog/${slug}`;
  } else if (relPath.startsWith('ai-tools/') || relPath === 'ai.html' || relPath === 'ai-tools.html') {
    let sub = relPath.replace('ai-tools/', '').replace('/index.html', '').replace('.html', '');
    if (sub === 'index' || sub === 'ai' || sub === 'ai-tools') {
      canonicalUrl = 'https://fanqiangguai.blog/ai-tools';
    } else {
      canonicalUrl = `https://fanqiangguai.blog/ai-tools/${sub}`;
    }
  } else if (relPath.startsWith('review-') || ['shandianshu.html', 'dalaoyun.html', 'liulianyun.html', 'shenxing.html', 'yunjiexian.html', 'huanqiuti.html', 'jilianyun.html', 'guangshuyun.html', 'guangnianti.html', 'bianyuan.html', 'sujie.html'].includes(relPath)) {
    const id = relPath.replace(/^review-/, '').replace(/\.html$/, '');
    canonicalUrl = `https://fanqiangguai.blog/review-${id}.html`;
  } else {
    canonicalUrl = `https://fanqiangguai.blog/${relPath}`;
  }

  // 1) 注入/修正 canonical 标签
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;
  if (canonicalRegex.test(content)) {
    content = content.replace(canonicalRegex, canonicalTag);
    changed = true;
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${canonicalTag}\n</head>`);
    changed = true;
  }

  // 2) 注入 msvalidate.01 meta 标签
  if (!content.includes('name="msvalidate.01"')) {
    if (content.includes(canonicalTag)) {
      content = content.replace(canonicalTag, `${canonicalTag}\n  ${BING_META}`);
      changed = true;
    } else if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${BING_META}\n</head>`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`✓ 成功为 ${updatedCount} 个 HTML 独立页面补全 Bing 验证元标签与 Canonical 规范链接！`);
