const fs = require('fs');
const path = require('path');

// 统一公共组件生成器
function getHeader(activePage = 'index') {
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
      <a href="streaming.html" class="${activePage === 'streaming' ? 'nav-active' : ''}">流媒体解锁</a>
      <a href="devices.html" class="${activePage === 'devices' ? 'nav-active' : ''}">设备端推荐</a>
      <a href="security.html" class="${activePage === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="blog.html" class="${activePage === 'blog' ? 'nav-active' : ''}">博客资讯</a>
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

// 统计汉字数辅助函数
function countChineseChars(text) {
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

module.exports = {
  getHeader,
  getFooter,
  countChineseChars
};
