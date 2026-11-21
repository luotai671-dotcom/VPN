const fs = require('fs');
const path = require('path');
const { articles } = require('./blog-cluster-common.cjs');

const rootDir = path.resolve(__dirname, '..');

console.log('=== 开始更新 sitemap.html 并生成包含博客集群的 sitemap.xml ===');

// 1. 更新 sitemap.html
let sitemapHtml = fs.readFileSync(path.join(rootDir, 'sitemap.html'), 'utf8');

const aiSitemapSection = `
  <h2>AI 工具与专属分流独立专题 (5 个深度页面)</h2>
  <div class="article-links">
    <a href="/ai-tools">【AI 工具总览】全平台大模型客户端选型与规则分流总览 ↗</a>
    <a href="/ai-tools/shadowrocket">【小火箭专题】Shadowrocket iOS 端 AI 分流与规则配置教程 ↗</a>
    <a href="/ai-tools/clash-verge">【Clash Verge Rev 专题】PC 端 TUN 模式与 Cursor/Claude Desktop 代理教程 ↗</a>
    <a href="/ai-tools/clash-meta">【Mihomo 专题】Clash Meta 内核与软路由 AI 自动化规则集教程 ↗</a>
    <a href="/ai-tools/chatgpt-claude-routing">【防降智专题】ChatGPT / Claude 原生住宅 IP 节点与防封号指南 ↗</a>
  </div>
`;

const blogClusterSitemapSection = `
  <h2>博客资讯精选专题与进阶指南 (10 篇实测专栏)</h2>
  <div class="article-links">
${articles.map(a => `    <a href="/blog/${a.slug}">【${a.categoryName}】${a.title} ↗</a>`).join('\n')}
  </div>
`;

if (!sitemapHtml.includes('AI 工具与专属分流独立专题')) {
  sitemapHtml = sitemapHtml.replace(
    '<h2>核心导航独立页面</h2>',
    aiSitemapSection + '\n  <h2>核心导航独立页面</h2>'
  );
}

if (!sitemapHtml.includes('博客资讯高热搜长尾文章专题') && !sitemapHtml.includes('博客资讯精选专题与进阶指南')) {
  sitemapHtml = sitemapHtml.replace(
    '<h2>11 款核心服务商深度评测独立长文</h2>',
    blogClusterSitemapSection + '\n  <h2>11 款核心服务商深度评测独立长文</h2>'
  );
  fs.writeFileSync(path.join(rootDir, 'sitemap.html'), sitemapHtml, 'utf8');
  console.log('✓ sitemap.html 成功追加 10 篇博客长尾专题导航链接');
} else {
  // 如果已存在，替换为最新的
  const clusterRegex = /<h2>博客资讯(?:高热搜长尾文章专题[\s\S]*?|精选专题与进阶指南[\s\S]*?)<\/div>/g;
  sitemapHtml = sitemapHtml.replace(clusterRegex, blogClusterSitemapSection.trim());
  fs.writeFileSync(path.join(rootDir, 'sitemap.html'), sitemapHtml, 'utf8');
  console.log('✓ sitemap.html 已同步更新博客长尾专题导航链接');
}

// 2. 生成标准 sitemap.xml 与 robots.txt
const domain = 'https://fanqiangguai.blog';
const today = new Date().toISOString().split('T')[0];

const siteUrls = [
  // 首页与核心栏目
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/streaming.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/devices.html', priority: '0.9', changefreq: 'weekly' },
  { loc: '/security.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/blog.html', priority: '0.9', changefreq: 'daily' },

  // AI 独立专题体系
  { loc: '/ai-tools', priority: '0.95', changefreq: 'weekly' },
  { loc: '/ai-tools/shadowrocket', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ai-tools/clash-verge', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ai-tools/clash-meta', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ai-tools/chatgpt-claude-routing', priority: '0.95', changefreq: 'weekly' },

  // 10 篇博客 SEO 主题集群长尾文章
  ...articles.map(a => ({
    loc: `/blog/${a.slug}`,
    priority: a.id <= 3 ? '0.9' : '0.8',
    changefreq: 'weekly'
  })),

  // 辅助与说明页面
  { loc: '/methodology.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/beginner.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/about.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/disclosure.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/privacy.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/terms.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/sitemap.html', priority: '0.6', changefreq: 'weekly' },

  // 11 款核心服务商独立评测
  { loc: '/review-shandianshu.html', priority: '0.85', changefreq: 'weekly' },
  { loc: '/review-dalaoyun.html', priority: '0.85', changefreq: 'weekly' },
  { loc: '/review-liulianyun.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-shenxing.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-yunjiexian.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-huanqiuti.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-jilianyun.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-guangshuyun.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-guangnianti.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-bianyuan.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/review-sujie.html', priority: '0.8', changefreq: 'weekly' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

siteUrls.forEach(u => {
  xml += `  <url>
    <loc>${domain}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf8');
console.log(`✓ sitemap.xml 生成成功，共收录 ${siteUrls.length} 个核心 URL 路由！`);

// 3. 生成根目录标准 robots.txt
const robotsTxt = `# robots.txt for https://fanqiangguai.blog
# FANQIANGGUAI - VPN INSIGHT

User-agent: *
Allow: /

# Disallow sensitive or temporary paths
Disallow: /data/
Disallow: /scripts/
Disallow: /artifacts/

# Sitemap location
Sitemap: ${domain}/sitemap.xml
`;
fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ robots.txt 生成成功，已指向 https://fanqiangguai.blog/sitemap.xml！');

// 4. 同步 IndexNow 验证密钥文件
const indexNowKey = 'cb6f8a8025ef67173947437dfa1204ff';
fs.writeFileSync(path.join(rootDir, `${indexNowKey}.txt`), `${indexNowKey}\n`, 'utf8');
const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, `${indexNowKey}.txt`), `${indexNowKey}\n`, 'utf8');
console.log(`✓ IndexNow 验证密钥文件 [${indexNowKey}.txt] 已同步至产物根目录与 public/ 目录！`);
