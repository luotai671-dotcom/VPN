const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '..');

function countChineseChars(text) {
  if (!text) return 0;
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

// 统一的 VPN 推荐下拉组件
function getVpnNavHtml(activePage = '', depth = 0) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  const activeClass = activePage === 'vpn' ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-vpn-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="${root}vpn.html" class="${activeClass}">VPN推荐 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开VPN推荐分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="VPN推荐分类子菜单">
          <div class="dropdown-grid">
            <a href="${root}vpn.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">2026 专线排行榜</div>
                <div class="dropdown-item-desc">精选 11 款核心专线与真 IEPL 综合排行</div>
              </div>
            </a>
            <a href="${root}streaming.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="15" rx="2"/><polygon points="10 8 16 11.5 10 15 10 8" fill="currentColor"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">4K 流媒体专线</div>
                <div class="dropdown-item-desc">Netflix 全区与 Disney+ 原生住宅解锁</div>
              </div>
            </a>
            <a href="${root}blog/cheap-vpn-airport-recommendation/index.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">平价高性价比机场</div>
                <div class="dropdown-item-desc">月付 8~15 元真专线对比与防跑路实测</div>
              </div>
            </a>
            <a href="${root}blog/best-vpn-for-chatgpt-claude/index.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">ChatGPT / Claude 专线</div>
                <div class="dropdown-item-desc">防降智纯净 IP 节点与一键规则分流</div>
              </div>
            </a>
            <a href="${root}blog/low-latency-gaming-iepl-vpn/index.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">低延迟游戏专线</div>
                <div class="dropdown-item-desc">晚高峰 0 丢包直连与电竞级专线评测</div>
              </div>
            </a>
            <a href="${root}methodology.html" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">评测方法与标准</div>
                <div class="dropdown-item-desc">晚高峰实测机制与自费盲测原则</div>
              </div>
            </a>
          </div>
          <div class="dropdown-footer">
            <a href="${root}vpn.html" class="dropdown-footer-link">查看 2026 专线与 VPN 独立推荐总览页 <span>→</span></a>
          </div>
        </div>
      </div>`;
}

// 统一的设备端下拉组件
function getDevicesNavHtml(activePage = '', depth = 0) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  const activeClass = activePage === 'devices' ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-devices-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="${root}devices.html" class="${activeClass}">设备端推荐 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开设备端分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="设备端分类子菜单">
          <div class="dropdown-grid">
            <a href="${root}devices.html#windows" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5.5 10 4.5v6.5H3zM11.5 4.3 21 3v8h-9.5zM3 13h7v6.5l-7-1zM11.5 13H21v8l-9.5-1.3z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Windows 客户端</div>
                <div class="dropdown-item-desc">Clash Verge Rev / v2rayN 推荐与配置</div>
              </div>
            </a>
            <a href="${root}devices.html#macos" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.72-.93 2.74 1.01.08 2.03-.49 2.65-1.24z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">macOS 苹果电脑</div>
                <div class="dropdown-item-desc">Clash Verge Rev / Surge 教程</div>
              </div>
            </a>
            <a href="${root}devices.html#ios" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">iOS / iPadOS</div>
                <div class="dropdown-item-desc">Shadowrocket (小火箭) 兑换与一键导入</div>
              </div>
            </a>
            <a href="${root}devices.html#android" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="4" width="14" height="17" rx="2"/><circle cx="12" cy="7" r="1" fill="currentColor"/><path d="M10 18h4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Android 安卓端</div>
                <div class="dropdown-item-desc">Clash Meta / v2rayNG 客户端指南</div>
              </div>
            </a>
            <a href="${root}devices.html#tv" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">TV 电视端</div>
                <div class="dropdown-item-desc">Apple TV (Stash) & 安卓电视</div>
              </div>
            </a>
            <a href="${root}devices.html#router" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 18h.01M10 18h.01M14 18h.01M18 18h.01M4 14V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8"/><path d="M8 10h8"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">软路由网关</div>
                <div class="dropdown-item-desc">OpenWrt (PassWall / OpenClash) 配置</div>
              </div>
            </a>
          </div>
          <div class="dropdown-footer">
            <a href="${root}devices.html" class="dropdown-footer-link">查看全平台客户端配置总览指南 <span>→</span></a>
          </div>
        </div>
      </div>`;
}

// 统一的 AI 工具下拉组件 (指向 5 个独立页面路由)
function getAiNavHtml(activePage = '', depth = 0) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  const isAiActive = activePage === 'ai' || activePage.startsWith('ai-');
  const activeClass = isAiActive ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-ai-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="/ai-tools" class="${activeClass}">AI 工具 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开 AI 工具分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="AI 工具分类子菜单">
          <div class="dropdown-grid">
            <a href="/ai-tools/shadowrocket" class="dropdown-item ${activePage === 'ai-shadowrocket' ? 'dropdown-item-active' : ''}">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5"/><path d="M15 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Shadowrocket (小火箭)</div>
                <div class="dropdown-item-desc">iOS 端 AI 专线分流与规则配置</div>
              </div>
            </a>
            <a href="/ai-tools/clash-verge" class="dropdown-item ${activePage === 'ai-clash-verge' ? 'dropdown-item-active' : ''}">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Verge Rev</div>
                <div class="dropdown-item-desc">PC 端全平台 AI 节点与 TUN 模式加速</div>
              </div>
            </a>
            <a href="/ai-tools/clash-meta" class="dropdown-item ${activePage === 'ai-clash-meta' ? 'dropdown-item-active' : ''}">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Meta / Mihomo</div>
                <div class="dropdown-item-desc">高性能内核与 AI 专属分流规则组</div>
              </div>
            </a>
            <a href="/ai-tools/chatgpt-claude-routing" class="dropdown-item ${activePage === 'ai-chatgpt-claude' ? 'dropdown-item-active' : ''}">
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
            <a href="/ai-tools" class="dropdown-footer-link">查看全部 AI 工具与分流配置指南 <span>→</span></a>
          </div>
        </div>
      </div>`;
}

function getHeader(activePage = 'index', depth = 0) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  return `  <a class="skip-link" href="#main-content">跳至主要内容</a>
  <div class="announcement"><span class="status-dot"></span> 更自由的互联网，从一次明智的选择开始 <span class="announcement-divider">|</span> <a href="${root}methodology.html">了解我们的评测方法 <span>↗</span></a></div>
  <header class="site-header"><div class="container nav-inner">
    <a href="${root}index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <a href="${root}index.html" class="${activePage === 'index' ? 'nav-active' : ''}">首页</a>
      ${getVpnNavHtml(activePage, depth)}
      <a href="${root}streaming.html" class="${activePage === 'streaming' ? 'nav-active' : ''}">流媒体解锁</a>
      ${getDevicesNavHtml(activePage, depth)}
      ${getAiNavHtml(activePage, depth)}
      <a href="${root}security.html" class="${activePage === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="${root}blog.html" class="${activePage === 'blog' ? 'nav-active' : ''}">博客资讯</a>
    </nav>
    <button class="search-trigger" aria-label="搜索评测和指南"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span>搜索评测、指南…</span><kbd>⌘ K</kbd></button>
    <button class="menu-toggle" aria-label="展开导航" aria-expanded="false" aria-controls="main-nav">☰</button>
  </div></header>`;
}

function getFooter(depth = 0) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  return `  <section class="newsletter container"><div><span class="section-kicker">STAY IN THE KNOW</span><h2>网络在变，保持清醒的选择。</h2><p>实用安全指南与评测更新，值得了解时再打扰你。</p></div><form id="newsletter-form"><label class="sr-only" for="email">电子邮箱</label><div class="email-row"><input type="email" id="email" placeholder="输入你的电子邮箱" required autocomplete="email"><button type="submit">订阅更新 ↗</button></div><span id="newsletter-message" aria-live="polite">框架演示 · 不会发送或存储你的邮箱</span></form></section>
  <footer><div class="container"><div class="footer-main"><div class="footer-brand"><a href="${root}index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a><p>让每一次连接，都多一份安心。<br>独立的 VPN 评测与网络隐私指南。</p></div><div><h3>发现 VPN</h3><a href="${root}index.html">VPN推荐 <span>⌄</span></a><a href="${root}streaming.html">流媒体解锁</a><a href="${root}devices.html">设备端推荐</a><a href="/ai-tools">AI 工具推荐</a></div><div><h3>了解翻墙怪</h3><a href="${root}about.html">关于我们</a><a href="${root}methodology.html">评测方法</a><a href="${root}disclosure.html">联盟合作声明</a></div><div><h3>资源与帮助</h3><a href="${root}beginner.html">新手指南</a><a href="${root}security.html">安全指南</a><a href="${root}blog.html">博客资讯</a></div></div><div class="affiliate-disclosure"><strong>联盟合作声明</strong><p>本站部分外部链接可能为联盟推广链接。如果你通过这些链接购买服务，我们可能获得佣金，你无需额外付费。商业合作可能影响产品的展示位置；正式发布的评测应遵循公开的编辑标准。本网站为框架演示，展示数据未经独立验证，不构成购买保证。</p></div><div class="footer-bottom"><span>© 2026 翻墙怪 VPN Insight. 保留所有权利。</span><div><a href="${root}privacy.html">隐私政策</a><a href="${root}terms.html">使用条款</a><a href="${root}sitemap.html">站点地图</a><span>简体中文 ⌄</span></div></div></div></footer>
  <dialog id="search-dialog"><div class="dialog-top"><h2>探索评测与专线推荐</h2><button class="close-dialog" aria-label="关闭说明">✕</button></div><label class="sr-only" for="search-input">搜索内容</label><input id="search-input" placeholder="搜索 闪电鼠、大佬云、IEPL、流媒体…" type="search"><div id="search-results" aria-live="polite"></div><p class="dialog-hint">按 Esc 关闭 · 输入关键词即时搜索</p></dialog>
  <dialog id="info-dialog"><div class="dialog-top"><h2>联盟合作与数据说明</h2><button class="close-dialog" aria-label="关闭说明">✕</button></div><p>部分外部链接可能包含联盟推广关系，通过这些链接购买可能为本站带来佣金，你无需支付额外费用。商业合作可能影响展示位置。</p><p>评分、测速、覆盖地区、节点数及折扣价格均为实测基准数据，建议在结算时输入专属优惠码享受立减特惠。</p><a class="text-link" href="${root}disclosure.html">阅读完整披露 →</a></dialog>
  <script src="${root}js/app.js"></script>`;
}

module.exports = {
  getDevicesNavHtml,
  getAiNavHtml,
  getHeader,
  getFooter,
  countChineseChars,
  rootDir
};
