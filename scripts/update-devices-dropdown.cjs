const fs = require('fs');
const path = require('path');

console.log('=== 开始实施“设备端推荐”下拉菜单与全站导航升级 ===');

// 1. 更新 styles/main.css 追加下拉菜单、移动端折叠与锚点高亮样式
let css = fs.readFileSync('styles/main.css', 'utf8');

const dropdownCssMarker = '/* 顶部导航栏“设备端推荐”下拉子菜单（Dropdown Menu） */';
if (!css.includes(dropdownCssMarker)) {
  const newCss = `
${dropdownCssMarker}
.nav-item-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.nav-item-dropdown-row {
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.nav-item-dropdown > a,
.nav-item-dropdown-row > a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.nav-arrow {
  display: inline-block;
  font-size: 11px;
  line-height: 1;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  color: #7b8e78;
}

.nav-item-dropdown:hover .nav-arrow,
.nav-item-dropdown.is-open .nav-arrow {
  transform: rotate(180deg);
  color: #26704f;
}

.mobile-dropdown-btn {
  display: none;
}

.dropdown-panel {
  position: absolute;
  top: calc(100% - 14px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  box-shadow: 0 12px 32px -4px rgba(23, 50, 58, 0.12), 0 4px 12px -2px rgba(23, 50, 58, 0.06);
  padding: 10px;
  width: 380px;
  min-width: 360px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s;
}

/* 填补悬停间隙，防止鼠标移向下拉框时中断 hover */
.dropdown-panel::before {
  content: '';
  position: absolute;
  top: -18px;
  left: 0;
  right: 0;
  height: 18px;
}

.nav-item-dropdown:hover .dropdown-panel,
.nav-item-dropdown:focus-within .dropdown-panel,
.nav-item-dropdown.is-open .dropdown-panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.dropdown-grid {
  display: grid;
  gap: 4px;
}

.nav-inner nav .dropdown-panel a.dropdown-item {
  display: flex !important;
  align-items: center;
  gap: 12px;
  padding: 9px 12px !important;
  border-radius: 7px;
  text-decoration: none;
  color: #17323a;
  background: transparent;
  transition: background 0.15s ease, transform 0.15s ease;
  position: static;
  white-space: normal;
}

.nav-inner nav .dropdown-panel a.dropdown-item:after {
  display: none !important;
}

.nav-inner nav .dropdown-panel a.dropdown-item:hover {
  background: #f4f8f4;
  color: #26704f;
  transform: translateX(2px);
}

.dropdown-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  background: #f0f6f2;
  color: #26704f;
  flex-shrink: 0;
  transition: background 0.15s ease, color 0.15s ease;
}

.dropdown-item:hover .dropdown-icon {
  background: #26704f;
  color: #ffffff;
}

.dropdown-item-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  text-align: left;
}

.dropdown-item-title {
  font-size: 13px;
  font-weight: 600;
  color: #1a3627;
  line-height: 1.4;
}

.dropdown-item:hover .dropdown-item-title {
  color: #26704f;
}

.dropdown-item-desc {
  font-size: 11px;
  color: #718471;
  line-height: 1.4;
}

.dropdown-footer {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f3ed;
  text-align: center;
}

.nav-inner nav .dropdown-panel a.dropdown-footer-link {
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #26704f;
  padding: 6px 12px !important;
  border-radius: 5px;
  transition: background 0.15s, color 0.15s;
}

.nav-inner nav .dropdown-panel a.dropdown-footer-link:after {
  display: none !important;
}

.nav-inner nav .dropdown-panel a.dropdown-footer-link:hover {
  background: #edf5f0;
  color: #1a5338;
}

/* 锚点定位与平滑聚焦高亮 */
.anchor-highlight {
  outline: 2px solid #26704f !important;
  outline-offset: 4px;
  box-shadow: 0 0 20px rgba(38, 112, 79, 0.25) !important;
  transition: all 0.3s ease;
}

.platform-detail-list {
  display: grid;
  gap: 22px;
  margin: 25px 0;
}

.platform-detail-box {
  background: #fff;
  border: 1px solid #dce5d4;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.02);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.platform-detail-box:hover {
  border-color: #9cb89c;
}

.platform-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #edf2e8;
  padding-bottom: 14px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.platform-detail-header h3 {
  font-size: 18px;
  color: #17323a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.platform-badge {
  font-size: 11px;
  background: #edf5f0;
  color: #26704f;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
}

.platform-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin: 15px 0;
}

.platform-step-card, .platform-tip-card {
  background: #fbfdf9;
  border: 1px solid #edf2e8;
  border-radius: 6px;
  padding: 16px;
  font-size: 12px;
  line-height: 1.8;
  color: #4c5f47;
}

.platform-step-card strong, .platform-tip-card strong {
  color: #1d462f;
  display: block;
  margin-bottom: 6px;
}

.platform-step-card ol {
  margin: 0;
  padding-left: 18px;
}

.platform-step-card li {
  margin-bottom: 6px;
}

.platform-step-card li:last-child {
  margin-bottom: 0;
}

/* 移动端汉堡抽屉适配 */
@media(max-width: 700px) {
  .platform-detail-grid {
    grid-template-columns: 1fr;
  }
  .nav-item-dropdown {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: auto;
    width: 100%;
    position: static;
  }
  .nav-item-dropdown-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .nav-item-dropdown > a,
  .nav-item-dropdown-row > a {
    padding: 14px 12px !important;
    flex: 1;
  }
  .mobile-dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    font-size: 14px;
    color: #617259;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .nav-item-dropdown.is-open .mobile-dropdown-btn {
    transform: rotate(180deg);
    color: #26704f;
  }
  .dropdown-panel {
    position: static;
    transform: none !important;
    box-shadow: none;
    border: 1px solid #E5E7EB;
    background: #fbfdf9;
    border-radius: 8px;
    margin: 0 10px 12px;
    padding: 8px;
    width: auto;
    min-width: unset;
    display: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
  .dropdown-panel::before {
    display: none;
  }
  .nav-item-dropdown.is-open .dropdown-panel {
    display: block;
  }
  .nav-inner nav .dropdown-panel a.dropdown-item {
    padding: 8px 10px !important;
    gap: 10px;
  }
  .dropdown-icon {
    width: 28px;
    height: 28px;
  }
  .dropdown-item-title {
    font-size: 12px;
  }
  .dropdown-item-desc {
    font-size: 10px;
  }
}
`;
  css += newCss;
  fs.writeFileSync('styles/main.css', css, 'utf8');
  console.log('✓ styles/main.css 追加下拉菜单与移动端样式完成');
}

// 2. 生成标准的 Nav 下拉组件 HTML
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
      <a href="security.html" class="${activePage === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="blog.html" class="${activePage === 'blog' ? 'nav-active' : ''}">博客资讯</a>
    </nav>
    <button class="search-trigger" aria-label="搜索评测和指南"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span>搜索评测、指南…</span><kbd>⌘ K</kbd></button>
    <button class="menu-toggle" aria-label="展开导航" aria-expanded="false" aria-controls="main-nav">☰</button>
  </div></header>`;
}

// 3. 构建富文本 devices.html（包含 6 个专属 id 区块：#windows, #macos, #ios, #android, #tv, #router）
const devicesFullContent = `  <a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>

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
  </div>`;

// 4. 更新 scripts/build-all-pages.cjs 中的 getHeader 与 devicesContent
let buildAllScript = fs.readFileSync('scripts/build-all-pages.cjs', 'utf8');

// 替换 getHeader
buildAllScript = buildAllScript.replace(
  /function getHeader\(activePage = ''\) \{[\s\S]*?<\/header>`;\s*\}/,
  `function getHeader(activePage = '') {\n  return \`${getFullHeader('${activePage}')}\`;\n}`
);

// 替换 devicesContent
const devContentRegex = /const devicesContent = `[\s\S]*?`;\s*generateHtmlPage\(\{[\s\S]*?activeNav: 'devices'/;
if (devContentRegex.test(buildAllScript)) {
  buildAllScript = buildAllScript.replace(
    devContentRegex,
    `const devicesContent = \`\n${devicesFullContent}\n\`;\n\ngenerateHtmlPage({\n  filename: 'devices.html',\n  title: '全平台客户端安装与配置推荐指南 — 翻墙怪 VPN Insight',\n  description: '涵盖 Windows、macOS、iOS 小火箭、Android 安卓、Apple TV 电视盒子及软路由客户端详细配置，详解 TUN 模式与国内外智能分流规则集。',\n  activeNav: 'devices'`
  );
}

// 写入 scripts/build-all-pages.cjs
fs.writeFileSync('scripts/build-all-pages.cjs', buildAllScript, 'utf8');
console.log('✓ scripts/build-all-pages.cjs 模板与 devicesContent 升级完成');

// 5. 更新 scripts/review-common.cjs 中的 getHeader
let reviewCommon = fs.readFileSync('scripts/review-common.cjs', 'utf8');
reviewCommon = reviewCommon.replace(
  /function getHeader\(activePage = ''\) \{[\s\S]*?<\/header>`;\s*\}/,
  `function getHeader(activePage = '') {\n  return \`${getFullHeader('${activePage}')}\`;\n}`
);
fs.writeFileSync('scripts/review-common.cjs', reviewCommon, 'utf8');
console.log('✓ scripts/review-common.cjs getHeader 升级完成');

// 6. 更新 js/app.js 支持下拉菜单交互、移动端折叠与带锚点平滑滚动
let appJs = fs.readFileSync('js/app.js', 'utf8');
const jsMarker = '/* 设备端推荐下拉菜单交互与锚点平滑滚动 */';

if (!appJs.includes(jsMarker)) {
  const newJsLogic = `
${jsMarker}
function initDevicesDropdown() {
  const dropdownWrap = document.querySelector('#nav-devices-dropdown');
  const mobileToggleBtn = document.querySelector('.mobile-dropdown-btn');

  if (mobileToggleBtn && dropdownWrap) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownWrap.classList.toggle('is-open');
    });
  }

  // 点击页面外部区域时关闭下拉菜单
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#nav-devices-dropdown')) {
      dropdownWrap?.classList.remove('is-open');
    }
  });

  // 键盘 Esc 快捷收起
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownWrap?.classList.remove('is-open');
    }
  });

  // 选项点击事件与当前页面内平滑滚动
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      dropdownWrap?.classList.remove('is-open');
      document.querySelector('#main-nav')?.classList.remove('open');
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');

      const href = item.getAttribute('href');
      if (!href) return;
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const targetId = href.substring(hashIndex + 1);
        const isDevicesPage = window.location.pathname.endsWith('devices.html') || 
                              window.location.pathname.endsWith('/devices') ||
                              document.querySelector('#devices-guide-section') ||
                              document.title.includes('全平台客户端') ||
                              document.title.includes('全平台专线客户端');
        if (isDevicesPage) {
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', '#' + targetId);
            targetElem.classList.add('anchor-highlight');
            setTimeout(() => targetElem.classList.remove('anchor-highlight'), 2200);
          }
        }
      }
    });
  });

  // 处理从外部页面带 hash 锚点跳转到达 devices.html 时的平滑滚动与高亮
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
  document.addEventListener('DOMContentLoaded', initDevicesDropdown);
} else {
  initDevicesDropdown();
}
`;
  appJs += newJsLogic;
  fs.writeFileSync('js/app.js', appJs, 'utf8');
  console.log('✓ js/app.js 下拉与平滑滚动逻辑注入完成');
}

// 7. 扫描并更新全站所有 HTML 文件的主导航栏
const allHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allHtmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let activeNav = '';
  if (file === 'index.html') activeNav = 'index';
  else if (file === 'streaming.html') activeNav = 'streaming';
  else if (file === 'devices.html') activeNav = 'devices';
  else if (file === 'security.html') activeNav = 'security';
  else if (file === 'blog.html') activeNav = 'blog';

  // 替换 <nav id="main-nav" aria-label="主导航">...</nav>
  const navRegex = /<nav id="main-nav" aria-label="主导航">[\s\S]*?<\/nav>/;
  if (navRegex.test(content)) {
    const replacementNav = `<nav id="main-nav" aria-label="主导航">
      <a href="index.html" class="${activeNav === 'index' ? 'nav-active' : ''}">VPN推荐 <span>⌄</span></a>
      <a href="streaming.html" class="${activeNav === 'streaming' ? 'nav-active' : ''}">流媒体解锁</a>
      ${getDevicesNavHtml(activeNav)}
      <a href="security.html" class="${activeNav === 'security' ? 'nav-active' : ''}">安全指南</a>
      <a href="blog.html" class="${activeNav === 'blog' ? 'nav-active' : ''}">博客资讯</a>
    </nav>`;
    content = content.replace(navRegex, replacementNav);
  }

  // 如果是 devices.html，同时将主要内容区域替换为完整 6 平台详细教程
  if (file === 'devices.html') {
    const mainRegex = /<main id="main-content" class="container standalone-page">[\s\S]*?<\/main>/;
    if (mainRegex.test(content)) {
      content = content.replace(mainRegex, `<main id="main-content" class="container standalone-page">\n${devicesFullContent}\n  </main>`);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log(`✓ 全站 ${allHtmlFiles.length} 个 HTML 页面导航栏与 devices.html 详细内容统一同步完成`);
console.log('=== 下拉菜单升级全部完成 ===');
