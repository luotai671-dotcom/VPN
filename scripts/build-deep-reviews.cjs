const fs = require('fs');
const path = require('path');
const { getHeader, getFooter, countChineseChars } = require('./review-common.cjs');
const reviewsContent = require('./reviews-data.cjs');

const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

console.log('--- 开始批量构建 11 款 VPN/机场独立深度测评独立网站与页面 ---');

let totalVerified = 0;

services.forEach(service => {
  const id = service.id;
  const data = reviewsContent[id];
  if (!data) {
    throw new Error(`缺少服务商 ${id} 的深度评测数据！`);
  }

  // 统计正文字数
  let fullArticleText = data.lead + ' ';
  const sectionsHtml = data.sections.map(sec => {
    fullArticleText += sec.h2 + ' ' + sec.p.join(' ') + ' ';
    return `<h2>${sec.h2}</h2>\n` + sec.p.map(para => `<p>${para}</p>`).join('\n');
  }).join('\n\n');

  const charCount = countChineseChars(fullArticleText);
  if (charCount < 1500) {
    throw new Error(`【${service.name}】深度评测正文字数仅 ${charCount} 字，未满足 >= 1500 字要求！`);
  }
  console.log(`✓ 【${service.name}】独立测评正文字数：${charCount} 字（合规：>= 1500 字）`);
  totalVerified++;

  const couponNotice = service.coupon 
    ? `<div class="article-notice" style="border-left-color:#26704f;background:#f0f9f3;color:#1d663c;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <span><strong>专属立减优惠码：</strong>在结算订购时输入 <b>${service.coupon}</b> 即可直接抵扣折扣！</span>
        <button class="discount copyable" style="padding:4px 12px;font-size:12px;" onclick="copyCoupon('${service.coupon}', this)">复制优惠码 <b>${service.coupon}</b></button>
      </div>` 
    : `<div class="article-notice">当前套餐享受官方特惠直购价格，免优惠码直接下单。</div>`;

  const bodyContent = `
    <span class="section-kicker">${data.heroKicker}</span>
    <h1>${service.name}深度测评报告：${service.subtitle}</h1>
    <p class="page-lead">${data.lead}</p>
    ${couponNotice}

    <div class="detail-metrics">
      <div class="metric">综合评分<b>${service.rating} / 10</b></div>
      <div class="metric">晚高峰实测速率<b>${service.speed} Mbps</b></div>
      <div class="metric">起步价格<b>¥${service.startingPrice.toFixed(2)} / 月</b></div>
    </div>

    <div class="review-quick-box">
      <div class="review-quick-item"><strong>🕒 营业时间 / 历程：</strong>${data.establishedFull}</div>
      <div class="review-quick-item"><strong>🛣️ 骨干线路规格：</strong>${service.lineArchitecture}</div>
      <div class="review-quick-item"><strong>⚡ 晚高峰表现：</strong>${service.peakPerformance}</div>
      <div class="review-quick-item"><strong>💻 支持客户端：</strong>${service.clientSupport}</div>
      <div class="review-quick-item"><strong>🔓 解锁矩阵支持：</strong>${service.unlockMatrix}</div>
      <div class="review-quick-item"><strong>🌐 节点规模与覆盖：</strong>${service.servers}，覆盖 ${service.countries}</div>
    </div>

    ${sectionsHtml}

    <div class="pros-cons-box">
      <div class="pros-box">
        <h3>✓ 核心优势总结</h3>
        <ul>
          ${service.pros.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="cons-box">
        <h3>ⓘ 选购建议与注意事项</h3>
        <ul>
          ${service.cons.map(item => `<li>${item}</li>`).join('')}
          <li>${service.limitation}</li>
        </ul>
      </div>
    </div>

    <div style="margin-top:35px;display:flex;gap:15px;align-items:center;flex-wrap:wrap">
      <a class="button button-primary" href="${service.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener noreferrer">访问 ${service.name} 官网（激活专属优惠） ↗</a>
      <a class="text-link" href="methodology.html">阅读评测标准与方法论 →</a>
    </div>
  `;

  const pageHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.title} — 翻墙怪 VPN Insight</title>
  <meta name="description" content="${data.lead.slice(0, 140)}...">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
${getHeader('index')}
  <main id="main-content" class="container standalone-page">
    <a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>
${bodyContent}
  </main>
${getFooter()}
</body>
</html>`;

  // 生成两种独立页面文件名，同时满足直接访问与规范命名
  fs.writeFileSync(`${id}.html`, pageHtml, 'utf8');
  fs.writeFileSync(`review-${id}.html`, pageHtml, 'utf8');
  console.log(`Successfully generated ${id}.html and review-${id}.html`);
});

console.log(`\n🎉 全部 ${totalVerified} 款服务商独立测评网站构建成功，每篇字数全部超过 1500 汉字！`);
