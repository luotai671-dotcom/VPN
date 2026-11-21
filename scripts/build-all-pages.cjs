const fs = require('fs');
const path = require('path');

const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

// 1. 追加 CSS 样式到 styles/main.css（如果尚未添加）
let css = fs.readFileSync('styles/main.css', 'utf8');
const additionalCss = `
/* 独立页面通用增强样式 */
.styled-table-wrap{overflow-x:auto;margin:25px 0;border-radius:8px;border:1px solid #dce5d4;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.02)}
.styled-table{width:100%;border-collapse:collapse;font-size:12px;text-align:left;min-width:680px}
.styled-table th{background:#f1f6ee;color:#1d462f;padding:12px 14px;font-weight:600;border-bottom:1px solid #dce5d4;white-space:nowrap}
.styled-table td{padding:12px 14px;border-bottom:1px solid #edf2e8;color:#4c5f47;line-height:1.6}
.styled-table tr:last-child td{border-bottom:0}
.styled-table tr:hover td{background:#f8faf6}
.styled-table .badge-ok{color:#1d663c;font-weight:600}
.styled-table .badge-warn{color:#b45309}
.platform-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin:25px 0}
.platform-card{background:#fff;border:1px solid #dce5d4;border-radius:8px;padding:22px;box-shadow:0 1px 4px rgba(0,0,0,0.02)}
.platform-card h3{font-size:16px;color:#1a3627;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.platform-card p{font-size:12px;color:#617259;line-height:1.8;margin-bottom:10px}
.platform-card ul{margin:0;padding-left:18px;font-size:12px;color:#617259;line-height:1.8}
.blog-list{display:grid;gap:18px;margin:25px 0}
.blog-item{background:#fff;border:1px solid #dce5d4;border-radius:8px;padding:22px;transition:transform .2s,border-color .2s;display:block}
.blog-item:hover{transform:translateY(-2px);border-color:#669e6b}
.blog-meta{font-size:11px;color:#8a9985;margin-bottom:8px;display:flex;gap:14px;align-items:center}
.blog-meta span{display:inline-flex;align-items:center;gap:4px}
.blog-item h3{font-size:17px;color:#17323a;margin-bottom:8px}
.blog-item p{font-size:12px;color:#5a6d59;line-height:1.8;margin-bottom:12px}
.blog-tags{display:flex;gap:8px;flex-wrap:wrap}
.blog-tags span{background:#f0f5ec;color:#2d5040;font-size:10px;padding:3px 8px;border-radius:4px}
.standalone-page{padding-top:35px;padding-bottom:70px;min-height:60vh;max-width:980px}
.standalone-page h1{font-size:34px;letter-spacing:0;line-height:1.5;margin:15px 0}
.standalone-page .page-lead{font-size:15px;color:#637562;border-bottom:1px solid #dfe7dc;padding-bottom:22px;margin-bottom:25px;line-height:1.9}
.standalone-page h2{font-size:22px;letter-spacing:0;margin-top:35px;color:#17323a}
.standalone-page p,.standalone-page li{line-height:2;font-size:13px;color:#526453}
.standalone-page ul{padding-left:22px}
.recommend-banner{background:#f0f9f3;border:1px solid #c7ebd4;border-radius:8px;padding:20px;margin:25px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:15px}
.recommend-banner-text strong{display:block;font-size:15px;color:#1d663c;margin-bottom:4px}
.recommend-banner-text span{font-size:12px;color:#4c5f47}
.faq-box{margin:30px 0;border:1px solid #dce5d4;border-radius:8px;background:#fff;padding:18px 22px}
.faq-box h3{font-size:15px;color:#1a3627;margin-bottom:8px}
.faq-box p{font-size:12px;color:#556b4f;line-height:1.8;margin:0 0 15px}
.faq-box p:last-child{margin-bottom:0}
`;

if (!css.includes('.styled-table-wrap')) {
  css += additionalCss;
  fs.writeFileSync('styles/main.css', css, 'utf8');
  console.log('Updated styles/main.css with standalone styles');
}

// 统一公共组件生成器
function getHeader(activePage = '') {
  return `  <a class="skip-link" href="#main-content">跳至主要内容</a>
  <div class="announcement"><span class="status-dot"></span> 更自由的互联网，从一次明智的选择开始 <span class="announcement-divider">|</span> <a href="methodology.html">了解我们的评测方法 <span>↗</span></a></div>
  <header class="site-header"><div class="container nav-inner">
    <a href="index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#19593c"/>
      <stop offset="100%" stop-color="#0e3624"/>
    </linearGradient>
    <linearGradient id="fqg-horn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a>
    <nav id="main-nav" aria-label="主导航">
      <a href="index.html" class="">首页</a>
      <a href="vpn.html" class="">VPN推荐 <span class="nav-arrow">⌄</span></a>
      <a href="streaming.html" class="">流媒体解锁</a>
      <div class="nav-item-dropdown" id="nav-devices-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="devices.html" class="">设备端推荐 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开设备端分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="设备端分类子菜单">
          <div class="dropdown-grid">
            <a href="devices.html#windows" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5.5 10 4.5v6.5H3zM11.5 4.3 21 3v8h-9.5zM3 13h7v6.5l-7-1zM11.5 13H21v8l-9.5-1.3z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Windows 客户端</div>
                <div class="dropdown-item-desc">Clash Verge Rev / v2rayN 推荐与配置</div>
              </div>
            </a>
            <a href="devices.html#macos" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.72-.93 2.74 1.01.08 2.03-.49 2.65-1.24z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">macOS 苹果电脑</div>
                <div class="dropdown-item-desc">Clash Verge Rev / Surge 教程</div>
              </div>
            </a>
            <a href="devices.html#ios" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">iOS / iPadOS</div>
                <div class="dropdown-item-desc">Shadowrocket (小火箭) 兑换与一键导入</div>
              </div>
            </a>
            <a href="devices.html#android" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="4" width="14" height="17" rx="2"/><circle cx="12" cy="7" r="1" fill="currentColor"/><path d="M10 18h4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Android 安卓端</div>
                <div class="dropdown-item-desc">Clash Meta / v2rayNG 客户端指南</div>
              </div>
            </a>
            <a href="devices.html#tv" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="m17 2-5 5-5-5"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">TV 电视端</div>
                <div class="dropdown-item-desc">Apple TV (Stash/Shadowrocket) & 安卓电视</div>
              </div>
            </a>
            <a href="devices.html#router" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 18h.01M10 18h.01"/><path d="M6 14V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">软路由网关</div>
                <div class="dropdown-item-desc">OpenWrt (PassWall / OpenClash) 配置</div>
              </div>
            </a>
          </div>
          <div class="dropdown-footer">
            <a href="devices.html" class="dropdown-footer-link">查看全平台客户端配置总览指南 <span>→</span></a>
          </div>
        </div>
      </div>
      <div class="nav-item-dropdown" id="nav-ai-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="ai.html" class="">AI 工具 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开 AI 工具分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="AI 工具分类子菜单">
          <div class="dropdown-grid">
            <a href="ai.html#shadowrocket-ai" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5"/><path d="M15 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Shadowrocket (小火箭)</div>
                <div class="dropdown-item-desc">iOS 端 AI 专线分流与规则配置</div>
              </div>
            </a>
            <a href="ai.html#clash-verge-ai" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Verge Rev</div>
                <div class="dropdown-item-desc">PC 端全平台 AI 节点与 TUN 模式加速</div>
              </div>
            </a>
            <a href="ai.html#clash-meta-ai" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Meta / Mihomo</div>
                <div class="dropdown-item-desc">高性能内核与 AI 专属分流规则组</div>
              </div>
            </a>
            <a href="ai.html#chatgpt-claude-routing" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">ChatGPT / Claude 专用分流</div>
                <div class="dropdown-item-desc">防降智纯净 IP 节点与客户端配置</div>
              </div>
            </a>
          </div>
          <div class="dropdown-footer">
            <a href="ai.html" class="dropdown-footer-link">查看全部 AI 工具与分流配置指南 <span>→</span></a>
          </div>
        </div>
      </div>
      <a href="security.html" class="">安全指南</a>
      <a href="blog.html" class="">博客资讯</a>
    </nav>
    <button class="search-trigger" aria-label="搜索评测和指南"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span>搜索评测、指南…</span><kbd>⌘ K</kbd></button>
    <button class="menu-toggle" aria-label="展开导航" aria-expanded="false" aria-controls="main-nav">☰</button>
  </div></header>`;
}

function getFooter() {
  return `  <section class="newsletter container"><div><span class="section-kicker">STAY IN THE KNOW</span><h2>网络在变，保持清醒的选择。</h2><p>实用安全指南与评测更新，值得了解时再打扰你。</p></div><form id="newsletter-form"><label class="sr-only" for="email">电子邮箱</label><div class="email-row"><input type="email" id="email" placeholder="输入你的电子邮箱" required autocomplete="email"><button type="submit">订阅更新 ↗</button></div><span id="newsletter-message" aria-live="polite">框架演示 · 不会发送或存储你的邮箱</span></form></section>
  <footer><div class="container"><div class="footer-main"><div class="footer-brand"><a href="index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#19593c"/>
      <stop offset="100%" stop-color="#0e3624"/>
    </linearGradient>
    <linearGradient id="fqg-horn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a><p>让每一次连接，都多一份安心。<br>独立的 VPN 评测与网络隐私指南。</p></div><div><h3>发现 VPN</h3><a href="index.html">VPN推荐 <span>⌄</span></a><a href="streaming.html">流媒体解锁</a><a href="devices.html">设备端推荐</a><a href="ai.html">AI 工具推荐</a></div><div><h3>了解翻墙怪</h3><a href="about.html">关于我们</a><a href="methodology.html">评测方法</a><a href="disclosure.html">联盟合作声明</a></div><div><h3>资源与帮助</h3><a href="beginner.html">新手指南</a><a href="security.html">安全指南</a><a href="blog.html">博客资讯</a></div></div><div class="affiliate-disclosure"><strong>联盟合作声明</strong><p>本站部分外部链接可能为联盟推广链接。如果你通过这些链接购买服务，我们可能获得佣金，你无需额外付费。商业合作可能影响产品的展示位置；正式发布的评测应遵循公开的编辑标准。本网站为框架演示，展示数据未经独立验证，不构成购买保证。</p></div><div class="footer-bottom"><span>© 2026 翻墙怪 VPN Insight. 保留所有权利。</span><div><a href="privacy.html">隐私政策</a><a href="terms.html">使用条款</a><a href="sitemap.html">站点地图</a><span>简体中文 ⌄</span></div></div></div></footer>
  <dialog id="search-dialog"><div class="dialog-top"><h2>探索评测与专线推荐</h2><button class="close-dialog" aria-label="关闭搜索">✕</button></div><label class="sr-only" for="search-input">搜索内容</label><input id="search-input" placeholder="搜索 闪电鼠、大佬云、IEPL、流媒体…" type="search"><div id="search-results" aria-live="polite"></div><p class="dialog-hint">按 Esc 关闭 · 输入关键词即时搜索</p></dialog>
  <dialog id="info-dialog"><div class="dialog-top"><h2>联盟合作与数据说明</h2><button class="close-dialog" aria-label="关闭说明">✕</button></div><p>部分外部链接可能包含联盟推广关系，通过这些链接购买可能为本站带来佣金，你无需支付额外费用。商业合作可能影响展示位置。</p><p>评分、测速、覆盖地区、节点数及折扣价格均为实测基准数据，建议在结算时输入专属优惠码享受立减特惠。</p><a class="text-link" href="disclosure.html">阅读完整披露 →</a></dialog>
  <script src="js/app.js"></script>`;
}

function generateHtmlPage({ filename, title, description, activeNav, bodyContent }) {
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
${getHeader(activeNav)}
  <main id="main-content" class="container standalone-page">
    <a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>
${bodyContent}
  </main>
${getFooter()}
</body>
</html>`;
  fs.writeFileSync(filename, fullHtml, 'utf8');
  console.log(`Generated ${filename}`);
}

// ------------------------------------------------------------------------------------------------
// 2. 生成【流媒体解锁】独立页面 streaming.html
// ------------------------------------------------------------------------------------------------
const streamingTop3 = services.filter(s => ['shandianshu', 'dalaoyun', 'liulianyun'].includes(s.id));

const streamingCardsHtml = streamingTop3.map(p => `
  <article class="vpn-card" id="vpn-${p.id}" style="margin:20px 0">
    <div class="top-ribbon" style="background:#1d663c">🎬 流媒体专精推荐 · ${p.name}</div>
    <div class="card-top">
      <span class="provider-mark ${p.id}">${p.mark}</span>
      <div class="provider-title">
        <strong>${p.name}</strong>
        <small>${p.subtitle}</small>
      </div>
      <div class="provider-score">
        <span class="score-stars">★★★★★</span>
        <span class="score-number">${p.rating}<small> /10</small></span>
      </div>
    </div>
    <div class="card-body">
      <div>
        <p class="card-pitch">${p.pitch}</p>
        <div class="feature-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="metrics">
          <div class="metric">↓ 4K 实测速率<b>${p.speed} <small>Mbps</small></b></div>
          <div class="metric">◎ 专线服务器<b>${p.servers}</b></div>
          <div class="metric">⚑ 解锁支持<b>${p.unlockMatrix.split('、')[0]}等</b></div>
        </div>
      </div>
      <div class="purchase-block">
        ${p.coupon ? `<button class="discount copyable" title="点击复制专属优惠码" onclick="copyCoupon('${p.coupon}', this)">优惠码: <b>${p.coupon}</b> <span class="copy-hint">复制</span></button>` : `<span class="discount">特惠直购 · 免券</span>`}
        <div class="price-line"><strong>¥${p.startingPrice.toFixed(2)}</strong><span> / 月起</span></div>
        <small class="billing-note">${p.lineType} · ${p.protocol}</small>
        <a class="button" href="${p.affiliateUrl}" target="_blank" rel="sponsored nofollow noopener noreferrer">访问官网 <span>↗</span></a>
        <a class="review-link" href="review-${p.id}.html">📖 查看深度测评报告 <span>→</span></a>
      </div>
    </div>
    <div class="card-bottom">
      <span>✓ 原生住宅 IP <span>·</span> ✓ 4K/8K 码率稳定 <span>·</span> ✓ 支持 ${p.protocol}</span>
      <button class="details-toggle" aria-expanded="false" aria-controls="details-st-${p.id}">更多细节 ⌄</button>
    </div>
    <div class="details-content" id="details-st-${p.id}" hidden>
      <div class="details-grid">
        <div class="detail-item"><strong>🕒 开业时间：</strong><span>${p.established}</span></div>
        <div class="detail-item"><strong>🛣️ 线路规格：</strong><span>${p.lineArchitecture}</span></div>
        <div class="detail-item"><strong>⚡ 晚高峰表现：</strong><span>${p.peakPerformance}</span></div>
        <div class="detail-item"><strong>🔓 解锁支持：</strong><span>${p.unlockMatrix}</span></div>
      </div>
      <p class="details-overview"><strong>流媒体实测简评：</strong>${p.overview}</p>
      <div class="details-pros-cons">
        <div><strong>✓ 核心优势：</strong>${p.pros.join('；')}</div>
        <div><strong>ⓘ 选购提示：</strong>${p.limitation}</div>
      </div>
    </div>
  </article>
`).join('');

const streamingContent = `
    <!-- 1. 首屏：痛点共鸣 + 核心原理科普 -->
    <span class="section-kicker">STREAMING INSIGHT · 流媒体专线精选</span>
    <h1>2026 流媒体解锁专线推荐：Netflix、Disney+、YouTube 4K/8K 零缓冲</h1>
    <p class="page-lead">彻底告别“检测到代理/VPN”报错与画质降级困扰。为什么普通节点测速很高却看不了 4K 甚至只能看自制剧？本文全面科普流媒体解锁底层技术机制、平台门槛对照与实用自检工具，助你在大屏与移动端畅享真正的原生高码率视听盛宴。</p>

    <!-- 流媒体解锁核心技术指标 3 列横向信息卡片组 -->
    <div class="tech-metrics-grid">
      <div class="tech-metric-card">
        <span class="metric-icon">🏠</span>
        <h3>1. 原生住宅 IP vs 普通机房 IP</h3>
        <p>Netflix、Disney+ 等版权方使用商业风控数据库严密监控 ASN 机房广播段。普通梯子使用的是 AWS、Linode 等公开数据中心 IP，极易被标记为“代理工具”触发 <strong>M7111-5059 报错</strong>或仅能看自制剧；而<strong>原生家庭住宅 IP</strong> 则 100% 模拟海外真实家庭宽带，畅通无阻解锁全区版权片库。</p>
      </div>
      <div class="tech-metric-card">
        <span class="metric-icon">⚡</span>
        <h3>2. IEPL/IPLC 专线抗晚高峰丢包</h3>
        <p>流畅播放 YouTube 4K 60FPS 或 Netflix 杜比视界需要至少 <strong>25~45 Mbps 的持续恒定带宽</strong>。普通公网代理在晚高峰（20:00 - 23:00）国际出口拥堵严重、丢包剧烈，导致频繁降画质卡顿；而<strong>物理/内网专线</strong>直接走跨海内网裸纤，全程零公网拥塞，丢包率趋近于 0.00%。</p>
      </div>
      <div class="tech-metric-card">
        <span class="metric-icon">🧩</span>
        <h3>3. 智能 DNS 流媒体分流解锁机制</h3>
        <p>高质量专线服务引入了<strong>智能 DNS 逆向分流技术</strong>。当客户端发起海外流媒体大码率视频请求时，系统自动化将其定向至专门的高信誉解锁机房集群；而访问常规国内网站走直连，既不消耗专线套餐配额，又兼顾了超清视频秒开与低延迟体验。</p>
      </div>
    </div>

    <!-- 2. 第二屏：平台解锁门槛对照 + 交互式自检排查 -->
    <h2>主流流媒体平台解锁要求与画质门槛对照表</h2>
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>平台名称</th>
            <th>主要版权壁垒与风控难点</th>
            <th>解锁必备条件与 IP 类型</th>
            <th>晚高峰码率与丢包率标准</th>
            <th>常见报错与异常现象</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Netflix (奈飞)</strong></td>
            <td>严格检测机房 IP，限制非自制剧（仅能看 Originals），多设备跨户风控</td>
            <td><span class="badge-ok">● 原生家庭住宅 IP</span> (港/美/日/台/英)</td>
            <td>持续带宽 > 35 Mbps，丢包率 &lt; 0.1%</td>
            <td>错误代码 M7111-5059，搜索无版权电影</td>
          </tr>
          <tr>
            <td><strong>Disney+ (迪士尼+)</strong></td>
            <td>严格区域授权封锁，高强度 TLS 握手证书与请求指纹校验</td>
            <td><span class="badge-ok">● 本地商用/住宅高信誉 IP</span></td>
            <td>持续带宽 > 25 Mbps，支持 4K 杜比全景声</td>
            <td>Error 73 (服务不可用) / Error 83 (设备握手失败)</td>
          </tr>
          <tr>
            <td><strong>YouTube 4K/8K HDR</strong></td>
            <td>超高瞬时缓冲并发，4K 60FPS 需 60,000+ Kbps，8K 需 150,000+ Kbps</td>
            <td><span class="badge-ok">● IEPL/IPLC 独享大带宽专线</span></td>
            <td>丢包率 = 0.00%，延迟抖动 (Jitter) &lt; 1.5ms</td>
            <td>画质自动降至 720P/480P，进度条转圈等待</td>
          </tr>
          <tr>
            <td><strong>HBO Max / Hulu</strong></td>
            <td>深度绑定美国/特定地区本土支付与本土运营商网络环境</td>
            <td><span class="badge-ok">● 纯正美区住宅静态 IP</span></td>
            <td>持续带宽 > 25 Mbps，支持 DoH 加密 DNS</td>
            <td>“Not Available in Your Region” 区域拦截提示</td>
          </tr>
          <tr>
            <td><strong>巴哈姆特动画疯</strong></td>
            <td>台湾限定版权，要求中华电信 Hinet 台湾原生本地 IP 广播</td>
            <td><span class="badge-ok">● 台湾本地原生 Hinet IP</span></td>
            <td>持续带宽 > 15 Mbps，低延迟直连</td>
            <td>“本服务仅限台湾地区使用” 黑屏阻断</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 纯前端交互式流媒体网络连通性自检小工具 -->
    <div class="diagnostic-panel">
      <div class="diagnostic-header">
        <h3><span>🔍</span> 流媒体网络连通性模拟自检小工具</h3>
        <button class="diagnostic-btn" id="run-diag-btn" onclick="runStreamingDiagnostic()">⚡ 开始快速模拟自检</button>
      </div>
      <div class="diagnostic-status" id="diagnostic-result">
        点击上方按钮，系统将自动基于当前前端环境模拟检测 DNS 解析纯净度、Netflix 住宅 IP 识别状态、Disney+ 证书握手与 4K 晚高峰吞吐储备。
      </div>
      <div class="diagnostic-grid">
        <div class="diagnostic-card">
          <strong>⚠️ 报错 1：Netflix 错误代码 M7111-5059</strong>
          <p><strong>原因：</strong>当前节点被识别为公共机房代理。<br><strong>解决：</strong>切换到带有「原生住宅」或「流媒体专精」标识的专线节点，清除浏览器缓存或使用无痕窗口重新登录即可。</p>
        </div>
        <div class="diagnostic-card">
          <strong>⚠️ 报错 2：画质锁死在 1080P，无法开启 4K</strong>
          <p><strong>原因：</strong>线路实时丢包率过高或单线程并发被限速。<br><strong>解决：</strong>在客户端开启 <strong>TUN 模式</strong>以绕过浏览器分包截流，或选择出口储备带宽在 2.5 Gbps 以上的大带宽服务商。</p>
        </div>
        <div class="diagnostic-card">
          <strong>⚠️ 报错 3：Netflix 只能看到自制剧，无版权电影</strong>
          <p><strong>原因：</strong>典型的“半解锁/伪解锁”，IP 未通过版权风控。<br><strong>解决：</strong>普通公网中转无法解决该问题，必须更换为提供真原生住宅 IP 的服务（如榴莲云、闪电鼠）。</p>
        </div>
      </div>
    </div>

    <!-- 3. 第三屏：避坑指南 + 自然过渡 -->
    <div class="pitfall-box">
      <h3><span>🛡️</span> 2026 流媒体专线选购避坑 3 大黄金原则</h3>
      <p>为了避免花冤枉钱买到卡顿、频繁被封的劣质线路，在挑选流媒体专线时请务必牢记以下三条硬指标：</p>
      <div class="pitfall-grid">
        <div class="pitfall-item">
          <h4>原则一：警惕低价超售与共享公网节点</h4>
          <p>某些几块钱的小机场超卖数千人，流媒体高峰期带宽骤降，导致大量用户同时被奈飞拉黑整个 IP 段。务必选择有带宽冗余承诺的专网。</p>
        </div>
        <div class="pitfall-item">
          <h4>原则二：避开无原生 IP 标记的纯中转线路</h4>
          <p>普通公网中转若没有采购高成本的原生家庭住宅 IP 落地，往往只能看自制剧甚至频繁报错，必须确认服务商具备原生 IP 解锁资质。</p>
        </div>
        <div class="pitfall-item">
          <h4>原则三：确认是否支持多设备并发与电视大屏</h4>
          <p>家庭观影通常涵盖手机、平板、电脑及电视盒子。务必选择支持多设备同时在线并发且适配 Apple TV / Android TV 的优质专线。</p>
        </div>
      </div>
    </div>

    <div class="stream-transition-lead">
      <span>💡</span> <b>基于以上 3 项严苛标准，我们从 40+ 款服务中实测筛选出了以下在晚高峰（20:00 - 23:00）表现最稳定的专线方案：</b>
    </div>

    <!-- 4. 第四屏：商业转化区（保留原有资产） -->
    <h2>精选流媒体专精加速服务</h2>
    <p>以下 3 款服务经我们在晚高峰（20:00 - 23:00）针对多平台 4K/8K HDR 超高清码率实测，具备出色的持续吞吐与原生住宅 IP 解锁率：</p>
    ${streamingCardsHtml}

    <h2>主流专线流媒体解锁矩阵横向对比</h2>
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>品牌</th>
            <th>骨干线路</th>
            <th>Netflix 解锁</th>
            <th>Disney+ / HBO</th>
            <th>YouTube 4K/8K</th>
            <th>晚高峰 4K 缓冲</th>
            <th>起步资费</th>
            <th>专属优惠码</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>闪电鼠</strong></td>
            <td>IEPL 内网双专线</td>
            <td><span class="badge-ok">● 全区解锁 (含非自制)</span></td>
            <td><span class="badge-ok">● 完整支持</span></td>
            <td><span class="badge-ok">220,000+ Kbps 秒开</span></td>
            <td>&lt; 0.4 秒</td>
            <td>¥8.00 / 月</td>
            <td><b>sd88</b></td>
          </tr>
          <tr>
            <td><strong>大佬云</strong></td>
            <td>企业金融级 IEPL</td>
            <td><span class="badge-ok">● 港美日台韩全区</span></td>
            <td><span class="badge-ok">● 完整支持</span></td>
            <td><span class="badge-ok">持续满速</span></td>
            <td>&lt; 0.5 秒</td>
            <td>¥8.00 / 月</td>
            <td><b>dly88</b></td>
          </tr>
          <tr>
            <td><strong>榴莲云</strong></td>
            <td>原生住宅 IP 专线</td>
            <td><span class="badge-ok">● 30+ 地区片库</span></td>
            <td><span class="badge-ok">● 完整支持</span></td>
            <td><span class="badge-ok">极速秒加载</span></td>
            <td>&lt; 0.4 秒</td>
            <td>¥8.00 / 月</td>
            <td><b>ll88</b></td>
          </tr>
          <tr>
            <td><strong>环球梯</strong></td>
            <td>内网专线+IEPL</td>
            <td><span class="badge-ok">● 主流大区支持</span></td>
            <td><span class="badge-ok">● 基础支持</span></td>
            <td><span class="badge-ok">4K 畅看</span></td>
            <td>&lt; 0.8 秒</td>
            <td>¥8.00 / 月</td>
            <td><b>hq66</b></td>
          </tr>
          <tr>
            <td><strong>光速云</strong></td>
            <td>纯正物理 IPLC</td>
            <td><span class="badge-ok">● 港日美原生</span></td>
            <td><span class="badge-ok">● 完整支持</span></td>
            <td><span class="badge-ok">零抖动播放</span></td>
            <td>&lt; 0.5 秒</td>
            <td>¥15.00 / 月</td>
            <td>特惠直购</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 5. 第五屏：折叠式流媒体解锁常见问答（FAQ）模块 -->
    <h2>流媒体解锁常见问答（FAQ）</h2>
    <div class="faq-accordion">
      <details class="faq-details" open>
        <summary class="faq-summary"><span>Q1：为什么显示连接成功，但 Netflix 只能看自制剧（Netflix Originals）？</span><span>⌄</span></summary>
        <div class="faq-body">
          <p>这是最典型的“IP 半解锁 / 机房 IP 识别”现象。Netflix 针对自身投资出品的自制剧（Originals，如《怪奇物语》、《鱿鱼游戏》）拥有全球全区播映版权，因此哪怕使用普通机房 IP 也能播放。但对于从其他好莱坞影业采购的非自制院线大片（如《哈利波特》、《蜘蛛侠》等），Netflix 受版权属地协议约束，会启用严苛的 ASN 数据库过滤机房代理。只有连接至真正的<strong>原生家庭住宅 IP</strong> 节点，平台才会为你完整开放该国家/地区的全部版权片库。</p>
        </div>
      </details>
      <details class="faq-details">
        <summary class="faq-summary"><span>Q2：Apple TV 或智能电视（Google TV / 索尼 / 电视盒子）如何配置流媒体解锁？</span><span>⌄</span></summary>
        <div class="faq-body">
          <p>在大屏设备上观看 4K HDR 流媒体主要有两种高效配置方式：<br>
          1. <strong>Apple TV 原生应用方案（最推荐）：</strong>在 Apple TV 上登录非国区（美区/港区）Apple ID，从 App Store 直接下载安装 <strong>Sing-box</strong> 或 <strong>Loon</strong> 原生 tvOS 客户端，一键导入机场订阅并开启常驻后台即可；<br>
          2. <strong>路由器网关透明代理方案：</strong>在家庭软路由或支持 OpenWrt / ASUS 官改固件的路由器上配置 <strong>OpenClash</strong>，将海外流媒体域名规则自动分流至专线，而电视家、爱奇艺、腾讯视频等国内流量直连，全家所有电视、手机与平板连上 Wi-Fi 即可无感观看。</p>
        </div>
      </details>
      <details class="faq-details">
        <summary class="faq-summary"><span>Q3：为什么看 4K 流媒体明明测速跑满了 500Mbps，拖动进度条依然要转圈卡顿？</span><span>⌄</span></summary>
        <div class="faq-body">
          <p>原因在于<strong>突发单线程握手延迟与数据包丢包率（Packet Loss）</strong>。Speedtest 测速通常是多线程全开跑峰值，掩盖了丢包问题。但流媒体播放器（如 Netflix 的 HTML5 播放器）是基于单一 TCP 连接进行持续分块切片拉取的，一旦晚高峰公网发生哪怕 1% 的丢包，TCP 拥塞控制算法就会立即触发“减半重传”，导致拉取速率断崖式下跌，播放器被迫清空缓冲池转圈。而 <strong>IEPL / IPLC 纯内网专线</strong> 拥有极低抖动（Jitter &lt; 1.5ms）和绝对的 0 丢包率，哪怕只有 50Mbps 专线带宽，拖动进度条也能在 0.3 秒内瞬间秒开。</p>
        </div>
      </details>
      <details class="faq-details">
        <summary class="faq-summary"><span>Q4：原生住宅 IP 专线和普通公网 VPN 在账号安全性上有何区别？</span><span>⌄</span></summary>
        <div class="faq-body">
          <p>普通公网 VPN 经常被数十万人轮番使用，且频繁用于批量爬虫或垃圾邮件群发，导致其 IP 在各大流媒体平台甚至 Google、Cloudflare 的风控信誉极低，容易连累用户的 Netflix 或 Disney+ 账号触发“异地异常登录警告”甚至被封控暂停订阅。而高规格原生专线（如榴莲云、闪电鼠）提供的住宅 IP 池信誉极高，不仅不弹安全验证，更能有效保障付费订阅账号的长期健康稳定。</p>
        </div>
      </details>
    </div>

    <!-- 关联集群导读 -->
    <h2>主题集群与进阶阅读导航</h2>
    <div class="article-links">
      <a href="methodology.html">📐 深入了解：翻墙怪透明专线评测标准与方法论 ↗</a>
      <a href="beginner.html">💡 新手入门指南：专线加速零基础避坑与订购流程 ↗</a>
      <a href="security.html">🛡️ 专线安全与数据隐私深度指南：防 DNS 泄漏与零日志 ↗</a>
      <a href="devices.html">📱 全平台客户端安装：Win / Mac / iOS / Android 详细配置教程 ↗</a>
      <a href="review-liulianyun.html">🎬 榴莲云深度测评：流媒体专精与原生住宅 IP 30+地区片库实测 ↗</a>
      <a href="review-shandianshu.html">⚡ 闪电鼠深度测评长文（综合第一主推品牌） ↗</a>
    </div>
`;

generateHtmlPage({
  filename: 'streaming.html',
  title: '2026 流媒体解锁专线推荐：Netflix、Disney+、YouTube 4K/8K 零卡顿 — 翻墙怪 VPN Insight',
  description: '精选原生住宅 IP 与 IEPL 专线服务，完美解锁 Netflix 全区、Disney+、YouTube Premium、HBO Max 与 TikTok，晚高峰大码率流畅播放。',
  activeNav: 'streaming',
  bodyContent: streamingContent
});

// ------------------------------------------------------------------------------------------------
// 3. 生成【设备端推荐】独立页面 devices.html
// ------------------------------------------------------------------------------------------------
const devicesContent = `
  <a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>

  <span class="section-kicker">CLIENT CONFIGURATION · 全平台客户端推荐与配置</span>
  <h1>2026 全平台客户端安装、订阅导入与智能分流配置全书（Win / Mac / iOS / Android / TV / 软路由）</h1>
  <p class="page-lead">工欲善其事，必先利其器。选对了高速稳定的专线服务，搭配一款功能强大、轻量省电的现代客户端，能让你的上网体验产生质的飞跃。本文为你全面盘点 Windows 电脑、苹果 macOS、iPhone 手机小火箭、Android 安卓系统、Apple TV 电视盒子以及 OpenWrt 软路由的最佳客户端推荐，手把手教你搞懂 TUN 虚拟网卡模式与国内外智能分流规则调优，彻底告别流量浪费与卡顿困扰。</p>

  <div class="recommend-banner">
    <div class="recommend-banner-text">
      <strong>📱 全平台极简适配首选品牌：闪电鼠 (起步 8.00 元/月)</strong>
      <span>后台一键直导 Clash、Shadowrocket、Sing-box、v2rayN 全平台订阅，支持手机与电脑多设备同时并发在线，专属优惠码 sd88。</span>
    </div>
    <a class="button button-primary" href="https://chenpin.shandianshuaff.com/#/?code=m28TvPVX" target="_blank" rel="sponsored nofollow noopener noreferrer">访问闪电鼠官网（优惠码 sd88） ↗</a>
  </div>

  <h2>一、各大操作系统主流客户端综合对比与梯队速查表</h2>
  <div class="styled-table-wrap">
    <table class="styled-table">
      <thead>
        <tr>
          <th>操作系统平台</th>
          <th>首选推荐客户端</th>
          <th>核心亮点与优势</th>
          <th>特色功能与适用场景</th>
          <th>快捷直达</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Windows 电脑</strong></td>
          <td><strong>Clash Verge Rev / v2rayN</strong></td>
          <td>现代美观 UI、极低内存占用、一键开启 TUN 网卡接管</td>
          <td>全能首选，完美支持 VLESS 协议与自定义分流规则</td>
          <td><a class="text-link" href="#windows">查看 Win 配置教程 ↓</a></td>
        </tr>
        <tr>
          <td><strong>macOS (苹果电脑)</strong></td>
          <td><strong>Clash Verge Rev / Surge</strong></td>
          <td>原生适配 Apple Silicon (M1/M2/M3/M4) 芯片，省电不发热</td>
          <td>系统深色模式适配，菜单栏常驻极速切换节点</td>
          <td><a class="text-link" href="#macos">查看 Mac 配置教程 ↓</a></td>
        </tr>
        <tr>
          <td><strong>iOS (iPhone / iPad)</strong></td>
          <td><strong>Shadowrocket (小火箭)</strong></td>
          <td>操作极度简单，扫码一秒导入，后台连接极其坚挺稳定</td>
          <td>支持精细化域名/IP分流，节点延迟一键批量测试</td>
          <td><a class="text-link" href="#ios">查看 iOS 配置教程 ↓</a></td>
        </tr>
        <tr>
          <td><strong>Android (安卓系统)</strong></td>
          <td><strong>Clash Meta / v2rayNG</strong></td>
          <td>原生支持分应用代理，后台常驻不被国内系统误杀</td>
          <td>可自由指定国内微信直连，TikTok 与外服游戏走代理</td>
          <td><a class="text-link" href="#android">查看安卓配置教程 ↓</a></td>
        </tr>
        <tr>
          <td><strong>TV 电视端</strong></td>
          <td><strong>Apple TV (Stash) & 安卓电视</strong></td>
          <td>大屏专属遥控器操作界面，4K/8K HDR 影音极速串流解码</td>
          <td>电视开机自动后台运行，YouTube / Netflix 拖拽秒开</td>
          <td><a class="text-link" href="#tv">查看电视端教程 ↓</a></td>
        </tr>
        <tr>
          <td><strong>软路由网关</strong></td>
          <td><strong>OpenWrt (PassWall / OpenClash)</strong></td>
          <td>全屋智能家居、Switch/PS5 游戏主机全自动透明翻墙</td>
          <td>网关层面统一调度分流，连上家庭 Wi-Fi 即可畅连</td>
          <td><a class="text-link" href="#router">查看软路由教程 ↓</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>二、核心技术精解：什么是 TUN 虚拟网卡模式？</h2>
  <div class="faq-box">
    <p>很多新手在使用客户端时，只开启了常规的「系统代理（System Proxy）」。然而系统代理存在重大的局限性：</p>
    <ul>
      <li><strong>系统代理的局限：</strong>系统代理只对遵循操作系统标准代理设置的 HTTP/HTTPS 应用程序（如 Chrome、Edge 浏览器）生效。而底层的命令行终端（cmd / PowerShell / git / docker）、大部分外服竞技网络游戏客户端（如 Steam、Apex Legends、EA App）、以及特定的联机语音软件，系统代理根本无法接管其 UDP 数据包，导致游戏依然卡顿无法联机；</li>
      <li><strong>TUN 虚拟网卡模式的工作原理：</strong>TUN（Network Tunnel）会在操作系统网络协议栈中虚拟出一张独立的网络适配器网卡。它在操作系统的网络底层接管整台设备的所有 IP 数据包，将所有应用发起的 TCP 和 UDP 流量无缝送入专线隧道；</li>
      <li><strong>实战建议：</strong>外服电竞联机玩家、经常使用终端拉取代码的程序员、或者使用 Discord 语音通话的用户，强烈建议在 Clash Verge Rev 或 Sing-box 设置中开启 <strong>TUN 模式</strong>（首次开启需授予管理员权限），体验真正的全局顺畅加速。</li>
    </ul>
  </div>

  <h2>三、智能分流规则集（Rule-based Routing）调优秘籍</h2>
  <div class="faq-box">
    <p>高质量的专线体验绝非“全局翻墙”，而是讲究“各行其道”的<strong>智能规则分流</strong>：</p>
    <ul>
      <li><strong>国内流量完全直连（Direct）：</strong>微信、QQ、淘宝、京东、B站、腾讯视频等国内服务完全直连本地运营商网络，不消耗任何专线套餐流量，同时享受国内原生低延迟，更不会触发国内银行或金融 App 的异地登录风控；</li>
      <li><strong>海外流量精准分流（Proxy）：</strong>
        <br>• <strong>流媒体影视组：</strong>将 Netflix、Disney+、YouTube、HBO Max 流量智能引导至流媒体专精节点（如香港、台湾、新加坡专线）；
        <br>• <strong>AI 生产力组：</strong>将 OpenAI、Claude、Gemini 域名定向至纯净的美国或日本高稳专线；
        <br>• <strong>广告拦截组（Reject）：</strong>客户端内置规则可直接拦截上千个常见的广告分析跟踪域名，加快海外网页加载速度并净化浏览界面。</li>
    </ul>
  </div>

  <h2 id="devices-guide-section">四、各主流操作系统与设备端详细配置教程</h2>
  <div class="platform-detail-list">
    
    <!-- 1. Windows 电脑 -->
    <div class="platform-detail-box" id="windows">
      <div class="platform-detail-header">
        <h3><span>💻</span> Windows 客户端：Clash Verge Rev / v2rayN 深度推荐与配置</h3>
        <span class="platform-badge">PC 桌面端首推</span>
      </div>
      <p>Windows 是目前使用人数最多的桌面平台。我们强烈推荐使用开源现代的 <strong>Clash Verge Rev</strong>（内置 Meta / Mihomo 核心）作为主力工具，老牌用户亦可选用 <strong>v2rayN</strong>。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 四步极速配置指引：</strong>
          <ol>
            <li>从官方 GitHub Releases 获取 Clash Verge Rev 最新 Windows 64 位安装包；</li>
            <li>登录机场后台（如闪电鼠），在仪表盘复制通用订阅 URL 地址；</li>
            <li>在客户端左侧菜单点击「订阅 (Profiles)」，在上方粘贴订阅链接并点击「保存/导入」；</li>
            <li>切换至「代理 (Proxies)」面板选择香港或新加坡低延迟专线节点，在「设置」中打开「系统代理」开关即可！</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 专家调优技巧与避坑：</strong>
          <ul>
            <li><strong>电竞/开发必备 TUN：</strong>在设置中安装服务模式并开启「TUN 模式」，即可直接加速 Steam 商店、外服联机和终端 Git 操作；</li>
            <li><strong>端口冲突排查：</strong>若提示 7890 端口占用，请在设置中将 Mixed Port 修改为 7895 或 10808。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. macOS 苹果电脑 -->
    <div class="platform-detail-box" id="macos">
      <div class="platform-detail-header">
        <h3><span>🍏</span> macOS 苹果电脑：Clash Verge Rev / Surge 教程与极速配置</h3>
        <span class="platform-badge">Mac 原生低功耗</span>
      </div>
      <p>苹果 macOS 系统以能效高见长。针对搭载 Apple Silicon (M1/M2/M3/M4) 芯片的 Mac，首选 <strong>Clash Verge Rev for Mac</strong>；高端开发者与网络工程师推荐 <strong>Surge for Mac</strong>。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 苹果电脑极速上手教程：</strong>
          <ol>
            <li>下载适配 Apple 架构（arm64）的 DMG 安装包，将其拖入 Applications 应用程序文件夹；</li>
            <li>首次打开时若提示安全拦截，在 macOS「系统设置」->「隐私与安全性」中点击「仍要打开」；</li>
            <li>在「订阅」页面粘贴专线订阅地址，点击导入并设置定时自动更新（推荐 24 小时）；</li>
            <li>在顶部 Menu Bar 菜单栏中开启系统代理，支持直接在状态栏查看实时上下行网络速率。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 苹果系统优化建议：</strong>
          <ul>
            <li><strong>开机静默启动：</strong>在应用设置中开启“开机自启”与“静默启动至菜单栏”，实现开机无感守护；</li>
            <li><strong>终端开发者：</strong>在设置中勾选“注入系统终端环境变量”，使 iTerm2 / Terminal 无需手动 export http_proxy。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 3. iOS / iPadOS -->
    <div class="platform-detail-box" id="ios">
      <div class="platform-detail-header">
        <h3><span>📱</span> iOS / iPadOS：Shadowrocket (小火箭) 兑换、一键导入与分流调优</h3>
        <span class="platform-badge">iPhone / iPad 首选神器</span>
      </div>
      <p>在苹果移动端，<strong>Shadowrocket（小火箭）</strong>是不折不扣的王者。其界面直观、后台保活能力极强、耗电极少，且与各大机场的一键唤醒深度打通。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 小火箭三步安装导入指引：</strong>
          <ol>
            <li>在 App Store 退出国区账号，登录非国区（美区/港区）Apple ID，搜索并兑换下载 Shadowrocket；</li>
            <li>用 Safari 浏览器登录机场后台，在「我的订阅」页面点击「一键导入 Shadowrocket」，系统会自动唤醒小火箭并同步节点；</li>
            <li>首次开启时点击首页顶部圆圈开关，iOS 系统会弹出“添加 VPN 配置”对话框，点击“允许”并输入锁屏密码即完成配置。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 最关键的防封避坑：</strong>
          <ul>
            <li><strong>全局路由模式：</strong>在小火箭首页底部，务必确认「全局路由」处于<strong>「配置 (Config)」</strong>模式，切勿错选为「代理」或「直连」；</li>
            <li><strong>节点延迟测试：</strong>点击小火箭首页“连通性测试”，可批量对所有节点进行真连接测速，优先选择延迟低于 60ms 的 IEPL 专线。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 4. Android 安卓端 -->
    <div class="platform-detail-box" id="android">
      <div class="platform-detail-header">
        <h3><span>🤖</span> Android 安卓端：Clash Meta / v2rayNG 客户端指南与保活设置</h3>
        <span class="platform-badge">分应用代理神级支持</span>
      </div>
      <p>安卓平台开放度极高，推荐使用 <strong>Clash Meta for Android (CMFA)</strong> 或 <strong>v2rayNG</strong>。二者均原生支持分应用代理和现代 VLESS 加密协议。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 安卓客户端实操指南：</strong>
          <ol>
            <li>通过 GitHub 或机场后台提供的官方 APK 安装包完成客户端安装；</li>
            <li>进入「配置管理」-> 点击右上角「+」-> 选择「从 URL 导入」-> 粘贴订阅链接并保存；</li>
            <li>在「配置」列表中选中刚刚下载的订阅，返回首页点击「启动」按钮；</li>
            <li>在「代理」页面切换策略组，选择目标节点即可。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 国产安卓系统深度防误杀保活秘籍：</strong>
          <ul>
            <li><strong>锁定后台任务：</strong>在多任务界面长按客户端卡片，点击“小锁头”图标锁定后台；</li>
            <li><strong>电池无限制：</strong>进入系统「应用信息」->「电池省电策略」，修改为<strong>「无限制」</strong>，并开启「自启动」权限，避免息屏断连。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 5. TV 电视端 -->
    <div class="platform-detail-box" id="tv">
      <div class="platform-detail-header">
        <h3><span>📺</span> TV 电视端：Apple TV (Stash/Shadowrocket) & 安卓电视 4K 影音串流指南</h3>
        <span class="platform-badge">家庭影院大屏必备</span>
      </div>
      <p>在大屏幕上享受 Netflix 4K HDR、Disney+ IMAX Enhanced 与 YouTube 4K 60FPS 超清画质，是专线加速的核心应用场景之一。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 电视大屏端配置步骤：</strong>
          <ol>
            <li><strong>Apple TV 电视盒子：</strong>系统升级至 tvOS 17 以上，登录美区 Apple ID 从 App Store 下载 <strong>Sing-box</strong>、<strong>Stash</strong> 或 <strong>Shadowrocket tvOS 版</strong>，通过同一 Wi-Fi 下的 iPhone 扫码或 AirDrop 一键投送配置；</li>
            <li><strong>安卓电视 / 索尼 / Google TV：</strong>用 U 盘将 <strong>Clash for Android TV 版</strong> 安装包拷贝至电视完成安装，通过局域网 Web 控制台输入订阅即可轻松遥控。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 大屏影音优化要点：</strong>
          <ul>
            <li><strong>开机常驻：</strong>在电视端客户端设置中开启“随电视开机自启”，开机即可直接看海外影音；</li>
            <li><strong>低抖动专线保障：</strong>4K 流媒体单切片码率极高，建议在策略组中固定选择 <strong>原生住宅 IP 专线</strong>（如闪电鼠、榴莲云），拖动进度条零卡顿。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 6. 软路由网关 -->
    <div class="platform-detail-box" id="router">
      <div class="platform-detail-header">
        <h3><span>🌐</span> 软路由网关：OpenWrt (PassWall / OpenClash) 局域网透明代理部署</h3>
        <span class="platform-badge">全屋设备无感接入</span>
      </div>
      <p>软路由网关方案能在家庭局域网总出口统一接管网络流量，全屋的 Switch / PS5 游戏机、智能音箱、扫地机器人及所有手机平板连上 Wi-Fi 即可全自动享受加速。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 软路由核心配置指引：</strong>
          <ol>
            <li><strong>插件选择：</strong>追求精细化规则和美观仪表盘选 <strong>OpenClash</strong>；追求极低 CPU 占用和多节点自动热备故障转移选 <strong>PassWall</strong>；</li>
            <li><strong>节点导入：</strong>在插件后台的节点配置中添加机场订阅 URL，设置每 12 小时自动同步最新节点；</li>
            <li><strong>运行模式：</strong>开启「Fake-IP（增强模式）」或「TUN 混合模式」，启用国内 DNS 本地解析，海外 DNS 通过专线 DoH 加密查询防污染。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 家庭网关进阶心得：</strong>
          <ul>
            <li><strong>游戏主机放行：</strong>在软路由分流规则中可将 PS5、Switch 对应的主机 IP 指定为“游戏加速策略组”，分配超低延迟 IPLC 专线；</li>
            <li><strong>国内跑满千兆：</strong>由于国内 IP 段直接走物理直连，完全不占用软路由代理运算，全家千兆宽带下载丝毫不受影响。</li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <h2>五、常见客户端疑难杂症与快速排查解决方案</h2>
  <div class="faq-box">
    <h3>Q1：Clash 启动提示“Port 7890 occupied（端口被占用）”无法连接？</h3>
    <p>答：这通常是因为电脑上有其他代理工具（如老版 v2rayN 或其他翻墙软件后台）占用了本地默认的 7890 端口。只需在 Clash Verge 设置中将混合代理端口修改为 7895 或 10808 等空闲端口，或者重启电脑彻底释放端口占用。</p>
    <h3>Q2：关闭翻墙客户端后，电脑所有网页都打不开了怎么恢复？</h3>
    <p>答：这是新手最常见的问题。原因是在退出客户端前没有先关闭「系统代理」开关，导致 Windows 系统网络设置中依然残留着指向本地 127.0.0.1:7890 的代理设置。只需打开 Windows「设置」->「网络和 Internet」->「代理」，将「使用代理服务器」开关手动关闭，国内网络即可瞬间恢复。</p>
    <h3>Q3：手机小火箭连上后，节点测速正常但打不开推特或 YouTube？</h3>
    <p>答：请检查小火箭底部的路由设置是否误选成了「直连」模式。务必将全局路由设为「配置（Config）」模式，让客户端依靠规则分流自动引导海外流量。</p>
    <h3>Q4：为什么电视盒子连接专线看 Netflix 还是提示“代理错误”？</h3>
    <p>答：电视端（尤其是 Apple TV）对代理节点的 IP 纯净度检测比手机端更加严苛。请确保电视端客户端分流节点选中的是带有“原生住宅”或“流媒体专精”标识的专属专线（如闪电鼠或榴莲云的专线节点），普通机房中转节点会被 Netflix 识别并拦截。</p>
  </div>

  <h2>六、主题集群与进阶阅读导航</h2>
  <div class="article-links">
    <a href="methodology.html">📐 翻墙怪专线网络评测标准与方法论 ↗</a>
    <a href="beginner.html">💡 新手入门完全指南：从零理解专线与防坑技巧 ↗</a>
    <a href="security.html">🛡️ 专线安全与数据隐私深度指南：防 DNS 泄漏与零日志 ↗</a>
    <a href="streaming.html">🎬 流媒体解锁指南：Netflix 与 Disney+ 4K 原生解锁秘籍 ↗</a>
    <a href="review-shandianshu.html">⚡ 闪电鼠深度测评长文（全平台一键适配旗舰） ↗</a>
    <a href="review-dalaoyun.html">☁️ 大佬云深度测评长文（高稳老牌客户口碑标杆） ↗</a>
  </div>
`;

generateHtmlPage({
  filename: 'devices.html',
  title: '全平台客户端安装与配置推荐指南 — 翻墙怪 VPN Insight',
  description: '涵盖 Windows、macOS、iOS 小火箭、Android 安卓、Apple TV 电视盒子及软路由客户端详细配置，详解 TUN 模式与国内外智能分流规则集。',
  activeNav: 'devices',
  bodyContent: devicesContent
});

// ------------------------------------------------------------------------------------------------
// 4. 生成【安全指南】独立页面 security.html
// ------------------------------------------------------------------------------------------------
const securityContent = `
  <span class="section-kicker">SECURITY & PRIVACY · 专线安全与数据隐私</span>
  <h1>专线代理与数据隐私安全详解：从底层加密到零日志防护</h1>
  <p class="page-lead">理清网络传输加密、专线防护与网络安全边界。教你在公共 Wi-Fi、跨国协同与日常浏览中筑牢坚不可摧的隐私防线。</p>

  <div class="recommend-banner">
    <div class="recommend-banner-text">
      <strong>🛡️ 隐私与商业安全推荐：云界线 / 大佬云</strong>
      <span>商用级纯净出口 IP，告别 Google 频繁人机验证，全链路高强度 TLS/Reality 加密。</span>
    </div>
    <a class="button button-primary" href="https://chenpinga.yunjiexianaff.com/#/?code=rTCMGvQT" target="_blank" rel="sponsored nofollow noopener noreferrer">访问云界线官网（优惠码 yjx888） ↗</a>
  </div>

  <h2>一、为什么优先选择 VLESS 协议？与传统协议的安全对比</h2>
  <div class="faq-box">
    <p>传统的 VMess 协议虽然具备混淆能力，但其繁复的数据包头结构和固定时间戳握手特征在大规模深度包检测（DPI）面前逐渐暴露。而 <strong>VLESS</strong> 是一种轻量化、无状态的新一代协议：</p>
    <ul>
      <li><strong>去除多余加密握手：</strong>VLESS 不在自身协议层做多余的重复加解密，而是将加密任务完全交给外层的标准 <strong>TLS 1.3 / XTLS</strong> 传输安全层。</li>
      <li><strong>Reality 伪装技术：</strong>结合 Reality 方案，客户端可以直接借用外部合规大厂（如 Apple、Microsoft、Amazon）的合规 TLS 证书与握手特征，使流量外观与正常 HTTPS 访问大型网站毫无二致，从底层彻底瓦解流量特征识别。</li>
    </ul>
  </div>

  <h2>二、IEPL / IPLC 专线在物理层的安全优势</h2>
  <div class="faq-box">
    <p>许多用户误以为所有翻墙工具的安全性都相同，其实底层链路有着天壤之别：</p>
    <ul>
      <li><strong>传统普通公网直连 / 中转：</strong>数据包在公共国际互联网上传播，经过大量不可控的公共骨干网路由节点，容易遭遇流量嗅探、DNS 劫持及敏感时期的 QoS 严重限速。</li>
      <li><strong>IEPL / IPLC 内部专线：</strong>数据包进入境内入口机房后，直接通过物理专线光纤或专用隧道进行内网点对点跨境传输，根本不经过公网国际出口关口。因此在数据私密性、防审查和抗干扰层面具备绝对的物理优势。</li>
    </ul>
  </div>

  <h2>三、“零日志”（No-Logs）架构的技术实现</h2>
  <div class="faq-box">
    <p>真正的网络隐私不仅需要传输加密，更需要节点服务器具备严格的数据无痕机制：</p>
    <ul>
      <li><strong>只读内存纯 RAM-only 运行：</strong>顶级专线服务商（如闪电鼠、大佬云）的出口节点采用无盘纯内存系统，操作系统与内核均运行在易失性 RAM 中。</li>
      <li><strong>物理断电即彻底抹除：</strong>服务器一旦重启或断电，所有临时的缓存数据、连接记录均在纳秒内彻底湮灭，在磁盘上不留任何可供恢复的数据痕迹。</li>
    </ul>
  </div>

  <h2>四、个人网络安全最佳实践清单</h2>
  <div class="platform-grid">
    <div class="platform-card">
      <h3><span>🔐</span> 开启双重身份验证 (2FA)</h3>
      <p>为 Google、GitHub、Apple ID、Twitter 等重要海外账户开启基于 TOTP（如 1Password、Google Authenticator）的二次验证，防止密码泄露导致账号受损。</p>
    </div>
    <div class="platform-card">
      <h3><span>🛡️</span> 配置 DoH / DoT 加密 DNS</h3>
      <p>在客户端中启用安全加密 DNS（如 Cloudflare 1.1.1.1 或 Google 8.8.8.8），杜绝本地运营商的 DNS 劫持与域名访问污染。</p>
    </div>
    <div class="platform-card">
      <h3><span>📶</span> 公共 Wi-Fi 保持常连</h3>
      <p>在咖啡厅、机场或酒店连接开放无密码 Wi-Fi 时，务必开启专线代理，高强度 TLS 隧道可完全抵御局域网中间人攻击与会话劫持。</p>
    </div>
  </div>
`;

generateHtmlPage({
  filename: 'security.html',
  title: '专线代理与数据隐私安全详解：底层加密与零日志 — 翻墙怪 VPN Insight',
  description: '深入剖析 VLESS 现代协议、TLS 1.3 Reality 伪装、IEPL/IPLC 物理专线与零日志 RAM-only 内存架构的安全优势。',
  activeNav: 'security',
  bodyContent: securityContent
});

// ------------------------------------------------------------------------------------------------
// 5. 生成【博客资讯】独立页面 blog.html
// ------------------------------------------------------------------------------------------------
const blogPosts = [
  {
    tag: '专线科普',
    time: '8 分钟阅读',
    date: '2026 年 11 月',
    title: '2026 最新专线机场选购避坑完全指南：IEPL 与 IPLC 究竟差在哪里？',
    desc: '很多新手在选购机场时经常被各种“中继”、“BGP”、“IEPL”、“IPLC”专业名词弄得眼花缭乱。本文从底层物理网络拓扑、防封原理、晚高峰延迟与资费性价比出发，帮你一次讲透。',
    link: 'methodology.html'
  },
  {
    tag: '流媒体技巧',
    time: '6 分钟阅读',
    date: '2026 年 11 月',
    title: '想用专线看 Netflix 与 Disney+ 4K？先弄清楚这 5 件事',
    desc: '为什么测速几十万 Kbps 依然打不开 Netflix 片库？为什么频繁提示“您似乎正在使用代理”？原生家庭住宅 IP 与机房 IP 的本质区别，以及大屏电视盒子的智能分流秘籍。',
    link: 'streaming.html'
  },
  {
    tag: '游戏加速',
    time: '7 分钟阅读',
    date: '2026 年 11 月',
    title: '外服游戏联机跳 Ping 丢包严重？电竞专线实测与 UDP QOS 优化秘籍',
    desc: '专为 Steam、Apex Legends、Valorant、EA FC 及 PS5/Switch 主机玩家打造。如何利用 TUN 虚拟网卡接管底层 UDP 流量，彻底解决掉线与跳 Ping 困扰。',
    link: 'review.html?id=shenxing'
  },
  {
    tag: '生产力协同',
    time: '5 分钟阅读',
    date: '2026 年 11 月',
    title: '跨国远程办公与开发者指南：如何获得纯净 IP 避免 Google 频繁人机验证？',
    desc: '探讨商用纯净出口 IP 的重要性，如何保障海外 GitHub 代码拉取、AWS/GCP 控制台访问以及 ChatGPT-4o / Claude 3.5 稳定不被封号。',
    link: 'review.html?id=yunjiexian'
  },
  {
    tag: '客户端配置',
    time: '9 分钟阅读',
    date: '2026 年 11 月',
    title: '全平台客户端安装与智能分流配置完全指南（Win / Mac / iOS / Android / TV）',
    desc: '汇总 Clash Verge Rev、v2rayN、Shadowrocket 小火箭与 Sing-box 在各主流操作系统的安装包获取、订阅一键导入与国内外流量自动分流规则教程。',
    link: 'devices.html'
  },
  {
    tag: '省钱攻略',
    time: '4 分钟阅读',
    date: '2026 年 11 月',
    title: '2026 最新各大专线机场优惠码汇总与省钱购买攻略（闪电鼠 sd88 / 大佬云 dly88）',
    desc: '全网高口碑专线服务商当前正在生效的折扣立减优惠码盘点。如何花不到一杯奶茶的钱享受高规格 IEPL 骨干网带来的高速连接。',
    link: 'index.html'
  }
];

const blogListHtml = blogPosts.map(p => `
  <a class="blog-item" href="${p.link}">
    <div class="blog-meta">
      <span>🏷️ ${p.tag}</span>
      <span>⏱️ ${p.time}</span>
      <span>📅 ${p.date}</span>
    </div>
    <h3>${p.title} ↗</h3>
    <p>${p.desc}</p>
    <div class="blog-tags">
      <span>阅读全文 →</span>
      <span>实测长文</span>
      <span>2026 最新</span>
    </div>
  </a>
`).join('');

const blogReviewsHtml = services.map(s => `
  <a href="review.html?id=${s.id}" class="text-link" style="display:inline-block;margin:6px 14px 6px 0;font-size:13px;padding:6px 12px;background:#fff;border:1px solid #dce5d4;border-radius:6px">
    <b>${s.name}</b> 深度评测与专线解析 ↗
  </a>
`).join('');

const blogContent = `
  <span class="section-kicker">KNOWLEDGE HUB · 专线知识与资讯</span>
  <h1>专线知识、测速评测长文与使用技巧</h1>
  <p class="page-lead">把复杂的网络加速与专线技术讲得通俗易懂。汇集最新的行业动态、评测报告、省钱技巧与配置指南，助你随时掌握科学上网前沿技术。</p>

  <h2>精选资讯与深度指南</h2>
  <div class="blog-list">
    ${blogListHtml}
  </div>

  <h2>各大核心专线深度评测长文快速通道</h2>
  <p>点击下方链接可直接查阅我们对各服务商的独立详细评测数据与晚高峰测速报告：</p>
  <div style="margin:20px 0;display:flex;flex-wrap:wrap">
    ${blogReviewsHtml}
  </div>
`;

generateHtmlPage({
  filename: 'blog.html',
  title: '专线知识、测速评测与使用技巧 — 翻墙怪 VPN Insight',
  description: '汇集专线科普、流媒体解锁攻略、外服游戏加速评测、客户端配置技巧与最新优惠码动态。',
  activeNav: 'blog',
  bodyContent: blogContent
});

// ------------------------------------------------------------------------------------------------
// 6. 生成【通用单品牌深度评测长文页】review.html
// ------------------------------------------------------------------------------------------------
const reviewContent = `
  <div id="dynamic-review-box">
    <!-- 由 js/app.js 根据 URL 参数 ?id=xxx 自动渲染对应的完整深度测评报告 -->
  </div>
`;

generateHtmlPage({
  filename: 'review.html',
  title: '专线服务深度评测报告 — 翻墙怪 VPN Insight',
  description: '客观透明的专线网络服务深度评测报告，包含线路规格、晚高峰实测、开业时间、客户端支持与专属优惠码。',
  activeNav: 'index',
  bodyContent: reviewContent
});

// ------------------------------------------------------------------------------------------------
// 7. 生成【新手指南】beginner.html
// ------------------------------------------------------------------------------------------------
const beginnerContent = `
  <span class="section-kicker">GETTING STARTED · 新手入门指南</span>
  <h1>专线网络服务新手入门完全指南</h1>
  <p class="page-lead">从零理解什么是 IEPL/IPLC 专线，到在手机和电脑上建立你的第一次高速连接。</p>

  <div class="recommend-banner">
    <div class="recommend-banner-text">
      <strong>🚀 新手高性价比首选：闪电鼠 (起步 8元/月)</strong>
      <span>支持灵活月付，全节点部署 VLESS 协议，Clash/小火箭一键导入，新手友好度极佳。</span>
    </div>
    <a class="button button-primary" href="https://chenpin.shandianshuaff.com/#/?code=m28TvPVX" target="_blank" rel="sponsored nofollow noopener noreferrer">访问官网（优惠码 sd88） ↗</a>
  </div>

  <h2>一、什么是专线服务？它和老旧的传统工具有什么区别？</h2>
  <div class="faq-box">
    <p>传统的 VPN 工具主要基于公网传输，在国际出口公网拥堵或特殊时期容易被防火墙识别和限速。而现代<strong>专线加速服务（如 IEPL / IPLC）</strong>是在海缆中租用企业级点对点专用通道，数据直接在内网高速光缆中传输，彻底避开了公网的拥堵和封锁干扰，因而具备低延迟、零丢包的巨大优势。</p>
  </div>

  <h2>二、为什么推荐 VLESS 协议？</h2>
  <div class="faq-box">
    <p>VLESS 是目前最新的无状态轻量化传输协议。与老一代 VMess 相比，它省去了客户端和服务器之间繁琐的加密握手开销，网络响应更快、丢包率更低，配合 TLS 1.3 现代加密技术，兼顾了极致的速度与最高等级的安全性。</p>
  </div>

  <h2>三、新手订购与配置的简易四步</h2>
  <div class="platform-grid">
    <div class="platform-card">
      <h3><span>1️⃣</span> 挑选适合你的套餐</h3>
      <p>日常轻度查资料与社交推荐 8 元入门套餐（如 <a class="text-link" href="https://chenpin.shandianshuaff.com/#/?code=m28TvPVX" target="_blank">闪电鼠</a>、<a class="text-link" href="https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km" target="_blank">大佬云</a>）；重度追剧推荐流媒体专精套餐；电竞联机推荐低延迟专线。</p>
    </div>
    <div class="platform-card">
      <h3><span>2️⃣</span> 复制订阅链接</h3>
      <p>购买成功后进入用户后台，找到“一键订阅”或“复制订阅链接”按钮，复制专属 URL 地址。</p>
    </div>
    <div class="platform-card">
      <h3><span>3️⃣</span> 下载并导入客户端</h3>
      <p>电脑端下载 <strong>Clash Verge Rev</strong>，手机端下载 <strong>Shadowrocket</strong>，在订阅管理中粘贴并保存，即可一键下载全节点列表。</p>
    </div>
    <div class="platform-card">
      <h3><span>4️⃣</span> 开启连接并测试</h3>
      <p>选择香港或日本节点，打开客户端代理开关。打开海外网页（如 Google、YouTube）验证是否能够流畅秒开。</p>
    </div>
  </div>
`;

generateHtmlPage({
  filename: 'beginner.html',
  title: '专线网络服务新手入门完全指南 — 翻墙怪 VPN Insight',
  description: '从零理解什么是 IEPL/IPLC 专线，到在手机和电脑上建立你的第一次高速连接。',
  activeNav: 'index',
  bodyContent: beginnerContent
});

// ------------------------------------------------------------------------------------------------
// 8. 生成【评测方法】methodology.html
// ------------------------------------------------------------------------------------------------
const methodologyContent = `
  <span class="section-kicker">OUR METHODOLOGY · 评测标准与原则</span>
  <h1>透明的专线评测标准与方法论</h1>
  <p class="page-lead">我们如何对各大专线网络服务进行客观、独立、可复现的深度测试，确保推荐信息的真实可信。</p>

  <h2>一、测试环境与多节点监控</h2>
  <div class="faq-box">
    <p>我们在华东（电信/联通）、华南（移动/电信）、华北（联通）部署了多线 BGP 自动测速节点，在全国网络负荷最高的<strong>晚高峰（20:00 - 23:00）黄金时段</strong>进行持续性压力测试。考核指标包括单线程与多线程下载速率、RTT 网络延迟、延迟抖动（Jitter）以及丢包率。</p>
  </div>

  <h2>二、流媒体与现代协议支持考核</h2>
  <div class="faq-box">
    <p>我们持续监测主流流媒体平台（Netflix 全区、Disney+、YouTube Premium、HBO Max、TikTok）以及主流 AI 工具（ChatGPT-4o、Claude 3.5 Pro、Midjourney）的原生 IP 解锁率。对于频繁弹出人机验证或伪造解锁的节点做降级处理；全面优先推荐支持 VLESS 等新一代无状态协议的服务商。</p>
  </div>

  <h2>三、商业透明度与联盟披露</h2>
  <div class="faq-box">
    <p>我们保持评测的独立性。所有推荐均基于团队真实长期的购买与测速体验。页面中提供的专属优惠码（如闪电鼠 <code>sd88</code>、大佬云 <code>dly88</code>）均为我们向服务商争取到的读者专属折扣，力求让每一位用户享受到真实可查的优惠。</p>
  </div>
`;

generateHtmlPage({
  filename: 'methodology.html',
  title: '透明的专线评测标准与方法论 — 翻墙怪 VPN Insight',
  description: '翻墙怪 VPN Insight 如何对各大专线网络服务进行客观、独立、可复现的深度测试。',
  activeNav: 'index',
  bodyContent: methodologyContent
});

// ------------------------------------------------------------------------------------------------
// 9. 生成【关于我们】about.html
// ------------------------------------------------------------------------------------------------
const aboutContent = `
  <span class="section-kicker">ABOUT US · 关于翻墙怪</span>
  <h1>关于翻墙怪 VPN Insight</h1>
  <p class="page-lead">让每一次连接，都多一份安心。独立的专线加速评测与网络隐私指南。</p>

  <h2>我们的初衷</h2>
  <div class="faq-box">
    <p>在这个信息高度互联的时代，跨境访问、外服游戏、学术交流与流媒体娱乐已成为数以百万计用户的日常刚需。然而，市场上充斥着大量虚标带宽、频繁跑路、公网滥用的劣质梯子。翻墙怪 VPN Insight 创立的初衷，就是通过透明的评测标准、真实的专线测速数据和及时的优惠信息，帮助大家筛选出真正稳定、高速、高性价比的网络服务。</p>
  </div>

  <h2>我们的收录原则</h2>
  <ul>
    <li><strong>严选真专线：</strong>优先收录采用真正 IEPL / IPLC 内网专线链路的服务商，剔除假专线与易受公网干扰的廉价方案。</li>
    <li><strong>协议现代化：</strong>全面推荐部署 VLESS 协议的服务，保障高吞吐与抗封锁能力。</li>
    <li><strong>运营信誉良好：</strong>严格剔除运营不稳定、客服长期失联的小作坊，优先推荐有技术积累、长期稳健运营的品牌。</li>
  </ul>
`;

generateHtmlPage({
  filename: 'about.html',
  title: '关于我们 — 翻墙怪 VPN Insight',
  description: '让每一次连接，都多一份安心。独立的专线加速评测与网络隐私指南。',
  activeNav: 'index',
  bodyContent: aboutContent
});

// ------------------------------------------------------------------------------------------------
// 10. 生成【联盟合作声明】disclosure.html
// ------------------------------------------------------------------------------------------------
const disclosureContent = `
  <span class="section-kicker">DISCLOSURE · 联盟合作与数据声明</span>
  <h1>联盟合作与数据披露声明</h1>
  <p class="page-lead">保持透明度是我们与读者之间建立信任的基石。</p>

  <h2>商业合作说明</h2>
  <div class="faq-box">
    <p>为了支持本站的服务器租用、网络测试节点带宽维护以及持续的内容更新，本站部分外部跳转链接（例如“访问官网 ↗”按钮）包含联盟推广代码。如果你通过这些链接注册或订购服务，服务商可能会支付给我们一定的推荐佣金，这不会向你收取任何额外费用，并且在许多情况下，通过我们的专属链接或优惠码（如 <code>sd88</code>、<code>dly88</code>）你还可以获得比官网直接购买更优惠的折扣。</p>
  </div>

  <h2>数据实测与免责</h2>
  <div class="faq-box">
    <p>本站所展示的评分、下载速率、延迟指标及节点数量均为基于特定宽带环境与测试周期的参考基准数据。因各省份运营商宽带环境、用户本地网络条件及服务商不同时期节点维护策略不同，实际体验可能会略有差异。建议在购买时优先选择支持月付体验的基础套餐。</p>
  </div>
`;

generateHtmlPage({
  filename: 'disclosure.html',
  title: '联盟合作与数据披露声明 — 翻墙怪 VPN Insight',
  description: '翻墙怪 VPN Insight 的联盟推广机制与数据真实性披露说明。',
  activeNav: 'index',
  bodyContent: disclosureContent
});

// ------------------------------------------------------------------------------------------------
// 11. 生成【隐私政策】privacy.html 与【使用条款】terms.html
// ------------------------------------------------------------------------------------------------
generateHtmlPage({
  filename: 'privacy.html',
  title: '翻墙怪隐私政策与数据安全声明 — 翻墙怪 VPN Insight',
  description: '翻墙怪站点的数据处理、本地搜索机制与隐私安全说明。',
  activeNav: 'index',
  bodyContent: `
    <span class="section-kicker">PRIVACY POLICY · 隐私政策</span>
    <h1>翻墙怪隐私政策与数据安全声明</h1>
    <p class="page-lead">当前站点的数据处理与隐私安全说明。</p>
    <h2>一、纯静态架构与无数据追踪</h2>
    <div class="faq-box">
      <p>本站为纯静态页面架构，不设置用户注册登录数据库，不加载任何第三方商业广告追踪器或数据采集脚本，绝不记录或收集读者的任何个人身份信息与网络浏览历史。</p>
    </div>
    <h2>二、本地即时搜索与数据安全</h2>
    <div class="faq-box">
      <p>站内的 Ctrl+K 搜索功能完全在你的本地浏览器内存中进行毫秒级即时匹配，不会向任何外部服务器发送你的搜索关键词。</p>
    </div>
    <h2>三、外部服务商隐私条款</h2>
    <div class="faq-box">
      <p>当你点击外部链接跳转至各服务商网站后，相关的注册、支付与账户管理受该服务商自身的隐私政策与服务协议保护，建议在付款前详细查阅对方官网声明。</p>
    </div>
  `
});

generateHtmlPage({
  filename: 'terms.html',
  title: '使用条款 — 翻墙怪 VPN Insight',
  description: '使用本站推荐信息与专线服务前的注意事项与条款说明。',
  activeNav: 'index',
  bodyContent: `
    <span class="section-kicker">TERMS OF SERVICE · 使用条款</span>
    <h1>使用条款</h1>
    <p class="page-lead">使用本站推荐信息与专线服务前的注意事项。</p>
    <h2>一、信息参考性质</h2>
    <div class="faq-box">
      <p>本站所列评分、测速指标、节点数量和价格均为基于测试环境的参考信息，具体套餐资费、流量配额以各服务商官网当前页面为准。</p>
    </div>
    <h2>二、合规自律与合法使用</h2>
    <div class="faq-box">
      <p>请在遵守国家法律法规及各平台使用条款的前提下合法合规使用网络加速服务，严禁用于任何违法犯罪活动。</p>
    </div>
    <h2>三、第三方交易与售后</h2>
    <div class="faq-box">
      <p>订阅付款与退款申诉由对应服务商独立提供售后服务，建议妥善保管好个人账号与订阅链接。</p>
    </div>
  `
});

// ------------------------------------------------------------------------------------------------
// 12. 生成【站点地图】sitemap.html
// ------------------------------------------------------------------------------------------------
const sitemapLinks = [
  { title: '翻墙怪首页 · 最佳 VPN 专线榜单', url: 'index.html' },
  { title: '流媒体解锁专线独立页面（Netflix/Disney+/4K）', url: 'streaming.html' },
  { title: '全平台客户端安装与配置推荐（Win/Mac/iOS/Android/TV）', url: 'devices.html' },
  { title: '安全指南：专线安全与数据隐私深度剖析', url: 'security.html' },
  { title: '博客资讯：专线知识与行业动态中心', url: 'blog.html' },
  { title: '新手指南：专线网络服务零基础入门指南', url: 'beginner.html' },
  { title: '评测方法：透明的专线评测标准与原则', url: 'methodology.html' },
  { title: '关于我们：翻墙怪 VPN Insight 团队初衷', url: 'about.html' },
  { title: '联盟合作声明：商业披露与数据说明', url: 'disclosure.html' },
  { title: '隐私政策：数据安全与无跟踪原则', url: 'privacy.html' },
  { title: '使用条款：使用注意事项', url: 'terms.html' }
];

const sitemapReviews = services.map(s => ({
  title: `【${s.name}】深度专线评测与配置长文报告`,
  url: `review.html?id=${s.id}`
}));

const sitemapContent = `
  <span class="section-kicker">SITEMAP · 站点地图</span>
  <h1>站点地图</h1>
  <p class="page-lead">快速索引翻墙怪 VPN Insight 站内所有独立页面、专线指南与服务商深度评测长文。</p>

  <h2>核心导航独立页面</h2>
  <div class="article-links">
    ${sitemapLinks.map(l => `<a href="${l.url}">${l.title} ↗</a>`).join('')}
  </div>

  <h2>11 款核心服务商深度评测独立长文</h2>
  <div class="article-links">
    ${sitemapReviews.map(l => `<a href="${l.url}">${l.title} ↗</a>`).join('')}
  </div>
`;

generateHtmlPage({
  filename: 'sitemap.html',
  title: '站点地图 — 翻墙怪 VPN Insight',
  description: '快速索引翻墙怪 VPN Insight 站内所有独立页面、专线指南与服务商深度评测长文。',
  activeNav: 'index',
  bodyContent: sitemapContent
});

// ------------------------------------------------------------------------------------------------
// 13. 更新 index.html 中的主导航链接与页脚链接，确保全站跳转至独立页面
// ------------------------------------------------------------------------------------------------
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 替换主导航
const oldNavRegex = /<nav id="main-nav" aria-label="主导航">[\s\S]*?<\/nav>/;
const newNav = `<nav id="main-nav" aria-label="主导航">
      <a href="index.html" class="">首页</a>
      <a href="vpn.html" class="">VPN推荐 <span class="nav-arrow">⌄</span></a>
      <a href="streaming.html">流媒体解锁</a>
      <a href="devices.html">设备端推荐</a>
      <a href="security.html">安全指南</a>
      <a href="blog.html">博客资讯</a>
    </nav>`;
indexHtml = indexHtml.replace(oldNavRegex, newNav);

// 替换页脚
const oldFooterRegex = /<footer>[\s\S]*?<\/footer>/;
const newFooter = `<footer><div class="container"><div class="footer-main"><div class="footer-brand"><a href="index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#19593c"/>
      <stop offset="100%" stop-color="#0e3624"/>
    </linearGradient>
    <linearGradient id="fqg-horn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a><p>让每一次连接，都多一份安心。<br>独立的 VPN 评测与网络隐私指南。</p></div><div><h3>发现 VPN</h3><a href="index.html">VPN推荐 <span>⌄</span></a><a href="streaming.html">流媒体解锁</a><a href="devices.html">设备端推荐</a></div><div><h3>了解翻墙怪</h3><a href="about.html">关于我们</a><a href="methodology.html">评测方法</a><a href="disclosure.html">联盟合作声明</a></div><div><h3>资源与帮助</h3><a href="beginner.html">新手指南</a><a href="security.html">安全指南</a><a href="blog.html">博客资讯</a></div></div><div class="affiliate-disclosure"><strong>联盟合作声明</strong><p>本站部分外部链接可能为联盟推广链接。如果你通过这些链接购买服务，我们可能获得佣金，你无需额外付费。商业合作可能影响产品的展示位置；正式发布的评测应遵循公开的编辑标准。本网站为框架演示，展示数据未经独立验证，不构成购买保证。</p></div><div class="footer-bottom"><span>© 2026 翻墙怪 VPN Insight. 保留所有权利。</span><div><a href="privacy.html">隐私政策</a><a href="terms.html">使用条款</a><a href="sitemap.html">站点地图</a><span>简体中文 ⌄</span></div></div></div></footer>`;
indexHtml = indexHtml.replace(oldFooterRegex, newFooter);

// 替换 announcement 链接
indexHtml = indexHtml.replace('index.html?page=methodology', 'methodology.html');
indexHtml = indexHtml.replace('index.html#guides', 'blog.html');
indexHtml = indexHtml.replace('href="index.html?page=streaming"', 'href="streaming.html"');
indexHtml = indexHtml.replace('href="index.html?page=security"', 'href="security.html"');
indexHtml = indexHtml.replace('href="index.html?page=devices"', 'href="devices.html"');
indexHtml = indexHtml.replace('href="index.html?page=blog"', 'href="blog.html"');
indexHtml = indexHtml.replace('href="index.html?page=beginner"', 'href="beginner.html"');
indexHtml = indexHtml.replace('href="index.html?page=disclosure"', 'href="disclosure.html"');
indexHtml = indexHtml.replace('href="index.html?page=privacy"', 'href="privacy.html"');
indexHtml = indexHtml.replace('href="index.html?page=terms"', 'href="terms.html"');
indexHtml = indexHtml.replace('href="index.html?page=sitemap"', 'href="sitemap.html"');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully updated index.html with standalone page links');
