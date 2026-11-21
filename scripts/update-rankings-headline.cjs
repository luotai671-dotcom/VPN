const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldHeading = `<div class="section-kicker">THE SHORTLIST <span>精选推荐</span></div><div class="section-heading"><div><h2>找到你的下一款 VPN<span class="green-period">.</span></h2><p>没有适合所有人的 VPN，只有更适合你的选择。</p></div><span class="updated-label"><i class="status-dot"></i> 2026 年 11 月 · 框架预览</span></div>`;

const newHeading = `<div class="section-kicker">THE 2026 RANKINGS <span>权威实测 · 避坑首选</span></div><div class="section-heading"><div><h2>2026 真正稳定的专线机场与 VPN 推荐排行榜<span class="green-period">.</span></h2><p>拒绝超售虚标与跑路套路。历经晚高峰（20:00~23:00）全节点持续压测，精选 11 款 4K 秒开、稳定不掉线的硬核选择。</p></div><span class="updated-label"><i class="status-dot"></i> 2026 年 11 月 · 晚高峰实测更新</span></div>`;

if (html.includes(oldHeading)) {
  html = html.replace(oldHeading, newHeading);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('✓ Successfully updated high-conversion headline in index.html');
} else {
  console.error('Could not find old heading in index.html');
}
