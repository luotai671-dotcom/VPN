const fs = require('fs');
const path = require('path');
const redirects = require('../data/redirects.json');
const services = require('../src/data/services.json');

const goDir = path.resolve(__dirname, '../go');
if (!fs.existsSync(goDir)) fs.mkdirSync(goDir, { recursive: true });

const serviceMap = {};
services.forEach(s => serviceMap[s.id] = s.name);

for (const [id, url] of Object.entries(redirects)) {
  const itemDir = path.join(goDir, id);
  if (!fs.existsSync(itemDir)) fs.mkdirSync(itemDir, { recursive: true });

  const name = serviceMap[id] || id;
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0;url=${url}">
  <title>正在安全跳转至 ${name} 官网 — 翻墙怪 VPN Insight</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <script>window.location.replace(${JSON.stringify(url)});</script>
  <style>
    body {
      background: #0c2128;
      color: #e2edea;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .box {
      background: rgba(17, 47, 57, 0.9);
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: 12px;
      padding: 32px 24px;
      max-width: 420px;
    }
    a {
      color: #34d399;
      text-decoration: underline;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="box">
    <p style="margin-bottom:16px;">正在通过 302 安全专线直达 <strong>${name}</strong> 官网...</p>
    <p style="font-size:13px;color:#8fa8a2;">如未自动跳转，请<a href="${url}" rel="nofollow sponsored noopener noreferrer">点击此处直接访问</a> ↗</p>
  </div>
</body>
</html>
`;
  fs.writeFileSync(path.join(itemDir, 'index.html'), html, 'utf8');
}

console.log('✓ 11 款独立 /go/[id]/index.html 承接页生成完毕！');
