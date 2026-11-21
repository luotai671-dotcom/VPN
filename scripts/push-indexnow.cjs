const fs = require('fs');
const path = require('path');

const HOST = 'fanqiangguai.blog';
const KEY = 'cb6f8a8025ef67173947437dfa1204ff';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

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

async function submitIndexNow() {
  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Fanqiangguai-IndexNow-Pusher/1.0'
      },
      body: JSON.stringify(payload)
    });

    console.log(`\nIndexNow 响应状态码: ${response.status} (${response.statusText || 'OK'})`);

    if (response.status === 200) {
      console.log('🎉 提交成功 (HTTP 200): URLs submitted successfully!');
    } else if (response.status === 202) {
      console.log('🎉 接收成功 (HTTP 202): URLs received. IndexNow key validation pending or accepted.');
    } else {
      const text = await response.text();
      console.warn(`⚠️ 响应内容: ${text || '(空)'}`);
    }

    return response.status;
  } catch (err) {
    console.error('❌ 发送请求失败:', err.message);
    throw err;
  }
}

submitIndexNow().catch(() => process.exit(1));
