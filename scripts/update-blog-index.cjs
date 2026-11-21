const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { articles } = require('./blog-cluster-common.cjs');

const rootDir = path.resolve(__dirname, '..');
const blogFile = path.join(rootDir, 'blog.html');

console.log('=== 开始更新 blog.html 列表页 ===');

let content = fs.readFileSync(blogFile, 'utf8');

// 1. 生成分类筛选 Tab
const tabsHtml = `  <div class="blog-filter-tabs" role="tablist" aria-label="博客分类筛选">
    <button class="filter-tab active" data-filter="all" type="button" role="tab" aria-selected="true">全部文章 (16)</button>
    <button class="filter-tab" data-filter="budget" type="button" role="tab" aria-selected="false">💰 性价比推荐</button>
    <button class="filter-tab" data-filter="ai-office" type="button" role="tab" aria-selected="false">🤖 AI与办公</button>
    <button class="filter-tab" data-filter="streaming-gaming" type="button" role="tab" aria-selected="false">🎬 流媒体与游戏</button>
    <button class="filter-tab" data-filter="security-guide" type="button" role="tab" aria-selected="false">🛡️ 避坑指南</button>
  </div>`;

// 2. 生成 10 篇新长尾文章卡片
const newCardsHtml = articles.map(a => `
  <a class="blog-item" href="/blog/${a.slug}" data-category="${a.category}">
    <div class="blog-meta">
      <span>🏷️ ${a.categoryName}</span>
      <span>⏱️ ${a.readTime}</span>
      <span>📅 ${a.date}</span>
    </div>
    <h3>${a.title} ↗</h3>
    <p>${a.metaDesc}</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      ${a.tags.map(t => `<span>${t}</span>`).join('')}
    </div>
  </a>`).join('\n');

// 3. 原有的 6 篇精选长尾文章追加 data-category 属性
const existing6Cards = `
  <a class="blog-item" href="methodology.html" data-category="security-guide">
    <div class="blog-meta">
      <span>🏷️ 避坑指南 · 专线科普</span>
      <span>⏱️ 8 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>2026 最新专线机场选购避坑完全指南：IEPL 与 IPLC 究竟差在哪里？ ↗</h3>
    <p>很多新手在选购机场时经常被各种“中继”、“BGP”、“IEPL”、“IPLC”专业名词弄得眼花缭乱。本文从底层物理网络拓扑、防封原理、晚高峰延迟与资费性价比出发，帮你一次讲透。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>

  <a class="blog-item" href="streaming.html" data-category="streaming-gaming">
    <div class="blog-meta">
      <span>🏷️ 流媒体与游戏 · 技巧</span>
      <span>⏱️ 6 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>想用专线看 Netflix 与 Disney+ 4K？先弄清楚这 5 件事 ↗</h3>
    <p>为什么测速几十万 Kbps 依然打不开 Netflix 片库？为什么频繁提示“您似乎正在使用代理”？原生家庭住宅 IP 与机房 IP 的本质区别，以及大屏电视盒子的智能分流秘籍。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>

  <a class="blog-item" href="review-shenxing.html" data-category="streaming-gaming">
    <div class="blog-meta">
      <span>🏷️ 流媒体与游戏 · 游戏加速</span>
      <span>⏱️ 7 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>外服游戏联机跳 Ping 丢包严重？电竞专线实测与 UDP QOS 优化秘籍 ↗</h3>
    <p>专为 Steam、Apex Legends、Valorant、EA FC 及 PS5/Switch 主机玩家打造。如何利用 TUN 虚拟网卡接管底层 UDP 流量，彻底解决掉线与跳 Ping 困扰。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>

  <a class="blog-item" href="review-yunjiexian.html" data-category="ai-office">
    <div class="blog-meta">
      <span>🏷️ AI与办公 · 生产力协同</span>
      <span>⏱️ 5 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>跨国远程办公与开发者指南：如何获得纯净 IP 避免 Google 频繁人机验证？ ↗</h3>
    <p>探讨商用纯净出口 IP 的重要性，如何保障海外 GitHub 代码拉取、AWS/GCP 控制台访问以及 ChatGPT-4o / Claude 3.5 稳定不被封号。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>

  <a class="blog-item" href="devices.html" data-category="ai-office">
    <div class="blog-meta">
      <span>🏷️ AI与办公 · 客户端配置</span>
      <span>⏱️ 9 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>全平台客户端安装与智能分流配置完全指南（Win / Mac / iOS / Android / TV） ↗</h3>
    <p>汇总 Clash Verge Rev、v2rayN、Shadowrocket 小火箭与 Sing-box 在各主流操作系统的安装包获取、订阅一键导入与国内外流量自动分流规则教程。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>

  <a class="blog-item" href="security.html" data-category="security-guide">
    <div class="blog-meta">
      <span>🏷️ 避坑指南 · 隐私安全</span>
      <span>⏱️ 8 分钟阅读</span>
      <span>📅 2026 年 11 月</span>
    </div>
    <h3>专线网络数据安全深度解构：VLESS Reality 伪装与防 DNS 泄漏实战 ↗</h3>
    <p>深入剖析深度包检测（DPI）如何识别代理流量，如何通过借用大厂 TLS 证书消除指纹，以及无盘纯内存 RAM-only 架构的零日志防御机制。</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>`;

// 替换 blog.html 中的文章列表区域
const targetSectionRegex = /<h2>一、(?:精选高热搜长尾专题深度指南|精选专线评测与进阶选购指南)<\/h2>[\s\S]*?<div class="blog-list">[\s\S]*?<\/div>/;

const newSectionHtml = `<h2>一、精选专线评测与进阶选购指南</h2>
${tabsHtml}
  <div class="blog-list">
${newCardsHtml}
${existing6Cards}
  </div>`;

assert.ok(targetSectionRegex.test(content), '必须匹配到 blog.html 中的文章列表区块！');
content = content.replace(targetSectionRegex, newSectionHtml);

fs.writeFileSync(blogFile, content, 'utf8');
console.log('✓ blog.html 成功更新，注入分类筛选 Tab 与 16 篇主题卡片！');
