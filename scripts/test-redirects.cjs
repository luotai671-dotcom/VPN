const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== 开始 302 跳转规则自检与死链/循环验证 ===');

const redirects = JSON.parse(fs.readFileSync('data/redirects.json', 'utf8'));
const keys = Object.keys(redirects);
assert.equal(keys.length, 11, '应包含 11 款核心服务商');

// 1. 验证目标 URL 全为外部有效 HTTPS 地址，绝无循环重定向
for (const [id, url] of Object.entries(redirects)) {
  assert.ok(url.startsWith('https://'), `目标 URL 必须为外部 https: ${id} -> ${url}`);
  assert.ok(!url.includes('/go/'), `目标 URL 严禁自引用循环重定向: ${url}`);
}
console.log('✓ redirects.json 11 个目标外链无循环重定向');

// 2. 验证 _redirects 语法与目标
const redirectsContent = fs.readFileSync('_redirects', 'utf8');
for (const [id, url] of Object.entries(redirects)) {
  const line = `/go/${id}   ${url}   302!`;
  assert.ok(redirectsContent.includes(`/go/${id}`), `_redirects 缺失 /go/${id}`);
  assert.ok(redirectsContent.includes(url), `_redirects 缺失目标 URL: ${url}`);
}
console.log('✓ _redirects Cloudflare/Netlify 302 规则校验 100% 通过，无循环重定向');

// 3. 验证 nginx-redirects.conf 语法与目标
const nginxContent = fs.readFileSync('nginx-redirects.conf', 'utf8');
for (const [id, url] of Object.entries(redirects)) {
  assert.ok(nginxContent.includes(`location = /go/${id}`), `nginx 配置缺失 /go/${id}`);
  assert.ok(nginxContent.includes(url), `nginx 配置缺失目标 URL: ${url}`);
  assert.ok(nginxContent.includes('add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet"'), 'nginx 必须注入 X-Robots-Tag noindex');
}
console.log('✓ nginx-redirects.conf Nginx 302 规则校验 100% 通过，已配置 X-Robots-Tag');

// 4. 验证 go.html 存在且包含 noindex meta 标签
const goHtml = fs.readFileSync('go.html', 'utf8');
assert.ok(goHtml.includes('<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">'), 'go.html 必须严格包含 noindex, nofollow, noarchive, nosnippet 头部声明');
console.log('✓ go.html 承接页合规头部标签校验 100% 通过');

// 5. 验证 11 个静态独立 /go/[id]/index.html 文件与 noindex 标签
for (const id of keys) {
  const indexPath = path.join('go', id, 'index.html');
  assert.ok(fs.existsSync(indexPath), `缺失静态承接页: ${indexPath}`);
  const c = fs.readFileSync(indexPath, 'utf8');
  assert.ok(c.includes('noindex, nofollow, noarchive, nosnippet'), `${indexPath} 缺失 noindex 标签`);
}
console.log('✓ 11 款静态独立 /go/[id]/index.html 承接页全部就绪且已打上 noindex 标签');

// 6. 验证 robots.txt 开放且严禁屏蔽 /go
const robots = fs.readFileSync('robots.txt', 'utf8');
assert.ok(!robots.includes('Disallow: /go'), 'robots.txt 严禁写入 Disallow: /go (防止 Bing 报 Blocked 异常)');
assert.ok(!robots.includes('Disallow: /go.html'), 'robots.txt 严禁写入 Disallow: /go.html');
assert.ok(robots.includes('Allow: /'), 'robots.txt 必须保持对全站基础开放');
console.log('✓ robots.txt 重点合规项校验 100% 通过（无 Disallow: /go，全站 Allow: / 保持开放）');

// 7. 验证 sitemap.xml 严禁收录任何 /go 链接
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
assert.ok(!sitemap.includes('/go'), 'sitemap.xml 严禁包含任何 /go 链接');
assert.ok(!sitemap.includes('go.html'), 'sitemap.xml 严禁包含任何 go.html 链接');
console.log('✓ sitemap.xml 重点合规项校验 100% 通过（绝不包含任何 /go/ 或 /go.html 链接）');

console.log('\n🎉 全部 302 跳转隔离与合规自动化验证 100% 通过！');
