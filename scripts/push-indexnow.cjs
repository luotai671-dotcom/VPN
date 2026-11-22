const fs = require('fs');
const path = require('path');

const HOST = 'fanqiangguai.blog';
const KEY = 'cb6f8a8025ef67173947437dfa1204ff';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// IndexNow 官方与主要搜索引擎端点列表
const ENDPOINTS = [
  { name: 'IndexNow 官方中心网关', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Microsoft Bing 专有网关', url: 'https://www.bing.com/indexnow' },
  { name: 'Yandex 专有网关', url: 'https://yandex.com/indexnow' }
];

console.log('=== 开始执行 IndexNow 全量 URL 自动推送 ===');

// 1. 读取 sitemap.xml 提取全量有效 URL
const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ 未找到 sitemap.xml 文件，请先生成站点地图！');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
const urlList = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
  const url = match[1].trim();
  if (url.startsWith(`https://${HOST}`) && !url.includes('/go/') && !url.includes('go.html')) {
    urlList.push(url);
  }
}

if (urlList.length === 0) {
  console.warn('⚠️ 未在 sitemap.xml 中提取到有效 URL，默认提交首页。');
  urlList.push(`https://${HOST}/`);
}

console.log(`✓ 成功从 sitemap.xml 提取 ${urlList.length} 个核心 URL 路由`);
console.log(`✓ IndexNow 密钥：${KEY}`);
console.log(`✓ 验证文件位置：${KEY_LOCATION}`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
};

async function submitToEndpoint(endpoint) {
  try {
    const response = await fetch(endpoint.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Mozilla/5.0 (compatible; Fanqiangguai-IndexNow-Pusher/1.0)'
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const text = await response.text();

    if (status === 200 || status === 202) {
      console.log(`  ✓ [${endpoint.name}] 推送成功: HTTP ${status} (${response.statusText || 'Accepted'})`);
      return true;
    } else {
      console.warn(`  ⚠️ [${endpoint.name}] 响应状态: HTTP ${status} | 内容: ${text || '(空)'}`);
      return false;
    }
  } catch (err) {
    console.error(`  ❌ [${endpoint.name}] 发送异常: ${err.message}`);
    return false;
  }
}

async function main() {
  let anySuccess = false;
  for (const ep of ENDPOINTS) {
    const ok = await submitToEndpoint(ep);
    if (ok) anySuccess = true;
  }
  
  if (anySuccess) {
    console.log('\n🎉 IndexNow 多网关广播完成，至少一个搜索引擎已成功接收并进入索引抓取队列！');
  } else {
    console.warn('\n⚠️ 所有 IndexNow 端点暂时未能成功接收，请检查域名部署或待 GitHub Pages / Cloudflare 同步后重试。');
  }
}

main().catch(err => {
  console.error('推送异常:', err);
});
