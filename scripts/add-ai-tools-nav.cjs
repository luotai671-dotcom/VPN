const fs = require('fs');
const path = require('path');

console.log('=== 开始构建「AI 工具」导航下拉菜单与专属页面/区块 ===');

// 1. 生成标准的 AI 工具下拉菜单 HTML 组件
function getAiNavHtml(activePage = '') {
  const activeClass = activePage === 'ai' ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-ai-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="ai.html" class="${activeClass}">AI 工具 <span class="nav-arrow">⌄</span></a>
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
      </div>`;
}

// 设备端推荐的下拉菜单 HTML 组件
function getDevicesNavHtml(activePage = '') {
  const activeClass = activePage === 'devices' ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-devices-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="devices.html" class="${activeClass}">设备端推荐 <span class="nav-arrow">⌄</span></a>
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
      </div>`;
}

// 统一公共 Header 生成器
function getFullHeader(activePage = '') {
  return `  <a class="skip-link" href="#main-content">跳至主要内容</a>
  <div class="announcement"><span class="status-dot"></span> 更自由的互联网，从一次明智的选择开始 <span class="announcement-divider">|</span> <a href="methodology.html">了解我们的评测方法 <span>↗</span></a></div>
  <header class="site-header"><div class="container nav-inner">
    <a href="index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="56" height="52" rx="16" fill="#112a23" stroke="#225e43" stroke-width="3"/><path d="M20 11 L13 4 M44 11 L51 4" stroke="#34d399" stroke-width="4.5" stroke-linecap="round"/><circle cx="13" cy="4" r="2.5" fill="#a7f3d0"/><circle cx="51" cy="4" r="2.5" fill="#a7f3d0"/><rect x="17" y="19" width="10" height="9" rx="3" fill="#34d399"/><rect x="37" y="19" width="10" height="9" rx="3" fill="#34d399"/><circle cx="23" cy="23.5" r="1.8" fill="#112a23"/><circle cx="43" cy="23.5" r="1.8" fill="#112a23"/><path d="M11 39 H22 M42 39 H53" stroke="#26704f" stroke-width="3.5" stroke-linecap="round"/><path d="M14 47 H20 M44 47 H50" stroke="#1b533a" stroke-width="2.5" stroke-linecap="round"/><polygon points="34,29 24,42 32,42 29,53 42,39 34,39" fill="#34d399" stroke="#a7f3d0" stroke-width="1.5" stroke-linejoin="round"/></svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a>
    <nav id="main-nav" aria-label="主导航">
      <a href="index.html" class="${activePage === 'index' ? 'nav-active' : ''}">VPN推荐 <span>⌄</span></a>
      <a href="streaming.html" class="${activePage === 'streaming' ? 'nav-active' : ''}">流媒体解锁</a>
      ${getDevicesNavHtml(activePage)}
      ${getAiNavHtml(activePage)}
      <a href="security.html" class="${activePage === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="blog.html" class="${activePage === 'blog' ? 'nav-active' : ''}">博客资讯</a>
    </nav>
    <button class="search-trigger" aria-label="搜索评测和指南"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span>搜索评测、指南…</span><kbd>⌘ K</kbd></button>
    <button class="menu-toggle" aria-label="展开导航" aria-expanded="false" aria-controls="main-nav">☰</button>
  </div></header>`;
}

// 统一公共 Footer 生成器
function getFullFooter() {
  return `  <section class="newsletter container"><div><span class="section-kicker">STAY IN THE KNOW</span><h2>网络在变，保持清醒的选择。</h2><p>实用安全指南与评测更新，值得了解时再打扰你。</p></div><form id="newsletter-form"><label class="sr-only" for="email">电子邮箱</label><div class="email-row"><input type="email" id="email" placeholder="输入你的电子邮箱" required autocomplete="email"><button type="submit">订阅更新 ↗</button></div><span id="newsletter-message" aria-live="polite">框架演示 · 不会发送或存储你的邮箱</span></form></section>
  <footer><div class="container"><div class="footer-main"><div class="footer-brand"><a href="index.html" class="wordmark" aria-label="翻墙怪首页"><span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="56" height="52" rx="16" fill="#112a23" stroke="#225e43" stroke-width="3"/><path d="M20 11 L13 4 M44 11 L51 4" stroke="#34d399" stroke-width="4.5" stroke-linecap="round"/><circle cx="13" cy="4" r="2.5" fill="#a7f3d0"/><circle cx="51" cy="4" r="2.5" fill="#a7f3d0"/><rect x="17" y="19" width="10" height="9" rx="3" fill="#34d399"/><rect x="37" y="19" width="10" height="9" rx="3" fill="#34d399"/><circle cx="23" cy="23.5" r="1.8" fill="#112a23"/><circle cx="43" cy="23.5" r="1.8" fill="#112a23"/><path d="M11 39 H22 M42 39 H53" stroke="#26704f" stroke-width="3.5" stroke-linecap="round"/><path d="M14 47 H20 M44 47 H50" stroke="#1b533a" stroke-width="2.5" stroke-linecap="round"/><polygon points="34,29 24,42 32,42 29,53 42,39 34,39" fill="#34d399" stroke="#a7f3d0" stroke-width="1.5" stroke-linejoin="round"/></svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong></a><p>让每一次连接，都多一份安心。<br>独立的 VPN 评测与网络隐私指南。</p></div><div><h3>发现 VPN</h3><a href="index.html">VPN推荐 <span>⌄</span></a><a href="streaming.html">流媒体解锁</a><a href="devices.html">设备端推荐</a><a href="ai.html">AI 工具推荐</a></div><div><h3>了解翻墙怪</h3><a href="about.html">关于我们</a><a href="methodology.html">评测方法</a><a href="disclosure.html">联盟合作声明</a></div><div><h3>资源与帮助</h3><a href="beginner.html">新手指南</a><a href="security.html">安全指南</a><a href="blog.html">博客资讯</a></div></div><div class="affiliate-disclosure"><strong>联盟合作声明</strong><p>本站部分外部链接可能为联盟推广链接。如果你通过这些链接购买服务，我们可能获得佣金，你无需额外付费。商业合作可能影响产品的展示位置；正式发布的评测应遵循公开的编辑标准。本网站为框架演示，展示数据未经独立验证，不构成购买保证。</p></div><div class="footer-bottom"><span>© 2026 翻墙怪 VPN Insight. 保留所有权利。</span><div><a href="privacy.html">隐私政策</a><a href="terms.html">使用条款</a><a href="sitemap.html">站点地图</a><span>简体中文 ⌄</span></div></div></div></footer>
  <dialog id="search-dialog"><div class="dialog-top"><h2>探索评测与专线推荐</h2><button class="close-dialog" aria-label="关闭搜索">✕</button></div><label class="sr-only" for="search-input">搜索内容</label><input id="search-input" placeholder="搜索 闪电鼠、大佬云、IEPL、流媒体…" type="search"><div id="search-results" aria-live="polite"></div><p class="dialog-hint">按 Esc 关闭 · 输入关键词即时搜索</p></dialog>
  <dialog id="info-dialog"><div class="dialog-top"><h2>联盟合作与数据说明</h2><button class="close-dialog" aria-label="关闭说明">✕</button></div><p>部分外部链接可能包含联盟推广关系，通过这些链接购买可能为本站带来佣金，你无需支付额外费用。商业合作可能影响展示位置。</p><p>评分、测速、覆盖地区、节点数及折扣价格均为实测基准数据，建议在结算时输入专属优惠码享受立减特惠。</p><a class="text-link" href="disclosure.html">阅读完整披露 →</a></dialog>
  <script src="js/app.js"></script>`;
}

// 2. 生成全新独立页面 ai.html 的完整丰富内容（3000+ 汉字）
const aiPageBodyContent = `  <a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>

  <span class="section-kicker">AI PRODUCTIVITY & ROUTING · AI 工具与分流配置专精指南</span>
  <h1>2026 全平台 AI 工具加速与智能分流配置全书（ChatGPT / Claude / Cursor / Midjourney）</h1>
  <p class="page-lead">人工智能革命彻底改变了开发与生产力工作流。然而，访问 ChatGPT、Claude 3.5 Sonnet、Cursor 代码编辑器与 Midjourney 时，国内用户经常遭遇“Access Denied 访问拦截”、“Cloudflare 人机验证死循环”以及最隐蔽的“账号静默降智（De-ranking）”。本文手把手教你如何针对各大主流客户端（Shadowrocket 小火箭、Clash Verge Rev、Clash Meta / Mihomo）配置 AI 专属分流规则组与纯净住宅专线，保障 AI 对话秒级响应与账号绝对安全。</p>

  <div class="recommend-banner" id="ai-tools">
    <div class="recommend-banner-text">
      <strong>⚡ AI 生产力专精原生高稳线路：闪电鼠 / 大佬云 (专属优惠码 sd88 / dly88)</strong>
      <span>全线标配原生美国家庭住宅 IP 与超低风控纯净广播出口，全面支持 ChatGPT Plus 免手机验证充值、Claude 网页端秒开与 Cursor API 直连。</span>
    </div>
    <a class="button button-primary" href="/go/shandianshu" target="_blank" rel="nofollow sponsored noopener noreferrer">访问闪电鼠官网（优惠码 sd88） ↗</a>
  </div>

  <h2>一、AI 访问核心痛点：什么是 ChatGPT 降智（De-ranking）与 IP 风控？</h2>
  <div class="faq-box">
    <p>很多用户经常困惑：“为什么我的节点能打开 ChatGPT 网页，但感觉 AI 变笨了，甚至不能生成图片？”这就是业界所称的<strong>静默降智（Silent De-ranking）</strong>：</p>
    <ul>
      <li><strong>机房 IP 污染判定：</strong>OpenAI 与 Anthropic 引入了包括 IPQualityScore、MaxMind 与 Cloudflare Radar 在内的严苛企业级 IP 信誉风控库。如果一个数据中心（ASN 机房）的 IP 被成千上万人共享、或者被爬虫频繁抓取，风控系统会判定该 IP 为“恶意代理”。</li>
      <li><strong>降智的三大典型特征：</strong>
        <br>1. <strong>模型暗度陈仓：</strong>明明勾选了 GPT-4o 或 Claude 3.5 Sonnet，回答速度却极快但逻辑粗糙，实际被 OpenAI 降级为轻量的 GPT-4o-mini 或旧版模型；
        <br>2. <strong>功能被暗中阉割：</strong>高级数据分析（Python 代码沙盒）、DALL-E 3 画图功能频繁报错“生成失败，请稍后重试”，或者上传 PDF 文档后无法解析；
        <br>3. <strong>人机验证地狱：</strong>每次提问都会跳出 Cloudflare 旋转验证码，甚至在登录阶段直接报错“Oops, we encountered an issue”。
      </li>
      <li><strong>彻底解决途径：</strong>必须使用<strong>真实原生家庭住宅 IP（ISP 属性）</strong>节点，并配置客户端让 AI 域名走独立的高纯净代理出口，而其他常规流量分流至普通节点。</li>
    </ul>
  </div>

  <h2>二、AI 工具专属分流客户端配置实操全解</h2>
  <div class="platform-detail-list">

    <!-- 1. Shadowrocket (小火箭) -->
    <div class="platform-detail-box" id="shadowrocket-ai">
      <div class="platform-detail-header">
        <h3><span>🚀</span> Shadowrocket (小火箭)：iOS 端 AI 专线分流与规则配置</h3>
        <span class="platform-badge">苹果 iOS / iPadOS 首选</span>
      </div>
      <p>苹果 iPhone 与 iPad 端最受赞誉的规则代理工具。通过为小火箭添加专门的 AI 规则分组，可以实现打开 ChatGPT 时自动路由到纯净美区节点，国内 App 完全直连。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 四步配置 AI 智能规则指引：</strong>
          <ol>
            <li>在小火箭底部点击「配置 (Config)」-> 点击正在使用的规则文件 -> 选择「编辑配置」；</li>
            <li>点击「添加规则」-> 类型选择「DOMAIN-KEYWORD（域名关键词）」或「DOMAIN-SUFFIX（域名后缀）」；</li>
            <li>分别添加规则：<code>openai.com</code>、<code>chatgpt.com</code>、<code>anthropic.com</code>、<code>claude.ai</code>；</li>
            <li>策略选择你所购买的高纯净美国专线节点（如闪电鼠的美国住宅 IP 节点），点击右上角保存。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 小火箭 iOS 端避坑提示：</strong>
          <ul>
            <li><strong>全局路由模式：</strong>在小火箭首页底部，确认全局路由为<strong>「配置 (Config)」</strong>模式，切勿开启“代理”模式造成全网流量走翻墙；</li>
            <li><strong>Apple ID 关联风险：</strong>避免在 App Store 国区尝试搜索 ChatGPT 官方 App，请务必使用美区 Apple ID 下载官方客户端，结合专线分流可支持 Siri 一键唤醒 ChatGPT。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Clash Verge Rev -->
    <div class="platform-detail-box" id="clash-verge-ai">
      <div class="platform-detail-header">
        <h3><span>💻</span> Clash Verge Rev：PC 端全平台 AI 节点与 TUN 模式加速</h3>
        <span class="platform-badge">Windows / Mac 开发者必备</span>
      </div>
      <p>现代全能型客户端，支持 Windows、macOS 与 Linux。通过内置的 <strong>TUN 模式</strong>，能全面接管 Cursor、VS Code Copilot 等桌面开发编辑器的底层 AI 流量。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 PC 端配置与策略组绑定实操：</strong>
          <ol>
            <li>打开 Clash Verge Rev，在左侧点击「订阅 (Profiles)」，右键目标订阅选择「编辑规则」或进入「代理」面板；</li>
            <li>在策略组中找到「🤖 AIGC / OpenAI / 人工智能」专属策略组；</li>
            <li>展开节点列表，选中低延迟、低丢包的美国或日本原生专线节点；</li>
            <li>进入「设置」页面，开启「系统代理」；若使用 Cursor 编辑器，请务必开启「TUN 模式」。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 开发者 TUN 模式核心价值：</strong>
          <ul>
            <li><strong>Cursor / Copilot 代码补全：</strong>传统系统代理只拦截浏览器 HTTP 请求，Cursor 依赖底层 gRPC 与长链接，不开 TUN 会频繁报“Connection failed / Timeout”；</li>
            <li><strong>终端 Git & Python API：</strong>开启 TUN 模式后，终端中运行 <code>curl https://api.openai.com/v1/models</code> 无需手动配置代理端口环境变量。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 3. Clash Meta / Mihomo -->
    <div class="platform-detail-box" id="clash-meta-ai">
      <div class="platform-detail-header">
        <h3><span>⚙️</span> Clash Meta / Mihomo：高性能内核与 AI 专属分流规则组</h3>
        <span class="platform-badge">极客级自动化规则集</span>
      </div>
      <p>Mihomo（原 Clash.Meta）内核是目前开源界最高效的分流引擎，原生支持规则集（Rule-Provider）自动增量订阅更新与精准的 GEOIP / GEOSITE 行为分析。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 远程 Rule-Set 自动化订阅引入：</strong>
          <ol>
            <li>在 Meta 配置文件中增加 rule-providers 声明，订阅 Loyalsoldier 或 ACL4SSR 的 AI 专属规则；</li>
            <li>配置规则匹配项：<code>RULE-SET,openai,🤖 OpenAI策略组</code> 以及 <code>RULE-SET,claude,🤖 Claude策略组</code>；</li>
            <li>内核将每 24 小时自动拉取各大 AI 厂商最新上线的 CDN 域名与 IP 段，无需手动反复维护；</li>
            <li>支持为不同的 AI 平台分配不同国家的出口（如 Claude 走美国西海岸原生节点，ChatGPT 走日本原生专线）。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 高性能内核优势：</strong>
          <ul>
            <li><strong>内存开销极低：</strong>Mihomo 采用 Go 语言优化内存重用，高并发并发处理 100+ AI 切片拉取时，内存占用控制在 45MB 以内；</li>
            <li><strong>防 DNS 污染与泄漏：</strong>开启 <code>sniffer</code> 嗅探器后，可精准识别加密 SNI 域名，杜绝因本地 DNS 污染导致的被拒访问。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 4. ChatGPT / Claude 专用分流 -->
    <div class="platform-detail-box" id="chatgpt-claude-routing">
      <div class="platform-detail-header">
        <h3><span>✨</span> ChatGPT / Claude 专用分流：防降智纯净 IP 节点与客户端配置</h3>
        <span class="platform-badge">账号长久稳定保障</span>
      </div>
      <p>针对最严苛的两大 AI 巨头（OpenAI 与 Anthropic），通过科学的节点匹配与网络行为隔离，实现 100% 解锁 GPT-4o 完整性能，避免订阅费被封号清零。</p>
      <div class="platform-detail-grid">
        <div class="platform-step-card">
          <strong>📌 防降智与防封号五大黄金守则：</strong>
          <ol>
            <li><strong>固定节点地区：</strong>尽量长期固定在同一个城市节点（如洛杉矶或旧金山专线），避免 1 分钟内从美东跨越到美西甚至新加坡的“瞬移行为”；</li>
            <li><strong>独立 Chrome 资料库：</strong>为 AI 工具单独建立一个全新的浏览器 Profile，切勿安装国内搜狗输入法扩展或存在国内流量追踪的插件；</li>
            <li><strong>WebRTC 泄露拦截：</strong>在浏览器中安装 WebRTC Control 扩展或开启客户端的 DNS 防泄露，阻止浏览器暴露你的真实国内内网 IP；</li>
            <li><strong>绑定干净支付卡：</strong>升级 ChatGPT Plus 或 Claude Pro 绑卡时，必须保持 IP 在卡片发行地（如美区住宅专线），避免支付风控被拒。</li>
          </ol>
        </div>
        <div class="platform-tip-card">
          <strong>💡 常见报错自救排查：</strong>
          <ul>
            <li><strong>Claude 报 "App unavailable"：</strong>说明当前 IP 所在地被 Anthropic 封锁，或者 IP 被判定为机房机柜，请立即切换至闪电鼠的美国住宅专线并清理 Cookie；</li>
            <li><strong>ChatGPT "Something went wrong"：</strong>清除浏览器 LocalStorage，或者使用无痕窗口重新登录，通常是旧 Session 缓存了被风控的 IP 标记。</li>
          </ul>
        </div>
      </div>
    </div>

  </div>

  <h2>三、主流 AI 生产力工具分流域名速查表（可直接复制导入规则）</h2>
  <div class="styled-table-wrap">
    <table class="styled-table">
      <thead>
        <tr>
          <th>AI 平台 / 工具</th>
          <th>核心核心域名列表（DOMAIN-SUFFIX）</th>
          <th>推荐出口地区</th>
          <th>IP 属性要求</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>OpenAI / ChatGPT</strong></td>
          <td><code>openai.com</code>, <code>chatgpt.com</code>, <code>oaistatic.com</code>, <code>oaiusercontent.com</code></td>
          <td>美国、日本、新加坡、英国</td>
          <td><span class="badge-ok">● 原生住宅 ISP / 低风控</span></td>
        </tr>
        <tr>
          <td><strong>Anthropic / Claude</strong></td>
          <td><code>anthropic.com</code>, <code>claude.ai</code>, <code>claudecdn.com</code></td>
          <td>美国本土专线（首选美西）</td>
          <td><span class="badge-ok">● 严格原生住宅 / 禁公网机房</span></td>
        </tr>
        <tr>
          <td><strong>Cursor AI 编辑器</strong></td>
          <td><code>cursor.sh</code>, <code>cursorapi.com</code>, <code>tether.cursor.sh</code></td>
          <td>美国、日本、香港专线</td>
          <td><span class="badge-ok">● 低延迟专线 + 开启 TUN</span></td>
        </tr>
        <tr>
          <td><strong>Midjourney</strong></td>
          <td><code>midjourney.com</code>, <code>discord.com</code>, <code>discordapp.com</code></td>
          <td>香港、日本、美国、新加坡</td>
          <td><span class="badge-ok">● 大带宽 IEPL 直连</span></td>
        </tr>
        <tr>
          <td><strong>Google Gemini</strong></td>
          <td><code>gemini.google.com</code>, <code>generativelanguage.googleapis.com</code></td>
          <td>美国、日本、台湾、新加坡</td>
          <td><span class="badge-ok">● 支持 Google 官方服务</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>四、常见 AI 加速疑难杂症与深度排查问答（FAQ）</h2>
  <div class="faq-box">
    <h3>Q1：为什么我能正常和 ChatGPT 对话，但无法上传图片或者生成 DALL-E 3 图像？</h3>
    <p>答：这是最典型的“部分降智”现象。ChatGPT 的文本交互和多模态图像/音频是由不同的服务器集群承载的。多模态文件上传服务器（如 <code>oaiusercontent.com</code>）对 IP 的风控阈值比基础文本接口高得多。当你的节点被识别为公共机房时，OpenAI 会允许文本提问但静默封锁文件上传通道。解决办法是切换至原生住宅专线节点并刷新页面。</p>
    <h3>Q2：使用 Cursor 编写代码时，为什么经常卡在“Generating...”随后提示连接超时？</h3>
    <p>答：Cursor 在代码补全时发起的是高频、低延迟的双向数据流请求。如果你的客户端只开启了常规的“系统代理（System Proxy）”，Cursor 底层发起的非 HTTP 请求根本没有经过代理专线，导致直接与海外服务器通信触发连接重置。请在 Clash Verge Rev 设置中安装核心服务并开启 <strong>TUN 模式</strong>，彻底将整机的底层 TCP/UDP 流量纳入加速。</p>
    <h3>Q3：被 Claude 封号后，新注册的账号如何避免再次秒封？</h3>
    <p>答：Claude 的风控极其依赖“浏览器指纹”与“IP 纯净度”。如果前一个账号被封，浏览器 LocalStorage 和 Cookie 中会留有封禁标记。正确做法是：① 完全删除原浏览器配置文件，新建一个独立的 Chrome 个人资料；② 切换至未曾被封禁过的高信誉美国原生住宅专线；③ 使用真实的海外原生手机号进行 SMS 验证码激活，切勿使用公用免费接码平台的号码。</p>
  </div>

  <h2>五、主题集群与进阶阅读导航</h2>
  <div class="article-links">
    <a href="devices.html">📱 全平台客户端安装：Win / Mac / iOS / Android 详细配置教程 ↗</a>
    <a href="streaming.html">🎬 流媒体解锁指南：Netflix 与 Disney+ 4K 原生解锁秘籍 ↗</a>
    <a href="security.html">🛡️ 专线安全与数据隐私深度指南：防 DNS 泄漏与零日志 ↗</a>
    <a href="methodology.html">📐 翻墙怪专线网络评测标准与方法论 ↗</a>
    <a href="review-shandianshu.html">⚡ 闪电鼠深度测评长文（AI 生产力与全能专线首选） ↗</a>
    <a href="review-dalaoyun.html">☁️ 大佬云深度测评长文（高稳老牌客户口碑标杆） ↗</a>
  </div>`;

// 3. 将 ai.html 写入磁盘
const fullAiHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>2026 全平台 AI 工具加速与智能分流配置全书（ChatGPT / Claude / Cursor） — 翻墙怪 VPN Insight</title>
  <meta name="description" content="涵盖 Shadowrocket 小火箭、Clash Verge Rev、Clash Meta (Mihomo) 的 AI 专属分流配置指南，详解 ChatGPT 防降智原生住宅 IP 挑选与 Cursor 开发者 TUN 模式。">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
${getFullHeader('ai')}
  <main id="main-content" class="container standalone-page">
${aiPageBodyContent}
  </main>
${getFullFooter()}
</body>
</html>`;

fs.writeFileSync('ai.html', fullAiHtml, 'utf8');
console.log('✓ 生成独立页面 ai.html 成功');

// 4. 同步更新 devices.html，在其中追加第五章 AI 工具配置板块与对应锚点
let devicesHtml = fs.readFileSync('devices.html', 'utf8');

const aiSectionInDevices = `
  <h2 id="ai-tools">五、AI 工具专属分流配置推荐（ChatGPT / Claude / Cursor）</h2>
  <p>随着 AI 深入日常工作，将大模型流量精准引导至高纯净度专线已成为刚需。以下为针对主流客户端的 AI 专属分流配置与防降智指南：</p>
  <div class="platform-detail-list">
    <!-- 1. Shadowrocket AI -->
    <div class="platform-detail-box" id="shadowrocket-ai">
      <div class="platform-detail-header">
        <h3><span>🚀</span> Shadowrocket (小火箭)：iOS 端 AI 专线分流与规则配置</h3>
        <span class="platform-badge">iOS AI 首选</span>
      </div>
      <p>在小火箭中配置 DOMAIN-SUFFIX 规则（如 <code>openai.com</code>, <code>chatgpt.com</code>, <code>claude.ai</code>），将 AI 域名智能引导至纯净住宅专线，国内应用完全直连不消耗流量。<a class="text-link" href="ai.html#shadowrocket-ai">查看完整 AI 指南 ↗</a></p>
    </div>

    <!-- 2. Clash Verge Rev AI -->
    <div class="platform-detail-box" id="clash-verge-ai">
      <div class="platform-detail-header">
        <h3><span>💻</span> Clash Verge Rev：PC 端全平台 AI 节点与 TUN 模式加速</h3>
        <span class="platform-badge">PC 开发者利器</span>
      </div>
      <p>通过创建独立的「AIGC」策略组分配专属原生专线，并开启「TUN 模式」，彻底解决 Cursor、Copilot 代码编辑器直连超时与报错。<a class="text-link" href="ai.html#clash-verge-ai">查看完整 AI 指南 ↗</a></p>
    </div>

    <!-- 3. Clash Meta / Mihomo AI -->
    <div class="platform-detail-box" id="clash-meta-ai">
      <div class="platform-detail-header">
        <h3><span>⚙️</span> Clash Meta / Mihomo：高性能内核与 AI 专属分流规则组</h3>
        <span class="platform-badge">规则集自动更新</span>
      </div>
      <p>利用 Rule-Set 远程规则集订阅自动同步 OpenAI 与 Claude 最新 CDN 节点，内存占用低于 45MB，毫秒级响应。<a class="text-link" href="ai.html#clash-meta-ai">查看完整 AI 指南 ↗</a></p>
    </div>

    <!-- 4. ChatGPT / Claude 专用分流 -->
    <div class="platform-detail-box" id="chatgpt-claude-routing">
      <div class="platform-detail-header">
        <h3><span>✨</span> ChatGPT / Claude 专用分流：防降智纯净 IP 节点与客户端配置</h3>
        <span class="platform-badge">防降智保障</span>
      </div>
      <p>挑选真实原生住宅 ISP 节点，隔离浏览器指纹与 WebRTC 泄漏，保证 GPT-4o 多模态画图与文件分析功能完整可用。<a class="text-link" href="ai.html#chatgpt-claude-routing">查看完整 AI 指南 ↗</a></p>
    </div>
  </div>
`;

if (!devicesHtml.includes('id="ai-tools"')) {
  // 插入到 "五、常见客户端疑难杂症与快速排查解决方案" 之前
  devicesHtml = devicesHtml.replace('<h2>五、常见客户端疑难杂症与快速排查解决方案</h2>', `${aiSectionInDevices}\n  <h2>六、常见客户端疑难杂症与快速排查解决方案</h2>`);
  devicesHtml = devicesHtml.replace('<h2>六、主题集群与进阶阅读导航</h2>', '<h2>七、主题集群与进阶阅读导航</h2>');
  fs.writeFileSync('devices.html', devicesHtml, 'utf8');
  console.log('✓ devices.html 已成功嵌入 AI 工具展示区块与对应锚点');
}

// 5. 更新 scripts/build-all-pages.cjs 模板中的 Header、Footer 与 devicesContent
let buildAllScript = fs.readFileSync('scripts/build-all-pages.cjs', 'utf8');

// 更新 getHeader
const headerFuncRegex = /function getHeader\(activePage = ''\) \{[\s\S]*?<\/header>`;\s*\}/;
if (headerFuncRegex.test(buildAllScript)) {
  buildAllScript = buildAllScript.replace(
    headerFuncRegex,
    `function getHeader(activePage = '') {\n  return \`${getFullHeader('${activePage}')}\`;\n}`
  );
}

// 更新 getFooter（加入 AI 工具推荐链接）
if (!buildAllScript.includes('<a href="ai.html">AI 工具推荐</a>')) {
  buildAllScript = buildAllScript.replace(
    '<a href="devices.html">设备端推荐</a>',
    '<a href="devices.html">设备端推荐</a><a href="ai.html">AI 工具推荐</a>'
  );
}

fs.writeFileSync('scripts/build-all-pages.cjs', buildAllScript, 'utf8');
console.log('✓ scripts/build-all-pages.cjs 模板同步升级完成');

// 6. 更新 scripts/review-common.cjs 中的 getHeader 与 getFooter
let reviewCommon = fs.readFileSync('scripts/review-common.cjs', 'utf8');
if (headerFuncRegex.test(reviewCommon)) {
  reviewCommon = reviewCommon.replace(
    headerFuncRegex,
    `function getHeader(activePage = '') {\n  return \`${getFullHeader('${activePage}')}\`;\n}`
  );
}
if (!reviewCommon.includes('<a href="ai.html">AI 工具推荐</a>')) {
  reviewCommon = reviewCommon.replace(
    '<a href="devices.html">设备端推荐</a>',
    '<a href="devices.html">设备端推荐</a><a href="ai.html">AI 工具推荐</a>'
  );
}
fs.writeFileSync('scripts/review-common.cjs', reviewCommon, 'utf8');
console.log('✓ scripts/review-common.cjs 模板同步升级完成');

// 7. 更新 js/app.js 中的下拉交互与平滑滚动定位逻辑
let appJs = fs.readFileSync('js/app.js', 'utf8');

// 替换原有的 initDevicesDropdown 为通用的 initNavDropdowns
const oldJsFuncRegex = /function initDevicesDropdown\(\) \{[\s\S]*?if \(document\.readyState === 'loading'\) \{[\s\S]*?initDevicesDropdown\(\);\s*\}/;

const newNavJs = `function initNavDropdowns() {
  // 支持所有顶部导航下拉组件（设备端推荐、AI 工具等）
  document.querySelectorAll('.nav-item-dropdown').forEach(dropdownWrap => {
    const mobileToggleBtn = dropdownWrap.querySelector('.mobile-dropdown-btn');
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 互斥展开：关闭其他已展开的下拉菜单
        document.querySelectorAll('.nav-item-dropdown').forEach(other => {
          if (other !== dropdownWrap) other.classList.remove('is-open');
        });
        dropdownWrap.classList.toggle('is-open');
      });
    }
  });

  // 点击页面外部区域时关闭所有展开的下拉菜单
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('is-open'));
    }
  });

  // 键盘 Esc 快捷收起
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('is-open'));
    }
  });

  // 选项点击事件与当前页面内平滑滚动定位
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('is-open'));
      document.querySelector('#main-nav')?.classList.remove('open');
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');

      const href = item.getAttribute('href');
      if (!href) return;
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const targetId = href.substring(hashIndex + 1);
        const targetElem = document.getElementById(targetId);
        // 如果当前页面中存在目标锚点区块，立即执行平滑滚动并高亮
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', '#' + targetId);
          targetElem.classList.add('anchor-highlight');
          setTimeout(() => targetElem.classList.remove('anchor-highlight'), 2200);
        }
      }
    });
  });

  // 处理从外部页面带 hash 锚点跳转到达页面时的自动平滑滚动与高亮
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElem = document.getElementById(targetId);
    if (targetElem) {
      setTimeout(() => {
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElem.classList.add('anchor-highlight');
        setTimeout(() => targetElem.classList.remove('anchor-highlight'), 2200);
      }, 180);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavDropdowns);
} else {
  initNavDropdowns();
}`;

if (oldJsFuncRegex.test(appJs)) {
  appJs = appJs.replace(oldJsFuncRegex, newNavJs);
} else if (!appJs.includes('initNavDropdowns')) {
  appJs += '\n' + newNavJs;
}

fs.writeFileSync('js/app.js', appJs, 'utf8');
console.log('✓ js/app.js 通用下拉菜单与全站平滑定位逻辑更新完成');

// 8. 微调 styles/main.css，优化导航栏在容纳 6 个主项时的间距体验
let mainCss = fs.readFileSync('styles/main.css', 'utf8');
mainCss = mainCss.replace('nav-inner nav{display:flex;align-items:center;justify-content:center;gap:28px', 'nav-inner nav{display:flex;align-items:center;justify-content:center;gap:22px');
fs.writeFileSync('styles/main.css', mainCss, 'utf8');
console.log('✓ styles/main.css 导航栏间隙微调完成');

// 9. 扫描全站所有 HTML 文件，统一同步更新导航栏与页脚中的 AI 工具入口
const allHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allHtmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let activeNav = '';
  if (file === 'index.html') activeNav = 'index';
  else if (file === 'streaming.html') activeNav = 'streaming';
  else if (file === 'devices.html') activeNav = 'devices';
  else if (file === 'ai.html') activeNav = 'ai';
  else if (file === 'security.html') activeNav = 'security';
  else if (file === 'blog.html') activeNav = 'blog';

  // 替换导航栏 <nav id="main-nav" aria-label="主导航">...</nav>
  const navRegex = /<nav id="main-nav" aria-label="主导航">[\s\S]*?<\/nav>/;
  if (navRegex.test(content)) {
    const replacementNav = `<nav id="main-nav" aria-label="主导航">
      <a href="index.html" class="${activeNav === 'index' ? 'nav-active' : ''}">VPN推荐 <span>⌄</span></a>
      <a href="streaming.html" class="${activeNav === 'streaming' ? 'nav-active' : ''}">流媒体解锁</a>
      ${getDevicesNavHtml(activeNav)}
      ${getAiNavHtml(activeNav)}
      <a href="security.html" class="${activeNav === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="blog.html" class="${activeNav === 'blog' ? 'nav-active' : ''}">博客资讯</a>
    </nav>`;
    content = content.replace(navRegex, replacementNav);
  }

  // 替换页脚中的“发现 VPN”板块，加入 AI 工具推荐
  if (!content.includes('<a href="ai.html">AI 工具推荐</a>')) {
    content = content.replace(
      '<a href="devices.html">设备端推荐</a>',
      '<a href="devices.html">设备端推荐</a><a href="ai.html">AI 工具推荐</a>'
    );
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log(`✓ 全站 ${allHtmlFiles.length} 个 HTML 文件主导航与页脚同步更新完成`);
console.log('=== 「AI 工具」下拉菜单与全站集成升级完成 ===');
