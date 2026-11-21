const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { getHeader, getFooter, countChineseChars, rootDir } = require('./ai-common.cjs');

console.log('=== 开始构建 5 个 AI 独立专题页面与路由 ===');

// 确保 ai-tools 目录以及各个子目录存在
const dirs = [
  path.join(rootDir, 'ai-tools'),
  path.join(rootDir, 'ai-tools/shadowrocket'),
  path.join(rootDir, 'ai-tools/clash-verge'),
  path.join(rootDir, 'ai-tools/clash-meta'),
  path.join(rootDir, 'ai-tools/chatgpt-claude-routing')
];
dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// 辅助函数：根据 depth 生成 CSS、JS、Logo、Favicon 的路径
function renderFullHtml({ title, description, activePage, depth, breadcrumbHtml, bodyContent }) {
  const root = depth === 0 ? '' : depth === 1 ? '../' : '../../';
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${root}styles/main.css">
</head>
<body>
${getHeader(activePage, depth)}
  <main id="main-content" class="container standalone-page">
${breadcrumbHtml}
${bodyContent}
  </main>
${getFooter(depth)}
</body>
</html>
`;
}

// -------------------------------------------------------------
// 1. 聚合总览页：/ai-tools (ai-tools/index.html & ai.html)
// -------------------------------------------------------------
const aiToolsTitle = 'AI 工具与代理客户端选型总览 - ChatGPT / Claude / Cursor 规则分流与专线加速指南 | 翻墙怪';
const aiToolsDesc = '2026 最新 AI 专属分流与代理客户端配置总览。深度对比 Shadowrocket、Clash Verge Rev、Clash Meta/Mihomo 在 iOS、Windows、macOS 平台下的 TUN 模式与规则分流表现，提供 ChatGPT-4o 防降智与 Claude 防封号全流程指南。';

const aiToolsBreadcrumb = `    <div class="breadcrumb-bar" style="margin-bottom:24px;font-size:13px;color:#7b8e78;">
      <a href="index.html" style="color:#26704f;text-decoration:none;">首页</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <span style="color:#112f39;font-weight:600;">AI 工具与分流配置专精</span>
    </div>`;

const aiToolsContent = `    <header class="section-header" style="text-align:left;margin-bottom:32px;">
      <span class="section-kicker">AI TOOLS & ROUTING ARCHITECTURE</span>
      <h1 style="font-size:32px;line-height:1.25;margin:10px 0 16px;color:#112f39;">AI 工具与代理客户端配置总览：ChatGPT、Claude 与开发者专线加速</h1>
      <p style="font-size:16px;color:#475569;line-height:1.7;max-width:880px;">全面解决跨国大模型访问风控、国内流量误代理、Cursor 与终端开发接口超时等核心痛点。依托科学的智能规则分流架构与高纯净原生住宅专线，实现 100% 满血性能释放。</p>
    </header>

    <!-- 痛点与核心机制科普 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>一、 核心背景：为什么 AI 工具对网络的要求远超流媒体与日常网页？</h2>
      <p>随着以 OpenAI（ChatGPT-4o / o1）、Anthropic（Claude 3.5 Sonnet）、Google Gemini 以及 AI 辅助编程工具（Cursor、Windsurf、GitHub Copilot）为代表的人工智能产品普及，跨国网络代理面临着前所未有的严苛挑战。许多用户经常遇到<strong>“网页可以打开 Google，但 ChatGPT 频繁报错 Something went wrong”、“开通了 Plus 账号却被系统降智为 3.5”、“Claude 注册瞬间被封号”</strong>等问题。</p>
      
      <div class="info-columns" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:24px 0;">
        <div class="info-card" style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <div style="font-size:24px;margin-bottom:8px;">🏢</div>
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">机房 IDC 广播 IP 连坐风控</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">传统低价机场多采用阿里云、腾讯云、AWS 或搬瓦工等机房公网 IP。这些 IP 在各大风控库（如 MaxMind、IPinfo）中被直接标记为机房流量，同网段内只要有爬虫被拦截，整段 IP 就会被 OpenAI 连坐拉黑。</p>
        </div>
        <div class="info-card" style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <div style="font-size:24px;margin-bottom:8px;">📉</div>
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">GPT-4o 静默降智（De-ranking）</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">OpenAI 针对可疑网络环境开发了静默降权机制：虽然界面显示 GPT-4o，但后端悄悄降级为轻量模型，关闭 Canvas 深度画布协同，DALL-E 3 画图功能直接被拒，导致付费权益严重缩水。</p>
        </div>
        <div class="info-card" style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <div style="font-size:24px;margin-bottom:8px;">💻</div>
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">开发者底层长链接与 gRPC 阻断</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">Cursor 编辑器、Python API 脚本和 Git 命令行不走常规的浏览器 HTTP 系统代理环境变量。如果代理客户端缺乏真正的 TUN 虚拟网卡接管能力，就会频繁出现请求连接超时与证书握手重置。</p>
        </div>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">💡 为什么「分流」是 AI 时代的核心必修课？</div>
        <p>很多用户遇到问题就习惯性打开“全局代理（Global Proxy）”，这不仅会拖慢国内微信、淘宝、网银的访问速度，导致国内 App 频繁弹出异地登录安全警报，更会浪费宝贵的优质专线流量。通过科学的分流规则，我们能实现<strong>「国内直连极速秒开 + 常规外网走大带宽中转 + AI 流量定向调度到纯净原生住宅 IP」</strong>的完美架构。</p>
      </div>
    </section>

    <!-- AI 工具与代理客户端选型矩阵 -->
    <section class="content-block" style="margin-bottom:40px;">
      <h2>二、 主流 AI 代理客户端选型对比矩阵</h2>
      <p>不同的操作系统与使用场景下，各代理客户端对 AI 专线分流、TUN 虚拟网卡以及 DNS 防泄漏的支持度差异巨大。以下是我们基于 2026 年最新版本实测得出的综合选型矩阵：</p>
      
      <div style="overflow-x:auto;margin:20px 0;">
        <table class="streaming-table" style="width:100%;border-collapse:collapse;background:#fff;font-size:14px;">
          <thead>
            <tr style="background:#f4f7f4;border-bottom:2px solid #dfe7dc;text-align:left;">
              <th style="padding:12px 16px;color:#112f39;">客户端名称</th>
              <th style="padding:12px 16px;color:#112f39;">主要支持平台</th>
              <th style="padding:12px 16px;color:#112f39;">TUN 虚拟网卡支持</th>
              <th style="padding:12px 16px;color:#112f39;">AI 规则分流粒度</th>
              <th style="padding:12px 16px;color:#112f39;">配置上手难度</th>
              <th style="padding:12px 16px;color:#112f39;">推荐适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;color:#26704f;">Shadowrocket (小火箭)</td>
              <td style="padding:14px 16px;">iOS / iPadOS</td>
              <td style="padding:14px 16px;">原生系统级 VPN 虚拟网卡</td>
              <td style="padding:14px 16px;">极高（支持 DOMAIN-SUFFIX）</td>
              <td style="padding:14px 16px;color:#26704f;">★☆☆ 简单直观</td>
              <td style="padding:14px 16px;">iPhone/iPad 移动端首选，完美适配 ChatGPT App</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;background:#fafbfa;">
              <td style="padding:14px 16px;font-weight:600;color:#26704f;">Clash Verge Rev</td>
              <td style="padding:14px 16px;">Windows / macOS / Linux</td>
              <td style="padding:14px 16px;">完整内置（需安装 Service Mode）</td>
              <td style="padding:14px 16px;">极高（脚本 Merge 自动注入）</td>
              <td style="padding:14px 16px;color:#26704f;">★★☆ 中等开箱即用</td>
              <td style="padding:14px 16px;">PC 桌面日常与 Cursor 编程开发者必备</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;color:#26704f;">Clash Meta / Mihomo</td>
              <td style="padding:14px 16px;">全平台 / 软路由 OpenWrt</td>
              <td style="padding:14px 16px;">底层高性能 TUN 栈驱动</td>
              <td style="padding:14px 16px;">极致（GEOSITE:openai / 域名嗅探）</td>
              <td style="padding:14px 16px;color:#b45309;">★★★☆ 极客高阶</td>
              <td style="padding:14px 16px;">工作室软路由全局透明分流、极客自动化规则集</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;background:#fafbfa;">
              <td style="padding:14px 16px;font-weight:600;color:#112f39;">Sing-box</td>
              <td style="padding:14px 16px;">全平台跨终端</td>
              <td style="padding:14px 16px;">原生高性能 TUN 模式</td>
              <td style="padding:14px 16px;">极致（Rule-Set 二进制规则集）</td>
              <td style="padding:14px 16px;color:#b45309;">★★★★ 复杂抽象</td>
              <td style="padding:14px 16px;">高并发开发测试、对内存占用有极致要求的场景</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;color:#112f39;">Surge</td>
              <td style="padding:14px 16px;">macOS / iOS</td>
              <td style="padding:14px 16px;">顶级 Enhanced Mode 增强模式</td>
              <td style="padding:14px 16px;">极致（专业网络抓包与重定向）</td>
              <td style="padding:14px 16px;color:#b45309;">★★★☆ 商业付费高昂</td>
              <td style="padding:14px 16px;">苹果生态资深用户、高预算开发者与网络工程师</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 四大核心专题入口卡片 -->
    <section class="content-block" style="margin-bottom:44px;">
      <h2>三、 四大专题实战配置指南</h2>
      <p>点击进入各个细分专题，查看包含完整代码片段、一键复制规则与高发报错排障的独立深度教程：</p>

      <div class="platform-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-top:20px;">
        
        <!-- 卡片 1: Shadowrocket -->
        <div class="platform-card" style="border:1px solid #dfe7dc;border-radius:10px;padding:24px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <span style="font-size:28px;">📱</span>
              <span style="background:#eaf5ec;color:#26704f;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:600;">iOS 苹果端首选</span>
            </div>
            <h3 style="font-size:18px;margin-bottom:10px;color:#112f39;">Shadowrocket (小火箭)</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.6;margin-bottom:16px;">涵盖美区 Apple ID 获取避坑、DOMAIN-SUFFIX 规则代码一键追加、Fake-IP 防 DNS 泄漏与 ChatGPT 语音模式排障。</p>
            <ul style="font-size:12px;color:#475569;margin-bottom:20px;padding-left:18px;line-height:1.8;">
              <li>美区 Apple ID 免信用卡注册要点</li>
              <li>一键导入 DOMAIN-SUFFIX 规则代码块</li>
              <li>开启 Fake-IP 与关闭 IPv6 防风控</li>
            </ul>
          </div>
          <a href="/ai-tools/shadowrocket" class="btn" style="text-align:center;padding:10px 16px;background:#26704f;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">进入小火箭配置教程 →</a>
        </div>

        <!-- 卡片 2: Clash Verge Rev -->
        <div class="platform-card" style="border:1px solid #dfe7dc;border-radius:10px;padding:24px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <span style="font-size:28px;">💻</span>
              <span style="background:#eaf5ec;color:#26704f;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:600;">PC 开发者神器</span>
            </div>
            <h3 style="font-size:18px;margin-bottom:10px;color:#112f39;">Clash Verge Rev</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.6;margin-bottom:16px;">解决 Cursor、Claude Desktop、VS Code Copilot 与 Git 终端命令行无法走代理的终极方案，支持 Merge 覆写脚本无损更新。</p>
            <ul style="font-size:12px;color:#475569;margin-bottom:20px;padding-left:18px;line-height:1.8;">
              <li>Service Mode 安装与 TUN 模式深度调优</li>
              <li>自定义 Merge 脚本无损注入 AI 策略组</li>
              <li>端口 7890 冲突与局域网微信断网排障</li>
            </ul>
          </div>
          <a href="/ai-tools/clash-verge" class="btn" style="text-align:center;padding:10px 16px;background:#26704f;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">进入 Clash Verge 教程 →</a>
        </div>

        <!-- 卡片 3: Clash Meta / Mihomo -->
        <div class="platform-card" style="border:1px solid #dfe7dc;border-radius:10px;padding:24px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <span style="font-size:28px;">⚙️</span>
              <span style="background:#eaf5ec;color:#26704f;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:600;">高性能内核</span>
            </div>
            <h3 style="font-size:18px;margin-bottom:10px;color:#112f39;">Clash Meta / Mihomo</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.6;margin-bottom:16px;">解析 GEOSITE:openai 与 GEOSITE:anthropic 内置规则优势，提供生产级完整 YAML 配置模板与软路由 OpenWrt 部署指南。</p>
            <ul style="font-size:12px;color:#475569;margin-bottom:20px;padding-left:18px;line-height:1.8;">
              <li>内置 GEOSITE 云端规则自动化更新</li>
              <li>生产级完整 YAML 配置文件直接复制</li>
              <li>OpenWrt / PassWall 软路由防回环优化</li>
            </ul>
          </div>
          <a href="/ai-tools/clash-meta" class="btn" style="text-align:center;padding:10px 16px;background:#26704f;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">进入 Mihomo 配置教程 →</a>
        </div>

        <!-- 卡片 4: ChatGPT / Claude 专用分流 -->
        <div class="platform-card" style="border:1px solid #dfe7dc;border-radius:10px;padding:24px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <span style="font-size:28px;">🛡️</span>
              <span style="background:#eaf5ec;color:#26704f;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:600;">防降智防封号</span>
            </div>
            <h3 style="font-size:18px;margin-bottom:10px;color:#112f39;">ChatGPT / Claude 专用分流</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.6;margin-bottom:16px;">深入剖析机房 IDC IP 与原生住宅 ISP IP 的风控本质，提供防降智四大黄金守则，以及 1020 报错与手机号验证自救方案。</p>
            <ul style="font-size:12px;color:#475569;margin-bottom:20px;padding-left:18px;line-height:1.8;">
              <li>IDC 机房 IP 与原生住宅 ISP 深度鉴别</li>
              <li>防降智四大黄金法则（环境/Profile/DNS）</li>
              <li>Access Denied 1020 与手机号验证自救</li>
            </ul>
          </div>
          <a href="/ai-tools/chatgpt-claude-routing" class="btn" style="text-align:center;padding:10px 16px;background:#26704f;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">进入防降智专项指南 →</a>
        </div>

      </div>
    </section>

    <!-- AI 专线与机场选购避坑 4 原则 -->
    <section class="content-block" style="margin-bottom:40px;">
      <h2>四、 2026 AI 专线选购避坑 4 大铁律</h2>
      <p>市面上许多低价机场虽然标榜“支持流媒体和 ChatGPT”，但实际使用时断断续续、频繁报错。在选购专线服务时，请务必核验以下 4 项核心技术指标：</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;margin:20px 0;">
        <div style="padding:16px 20px;background:#fff;border-left:4px solid #26704f;border-radius:6px;border-top:1px solid #dfe7dc;border-right:1px solid #dfe7dc;border-bottom:1px solid #dfe7dc;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">1. 认准真实住宅原生 IP（ISP 属性）</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">向客服确认或在测速面板确认节点出口是否为 AT&T、Verizon、Comcast 等美国主流运营商的家用宽带或双 ISP 属性，彻底告别批量数据中心 IP。</p>
        </div>
        <div style="padding:16px 20px;background:#fff;border-left:4px solid #26704f;border-radius:6px;border-top:1px solid #dfe7dc;border-right:1px solid #dfe7dc;border-bottom:1px solid #dfe7dc;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">2. 必须具备完整 UDP 转发能力</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">ChatGPT 手机端的 Advanced Voice（高级实时语音交互）基于 WebRTC 协议传输，依赖 UDP 握手。如果节点阻断 UDP，语音交互将直接陷入网络连接中断。</p>
        </div>
        <div style="padding:16px 20px;background:#fff;border-left:4px solid #26704f;border-radius:6px;border-top:1px solid #dfe7dc;border-right:1px solid #dfe7dc;border-bottom:1px solid #dfe7dc;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">3. 优先选择 VLESS / Trojan 现代协议</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">老旧的 Shadowsocks (SS) 协议在大并发长链接下极易被运营商 QoS 限速降速；现代 VLESS 配合 TLS 能完全伪装为正常跨国企业商业通信流量，稳定抗封锁。</p>
        </div>
        <div style="padding:16px 20px;background:#fff;border-left:4px solid #26704f;border-radius:6px;border-top:1px solid #dfe7dc;border-right:1px solid #dfe7dc;border-bottom:1px solid #dfe7dc;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">4. 节点具备独立双向 DNS 智能解析</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">OpenAI 与 Claude 的边缘 CDN 会根据客户端 DNS 查询的地理位置返回就近数据中心。节点端必须搭载纯净境外 DoH 上游，杜绝因本地 DNS 污染导致的被拒访问。</p>
        </div>
      </div>
    </section>

    <!-- 底部 FAQ -->
    <section class="content-block" style="margin-bottom:30px;">
      <h2>五、 AI 工具与代理分流高频问答（FAQ）</h2>
      <div class="faq-list" style="margin-top:16px;">
        <details class="faq-item" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
          <summary style="font-weight:600;color:#112f39;cursor:pointer;">问：为什么我开了代理后，ChatGPT 总是提示 Access Denied 1020？</summary>
          <div style="margin-top:10px;font-size:13px;color:#475569;line-height:1.7;">
            答：Error 1020 是 Cloudflare 的顶级安全防御拦截。通常是因为当前使用的节点 IP 被列入了黑名单（比如同一个机房 IP 短时间内有几百个账号并发访问或被用于爬虫脚本）。解决方法：切换至具有美国/新加坡原生住宅 IP 标签的高稳专线（如闪电鼠或大佬云的专用解锁节点），并在浏览器无痕模式下访问。
          </div>
        </details>
        <details class="faq-item" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
          <summary style="font-weight:600;color:#112f39;cursor:pointer;">问：在电脑上开发使用 Cursor 或 VS Code，为什么开了系统代理依然连不上？</summary>
          <div style="margin-top:10px;font-size:13px;color:#475569;line-height:1.7;">
            答：因为 Windows 和 macOS 的“系统代理”只拦截遵循操作系统的普通浏览器 HTTP 请求；Cursor 和 VS Code 后台底层调用的是 gRPC 和裸 Socket 协议，完全不读取系统代理注册表。解决方法是在 Clash Verge Rev 中安装 Service Mode 并开启「TUN 模式」，由虚拟网卡在网络层进行全流量接管。
          </div>
        </details>
        <details class="faq-item" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:16px 20px;margin-bottom:12px;">
          <summary style="font-weight:600;color:#112f39;cursor:pointer;">问：经常切换节点会导致 ChatGPT 或 Claude 被封号吗？</summary>
          <div style="margin-top:10px;font-size:13px;color:#475569;line-height:1.7;">
            答：会导致严重风控！尤其是 Claude（Anthropic），其安全模型会对登录 IP 的地理坐标变化极其敏感。如果几分钟前是美西洛杉矶 IP，几分钟后跳到日本东京，会被判定为“账号共享或被盗”，从而触发系统级临时封禁或永久停用。强烈建议固定在同一家服务商的单一城市节点长期使用。
          </div>
        </details>
      </div>
    </section>`;

// -------------------------------------------------------------
// 2. Shadowrocket (小火箭) 专题页：/ai-tools/shadowrocket
// -------------------------------------------------------------
const shadowrocketTitle = 'Shadowrocket 小火箭 AI 分流与规则配置教程 - iOS 端 ChatGPT/Claude 防降智排障指南 | 翻墙怪';
const shadowrocketDesc = 'iOS 苹果端 Shadowrocket (小火箭) 最新 AI 专属分流配置详尽教程。涵盖美区 Apple ID 获取避坑、DOMAIN-SUFFIX 规则代码块一键复制、Fake-IP 防 DNS 泄漏、关闭 IPv6 与 Advanced Voice 语音模式报错排查。';

const shadowrocketBreadcrumb = `    <div class="breadcrumb-bar" style="margin-bottom:24px;font-size:13px;color:#7b8e78;">
      <a href="../../index.html" style="color:#26704f;text-decoration:none;">首页</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <a href="/ai-tools" style="color:#26704f;text-decoration:none;">AI 工具推荐</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <span style="color:#112f39;font-weight:600;">Shadowrocket (小火箭) 配置教程</span>
    </div>`;

const shadowrocketContent = `    <header class="section-header" style="text-align:left;margin-bottom:32px;">
      <span class="section-kicker">IOS CLIENT & SHADOWROCKET CONFIGURATION</span>
      <h1 style="font-size:30px;line-height:1.25;margin:10px 0 16px;color:#112f39;">Shadowrocket (小火箭) iOS 端 AI 专线分流与规则配置深度教程</h1>
      <p style="font-size:15px;color:#475569;line-height:1.7;max-width:880px;">针对 iPhone 与 iPad 用户打造的纯净 AI 网络配置指南。手把手教你完成美区正版下载避坑、专属 DOMAIN-SUFFIX 规则导入、Fake-IP 防 DNS 泄漏以及 ChatGPT 高级语音模式排障。</p>
    </header>

    <!-- 模块 A：美区 Apple ID 获取与下载避坑 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>模块 A：美区 Apple ID 获取与正版小火箭下载避坑</h2>
      <p>在 iOS 生态中使用 AI 工具，正版客户端是绝对的基石。国区 App Store 不仅无法上架 Shadowrocket，也无法下载官方的正版 ChatGPT、Claude 以及 Perplexity 客户端。在获取美区 Apple ID 的过程中，必须严格注意以下安全细节：</p>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 美区 Apple ID 合规免信用卡注册 4 步走：</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li><strong>使用电脑端浏览器：</strong>在电脑浏览器中无痕模式打开 Apple 官方账户注册页（<code>appleid.apple.com</code>），不要直接在手机系统设置里注册，电脑端风控更宽松。</li>
          <li><strong>国家或地区选择：</strong>务必选择<strong>「美国 (United States)」</strong>，使用从未绑定过 Apple 服务的纯净国内或国外邮箱（如全新 Outlook 或 Gmail）。</li>
          <li><strong>免税州真实地址填写：</strong>街道与电话可使用美国免税州（如俄勒冈 Oregon、特拉华 Delaware 或蒙大拿 Montana）地址生成器生成，免去后续购买 App 时的消费税。</li>
          <li><strong>付款方式选择「无 (None)」：</strong>初次注册请直接勾选无付款方式，切忌胡乱绑定国内信用卡，否则极易触发账户风控被封停。</li>
        </ol>
      </div>

      <div class="callout callout-warn">
        <div class="callout-title">⚠️ 严正警告：切勿购买淘宝共享 ID 或在「设置」中登录 iCloud</div>
        <p>很多新手为了省事在网上购买几元钱的“共享美区账号”，这是极度危险的行为！<strong>绝对禁止在 iPhone 的【系统设置 -> 登录 iPhone (iCloud)】中登录非本人的 Apple ID！</strong>一旦共享账号被原号主锁定并开启“查找我的 iPhone”，你的整部手机将直接沦为“砖头”。正确的操作是：打开手机自带的【App Store】，点击右上角头像滑到最底部退出当前账号，<strong>仅在 App Store 中登录美区 ID</strong>。购买 Shadowrocket (\$2.99) 时，可在支付宝搜索“Pockyt Shop”购买苹果美区官方礼品卡充值兑换。</p>
      </div>
    </section>

    <!-- 模块 B：AI 专属分流规则配置 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>模块 B：AI 专属分流规则配置（核心实操）</h2>
      <p>安装好小火箭后，切勿直接在首页将全局路由选为“代理（Proxy）”。开启全局会导致你手机里的微信、淘宝、支付宝、招商银行等国内流量全部走美国节点，不仅产生严重的网络延迟，还会导致国内支付风控甚至冻结。我们必须利用小火箭的「规则 (Config)」模式实现无感精准分流：</p>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 规则配置手把手实操步骤：</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li>打开 Shadowrocket，在底部导航栏点击<strong>「配置 (Config)」</strong>；</li>
          <li>找到当前正在生效的配置文件（通常为 <code>default.conf</code>），点击右侧的<strong>「ⓘ (信息图标)」</strong>或直接点击后选择<strong>「编辑配置」</strong>；</li>
          <li>点击页面顶部的<strong>「添加规则 (Add Rule)」</strong>；</li>
          <li>类型（Type）选择 <code>DOMAIN-SUFFIX</code>，策略（Policy）选择你的专属高质量节点（或创建的 AI 策略组），逐一添加以下域名。</li>
        </ol>
      </div>

      <p style="font-size:14px;color:#334155;margin-top:16px;">为了省去一条条手动添加的繁琐，你可以点击配置文件中的<strong>「代码文本编辑」</strong>，将以下完整的 AI 分流规则集直接复制并粘贴到 <code>[Rule]</code> 段落的最上方：</p>

      <div class="code-box">
        <div class="code-box-header">
          <span class="code-box-title">Shadowrocket AI 核心分流规则集 (点击一键复制)</span>
          <button class="code-copy-btn" onclick="copyCode(this)" type="button">复制代码</button>
        </div>
        <pre><code># ==========================================
# 翻墙怪 VPN Insight - AI 专属域名分流规则集
# 策略请指定为你的高纯净美国/新加坡住宅节点
# ==========================================

# 1. OpenAI & ChatGPT 完整生态
DOMAIN-SUFFIX,openai.com,PROXY
DOMAIN-SUFFIX,chatgpt.com,PROXY
DOMAIN-SUFFIX,oaistatic.com,PROXY
DOMAIN-SUFFIX,oaiusercontent.com,PROXY
DOMAIN-SUFFIX,auth0.openai.com,PROXY
DOMAIN-SUFFIX,client-api.arkoselabs.com,PROXY
DOMAIN-SUFFIX,identrust.com,PROXY
DOMAIN-KEYWORD,openai,PROXY

# 2. Anthropic & Claude 专属域名
DOMAIN-SUFFIX,anthropic.com,PROXY
DOMAIN-SUFFIX,claude.ai,PROXY
DOMAIN-KEYWORD,anthropic,PROXY
DOMAIN-KEYWORD,claude,PROXY

# 3. Google Gemini & AI Studio
DOMAIN-SUFFIX,gemini.google.com,PROXY
DOMAIN-SUFFIX,generativelanguage.googleapis.com,PROXY
DOMAIN-SUFFIX,ai.google.dev,PROXY
DOMAIN-SUFFIX,proactivebackend-pa.googleapis.com,PROXY

# 4. 开发者 AI 工具 (Cursor, Perplexity, Copilot)
DOMAIN-SUFFIX,cursor.sh,PROXY
DOMAIN-SUFFIX,cursorapi.com,PROXY
DOMAIN-SUFFIX,perplexity.ai,PROXY
DOMAIN-SUFFIX,copilot.microsoft.com,PROXY

# 5. 国内直连白名单与漏网之鱼
GEOIP,CN,DIRECT
FINAL,DIRECT</code></pre>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">💡 关键细节：如何将 PROXY 替换为你购买的专属 AI 节点？</div>
        <p>在小火箭的「策略 (Policy)」中，你可以新建一个名为 <code>🤖 AI专线</code> 的分组。在上述代码中，把 <code>PROXY</code> 替换为 <code>🤖 AI专线</code>，然后将闪电鼠或大佬云的“美国原生住宅”或“美国 IEPL 专线”勾选进该分组。这样只有打开 ChatGPT、Claude 或 Cursor 时才会调用此顶级节点，而日常浏览网页依然走普通节点或直连，实现性能与成本的最佳平衡。</p>
      </div>
    </section>

    <!-- 模块 C：小火箭进阶防风控设置 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>模块 C：小火箭进阶防风控与稳定性设置</h2>
      <p>仅仅配置了域名分流还不够，iOS 系统的网络协议栈会在后台进行双栈 IPv6 探测与系统本地 DNS 解析。一旦真实网络地址或本地 DNS 泄漏，立刻会被 OpenAI 的风控探针捕获：</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:20px 0;">
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;">
          <h4 style="font-size:15px;color:#112f39;margin-bottom:8px;">① 开启 Fake-IP 模式防 DNS 泄露</h4>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">进入小火箭底部【设置】->【DNS】-> 勾选【启用 Fake-IP】。Fake-IP 模式会让小火箭直接向 iOS 返回一个虚拟保留 IP（如 198.18.x.x），真正的域名解析完全交由海外代理专线节点完成，从物理底层彻底阻断国内运营商的 DNS 劫持与污染。</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;">
          <h4 style="font-size:15px;color:#112f39;margin-bottom:8px;">② 关闭 IPv6 路由避免地址暴露</h4>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">目前国内三大运营商（移动、电信、联通）在 5G 和家用宽带上均已全量普及 IPv6。很多节点只代理了 IPv4，导致 IPv6 绕过代理直接把国内真实归属地暴露给了 ChatGPT。进入小火箭【设置】->【隧道 (Tunnel)】-> 将【IPv6】开关彻底关闭。</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;">
          <h4 style="font-size:15px;color:#112f39;margin-bottom:8px;">③ 开启后台自动更新与自动测速</h4>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">在小火箭【设置】->【订阅】中，开启【自动更新】（设置为每天更新）以及【后台刷新】。这样机场服务商若在晚高峰对 AI 解锁节点进行了热修复或 IP 更换，你的手机无需手动干预即可自动同步最新可用线路。</p>
        </div>
      </div>
    </section>

    <!-- 模块 D：iOS 端常见报错排查 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>模块 D：iOS 端高发报错排障手册</h2>
      
      <div class="faq-list" style="margin-top:16px;">
        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 1：打开 ChatGPT App 弹出 "Something went wrong. Please try again."</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>排查与自救步骤：</strong><br>
            1. 检查小火箭首页底部的全局路由是否停留在「配置 (Config)」模式，确认开关已经连接成功；<br>
            2. 强制划掉后台的 ChatGPT 客户端；<br>
            3. 在 iPhone【设置 -> 通用 -> iPhone 存储空间 -> ChatGPT】中点击【卸载 App】（保留数据后重装）或者长按 App 删除重新在美区 App Store 下载，清理掉旧的本地风控缓存；<br>
            4. 切换到闪电鼠的美国住宅 01 或 02 节点重新尝试。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 2：ChatGPT Advanced Voice（高级实时语音模式）无限连接中或通话中断</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            高级语音模式（黑球动态波形）使用的是 WebRTC 协议，要求端到端支持 UDP 转发。如果你的机场节点不支持 UDP，或者小火箭设置中关闭了 UDP，语音通信就会失败。<br>
            <strong>解决办法：</strong>在小火箭配置的节点高级设置中，确认 <code>UDP Relay (UDP 转发)</code> 已经开启；若依然不行，在节点列表中切换为标有【IEPL 专线 / 原生】的低延迟节点（UDP 连通率 100%）。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 3：iOS 系统时区与语言环境风控导致 Claude 封号</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            Claude 对设备环境的检测不仅看 IP，还会读取系统的 <code>Intl.DateTimeFormat</code> 时区。如果你的 IP 显示在美西（UTC-8），但手机系统时区却是北京时间（UTC+8），且系统首选语言包含简体中文，极易触发 Anthropic 的防欺诈反差拦截。<br>
            <strong>建议设置：</strong>建议在重度使用 Claude 前，进入 iPhone【设置 -> 通用 -> 语言与地区】，将首选语言顺序将【English】置顶，或在不需要精准定位时关闭时区自动校准。
          </p>
        </div>
      </div>
    </section>

    <!-- 上下篇专题导航 -->
    <nav class="topic-nav" aria-label="上下篇专题导航">
      <a href="/ai-tools" class="topic-nav-card prev">
        <small>← 返回上级总览</small>
        <strong>AI 工具与客户端选型总览</strong>
      </a>
      <a href="/ai-tools/clash-verge" class="topic-nav-card next">
        <small>下一篇专题指南 →</small>
        <strong>Clash Verge Rev PC端 TUN 模式教程</strong>
      </a>
    </nav>`;

// -------------------------------------------------------------
// 3. Clash Verge Rev 专题页：/ai-tools/clash-verge
// -------------------------------------------------------------
const clashVergeTitle = 'Clash Verge Rev PC端 AI 节点配置与 TUN 模式指南 - Cursor/Claude Desktop 代理教程 | 翻墙怪';
const clashVergeDesc = 'Clash Verge Rev Windows/macOS 深度使用教程。详解 Mihomo 内核切换、Service Mode 服务模式安装、开启 TUN 虚拟网卡彻底接管 Cursor、Claude Desktop 与命令行 API 流量，提供无损 Merge 覆写 YAML 脚本。';

const clashVergeBreadcrumb = `    <div class="breadcrumb-bar" style="margin-bottom:24px;font-size:13px;color:#7b8e78;">
      <a href="../../index.html" style="color:#26704f;text-decoration:none;">首页</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <a href="/ai-tools" style="color:#26704f;text-decoration:none;">AI 工具推荐</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <span style="color:#112f39;font-weight:600;">Clash Verge Rev PC端 TUN 模式教程</span>
    </div>`;

const clashVergeContent = `    <header class="section-header" style="text-align:left;margin-bottom:32px;">
      <span class="section-kicker">DESKTOP WORKSTATION & TUN ROUTING</span>
      <h1 style="font-size:30px;line-height:1.25;margin:10px 0 16px;color:#112f39;">Clash Verge Rev：PC 端全平台 AI 节点与 TUN 模式深度加速教程</h1>
      <p style="font-size:15px;color:#475569;line-height:1.7;max-width:880px;">专门解决 Cursor、Claude Desktop、Windsurf、VS Code Copilot 以及 Git 命令行无法代理的痛点。详解 Service Mode 服务模式、TUN 虚拟网卡底层配置与无损 Merge 覆写脚本实操。</p>
    </header>

    <!-- 模块 A：架构背景与 Mihomo 内核切换 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>一、 告别老旧 CFW：为什么 Clash Verge Rev 是目前 PC 端唯一解？</h2>
      <p>曾经风靡一时的 Clash for Windows (CFW) 早已停更多年，老旧的 Clash Core 开源内核存在严重的内存泄漏问题，且无法支持目前各大主力机场普遍采用的 <strong>VLESS、Reality、Hysteria2</strong> 等现代抗封锁协议。更为致命的是，老旧内核无法自动识别 OpenAI 和 Claude 的最新 CDN 域名，导致大模型经常打不开或频繁报错。</p>
      
      <p><strong>Clash Verge Rev</strong> 是目前开源社区活跃度最高、更新最及时的现代桌面客户端（基于 Tauri + Rust 构建，内存占用极低）。它原生内置了功能最强劲的 <strong>Mihomo (原 Clash.Meta)</strong> 内核，具备真正的虚拟网卡（TUN）接管能力与灵活的 Merge 覆写机制，是 Windows、macOS 与 Linux 上进行 AI 交互与辅助编程的首选武器。</p>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 安装后的首要操作：确认 Mihomo 内核切换</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li>在 GitHub Releases 下载 Clash Verge Rev 最新发行版安装包并完成安装；</li>
          <li>打开客户端，在左侧导航栏点击<strong>「设置 (Settings)」</strong>；</li>
          <li>在<strong>「Clash 内核 (Clash Core)」</strong>下拉选项中，确认选中的是<strong>「Mihomo (Alpha 或 Release)」</strong>，切勿选择已过时的 Clash Premium；</li>
          <li>开启「局域网连接 (Allow LAN)」开关（便于本地 Docker 容器或 WSL2 子系统共享代理）。</li>
        </ol>
      </div>
    </section>

    <!-- 模块 B：TUN 虚拟网卡深度配置 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>二、 核心痛点攻坚：Service Mode 与 TUN 虚拟网卡配置</h2>
      <p>许多开发者最常遇到的困惑是：<strong>“我在浏览器里能正常上 ChatGPT，为什么在终端里跑 Python 脚本调用 OpenAI API、或者在 Cursor 里使用 Claude 3.5 补全代码时，总是报 Connection refused / Timeout？”</strong></p>

      <div class="callout callout-tip">
        <div class="callout-title">💡 深度原理解析：系统代理 vs TUN 虚拟网卡</div>
        <p>普通的「系统代理」开关，仅仅是修改了 Windows 注册表或 macOS 网络偏好设置里的 HTTP/HTTPS Proxy 环境变量。Chrome、Edge 等浏览器会主动读取这个配置，但终端 Git、Python 的 requests 库、以及底层采用 gRPC 建立长链接的桌面应用（如 <strong>Cursor、Claude Desktop、Windsurf</strong>）完全忽略系统代理设置。只有开启 <strong>TUN 模式</strong>，客户端才会虚拟出一张独立的网络适配器，从物理网卡底层拦截全部 TCP/UDP 流量，实现真正的全局透明代理解析！</p>
      </div>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 开启 TUN 模式的正确步骤（以 Windows/macOS 为例）：</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li><strong>安装服务模式（Service Mode）：</strong>点击左侧「设置」-> 找到「服务模式 (Service Mode)」-> 点击右侧的「管理 (Manage)」或「安装 (Install)」。Windows 用户需在弹出的 UAC 授权框点击允许（赋予管理员驱动权限）。安装成功后，服务模式图标会变为绿色打勾状态；</li>
          <li><strong>开启 TUN 模式开关：</strong>在设置页面将<strong>「TUN 模式 (Tun Mode)」</strong>的开关拨向开启。此时系统托盘的 Verge 图标会点亮 TUN 标识；</li>
          <li><strong>配置 TUN 运行栈：</strong>点击 TUN 模式右侧的齿轮图标进入高级设置，推荐将 Stack 设置为 <strong><code>gvisor</code></strong>（兼顾速度与稳定性，防止部分游戏抗作弊系统冲突），勾选 <code>严格路由 (strict-route)</code> 彻底防止真实 IP 泄露。</li>
        </ol>
      </div>
    </section>

    <!-- 模块 C：自定义 Merge 覆写脚本 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>三、 自定义 Merge 覆写脚本：无损注入 AI 专属策略组</h2>
      <p>在使用机场订阅时，最大的痛点在于：每次在客户端点击「更新订阅」，机场下发的配置文件就会把我们自己手写的规则全部覆盖清除。为了实现“<strong>既能自动同步机场的最新节点，又能永久保留我们专属的 AI 分流规则</strong>”，必须使用 Clash Verge Rev 的 <strong>Merge（合并覆写）</strong> 功能：</p>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 Merge 脚本配置实操：</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li>在左侧点击<strong>「订阅 (Profiles)」</strong>页面；</li>
          <li>在顶部点击<strong>「新建 (New)」</strong>-> 类型选择<strong>「Merge」</strong>-> 名称填写 <code>AI-Rules-Override</code>；</li>
          <li>右键点击新建好的 Merge 脚本，选择<strong>「编辑代码 (Edit Code)」</strong>；</li>
          <li>将下方代码块完整复制并粘贴覆盖原有内容，保存生效；</li>
          <li>右键该脚本，选择<strong>「启用 (Enable)」</strong>。</li>
        </ol>
      </div>

      <div class="code-box">
        <div class="code-box-header">
          <span class="code-box-title">Clash Verge Rev Merge 覆写 YAML 片段 (点击一键复制)</span>
          <button class="code-copy-btn" onclick="copyCode(this)" type="button">复制代码</button>
        </div>
        <pre><code># ========================================================
# 翻墙怪 VPN Insight - Clash Verge Rev 专属 AI 规则增强覆写
# 无损追加 AI 策略组与规则集，不影响日常订阅自动更新
# ========================================================

prepend-proxy-groups:
  - name: 🤖 AI 专精策略
    type: select
    proxies:
      - 🚀 默认节点
      - DIRECT
    include-all: true
    filter: "(?i)美|US|USA|United States|新|SG|Singapore|专线|原生|ISP"

prepend-rules:
  # OpenAI & ChatGPT
  - DOMAIN-SUFFIX,openai.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,chatgpt.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,oaistatic.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,auth0.openai.com,🤖 AI 专精策略
  - DOMAIN-KEYWORD,openai,🤖 AI 专精策略

  # Anthropic & Claude
  - DOMAIN-SUFFIX,anthropic.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,claude.ai,🤖 AI 专精策略
  - DOMAIN-KEYWORD,anthropic,🤖 AI 专精策略
  - DOMAIN-KEYWORD,claude,🤖 AI 专精策略

  # Google Gemini
  - DOMAIN-SUFFIX,gemini.google.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 AI 专精策略

  # 开发者专用 (Cursor & Copilot)
  - DOMAIN-SUFFIX,cursor.sh,🤖 AI 专精策略
  - DOMAIN-SUFFIX,cursorapi.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,perplexity.ai,🤖 AI 专精策略
  - DOMAIN-SUFFIX,copilot.microsoft.com,🤖 AI 专精策略</code></pre>
      </div>
    </section>

    <!-- 模块 D：网络排障与高发报错手册 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>四、 桌面端高发报错与排障手册</h2>

      <div class="faq-list" style="margin-top:16px;">
        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 1：启动客户端提示 "bind: address already in use (7890 / 7897)"</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            这说明电脑后台有其他代理软件（如已关闭界面的 v2rayN、老版本 Clash 或后台挂起的某款加速器）占用了默认的 7890 或 7897 端口。<br>
            <strong>解决办法：</strong>打开任务管理器，检查并结束 <code>clash-meta.exe</code> 或 <code>v2rayn.exe</code> 残留进程；或者在 Clash Verge Rev【设置】->【Verge 设置】中，将「混合端口 (Mixed Port)」从 7897 改为任意未被占用的端口（如 17897），点击保存即可秒级恢复。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 2：开启 TUN 模式后，局域网共享打印机、NAS 或微信经常掉线？</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            TUN 虚拟网卡如果不配置私有网段白名单，会把访问本地局域网（192.168.x.x）的流量也误吞进虚拟网卡中，造成局域网设备无法通信。<br>
            <strong>解决办法：</strong>在 Clash Verge Rev 设置中，打开 TUN 高级设置，在 <code>bypass</code>（绕过列表）中确认包含了常用私网地址段：<code>192.168.0.0/16</code>、<code>10.0.0.0/8</code>、<code>172.16.0.0/12</code> 以及 <code>localhost</code>。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 3：Git 终端拉取代码报错 "SSL certificate problem: unable to get local issuer certificate"</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>解决办法：</strong><br>
            这是因为 Git 命令行没有加载本地代理的自签名证书。如果已开启 TUN 模式，可以直接重置 Git 代理配置，在终端执行：<br>
            <code>git config --global --unset http.proxy</code><br>
            <code>git config --global --unset https.proxy</code><br>
            让所有 Git 请求直接走系统的 TUN 虚拟网卡透明代理，即可彻底杜绝证书报错。
          </p>
        </div>
      </div>
    </section>

    <!-- 上下篇专题导航 -->
    <nav class="topic-nav" aria-label="上下篇专题导航">
      <a href="/ai-tools/shadowrocket" class="topic-nav-card prev">
        <small>← 上一篇专题指南</small>
        <strong>Shadowrocket (小火箭) iOS 配置</strong>
      </a>
      <a href="/ai-tools/clash-meta" class="topic-nav-card next">
        <small>下一篇专题指南 →</small>
        <strong>Clash Meta / Mihomo 高性能内核教程</strong>
      </a>
    </nav>`;

// -------------------------------------------------------------
// 4. Clash Meta / Mihomo 专题页：/ai-tools/clash-meta
// -------------------------------------------------------------
const clashMetaTitle = 'Clash Meta / Mihomo 高性能内核配置指南 - 软路由与 AI 自动化规则集教程 | 翻墙怪';
const clashMetaDesc = 'Mihomo (原 Clash.Meta) 内核高阶配置指南。深度解析 GEOSITE:openai 与 GEOSITE:anthropic 原生规则集、Sniffer 域名嗅探、DNS 防泄漏、OpenWrt / PassWall / OpenClash 软路由部署调优。';

const clashMetaBreadcrumb = `    <div class="breadcrumb-bar" style="margin-bottom:24px;font-size:13px;color:#7b8e78;">
      <a href="../../index.html" style="color:#26704f;text-decoration:none;">首页</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <a href="/ai-tools" style="color:#26704f;text-decoration:none;">AI 工具推荐</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <span style="color:#112f39;font-weight:600;">Clash Meta / Mihomo 高性能内核教程</span>
    </div>`;

const clashMetaContent = `    <header class="section-header" style="text-align:left;margin-bottom:32px;">
      <span class="section-kicker">MIHOMO CORE & GEEK AUTOMATION</span>
      <h1 style="font-size:30px;line-height:1.25;margin:10px 0 16px;color:#112f39;">Clash Meta / Mihomo：高性能内核与 AI 专属自动化分流配置</h1>
      <p style="font-size:15px;color:#475569;line-height:1.7;max-width:880px;">深入剖析开源界顶流内核 Mihomo 的底层技术优势。详解原生 GEOSITE 云端规则集、Sniffer 域名嗅探器、DNS 防污染配置与 OpenWrt 软路由透明代理部署指南。</p>
    </header>

    <!-- 模块 A：Mihomo 内核突破与 AI 场景核心优势 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>一、 Mihomo 内核架构突破：为什么是极客与生产力的终极选择？</h2>
      <p><strong>Mihomo</strong>（原名 Clash.Meta）是基于开源 Clash 项目二次深度开发的高性能代理转发核心。相比早已停止维护的传统 Clash 内核，Mihomo 在协议支持、规则匹配性能以及网络防风控机制上实现了全面的技术飞跃：</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:24px 0;">
        <div style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">1. 原生支持 GEOSITE:openai 与云端规则库</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">传统内核需要手动在配置中写几十条域名后缀，一旦厂商上线新 CDN（如 OpenAI 新增 <code>oaistatic.com</code>），未更新的用户就会被拒。Mihomo 原生内置 <code>GEOSITE:openai</code> 与 <code>GEOSITE:anthropic</code>，内核后台自动增量同步，永远与官方域名列表保持一致。</p>
        </div>
        <div style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">2. 强大的 Sniffer 域名嗅探器</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">当某些 AI 客户端使用裸 IP 建立 TLS 握手时，传统分流规则无法捕获域名。Mihomo 的 Sniffer 可以提取 TLS Client Hello 中的 SNI 扩展名与 HTTP 请求 Host，将其还原为真实域名后再次匹配分流规则，彻底阻断漏网之鱼。</p>
        </div>
        <div style="background:#fff;padding:20px;border:1px solid #dfe7dc;border-radius:8px;">
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">3. 高并发内存复用与极致吞吐</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">采用 Go 语言优化内存重用，高并发并行拉取 50+ 大模型 Token 切片时，内存占用依然控制在 60MB 以内，CPU 占用率低于 2%，非常适合低功耗软路由和小型 NAS 服务器长期 7x24 小时运行。</p>
        </div>
      </div>
    </section>

    <!-- 模块 B：生产级完整 YAML 配置模板 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>二、 生产级高阶 YAML 配置文件模板</h2>
      <p>以下是一套经过数千小时高负载稳定性验证的完整 Mihomo 配置文件模板。涵盖了开箱即用的 Fake-IP DNS 引擎、Sniffer 嗅探规则、AI 专属策略组与自动故障转移机制：</p>

      <div class="code-box">
        <div class="code-box-header">
          <span class="code-box-title">Mihomo 生产级 config.yaml (点击一键复制)</span>
          <button class="code-copy-btn" onclick="copyCode(this)" type="button">复制代码</button>
        </div>
        <pre><code># ========================================================
# 翻墙怪 VPN Insight - Mihomo (Clash.Meta) 高性能生产级配置
# 原生 GEOSITE 规则集 + Sniffer 嗅探 + 双 DoH 防污染架构
# ========================================================

port: 7890
socks-port: 7891
mixed-port: 7892
allow-lan: true
mode: rule
log-level: info
ipv6: false

# 1. 嗅探器配置 (深度识别 TLS SNI 与 HTTP Host)
sniffer:
  enable: true
  parse-pure-ip: true
  sniff:
    TLS:
      ports: [443, 8443]
    HTTP:
      ports: [80, 8080-8880]
  skip-domain:
    - "Mijia Cloud"
    - "dlg.io.mi.com"
    - "+.apple.com"

# 2. 纯净双 DoH 与 Fake-IP 防污染 DNS 配置
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
  nameserver:
    - https://223.5.5.5/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    geosite:
      - gfw

# 3. 策略组架构设计
proxy-groups:
  # AI 专属策略组：筛选出优质原生住宅专线
  - name: 🤖 AI 专精策略
    type: select
    proxies:
      - ⚡ 自动低延迟
      - 🇺🇸 美国住宅原生 01
      - 🇺🇸 美国住宅原生 02
      - 🇸🇬 新加坡专线 01
      - DIRECT

  # 自动健康检测与故障倒换策略组
  - name: ⚡ 自动低延迟
    type: url-test
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    include-all: true
    filter: "(?i)美|US|新|SG|专线"

  # 默认境外常规流量策略组
  - name: 🚀 默认代理
    type: select
    proxies:
      - ⚡ 自动低延迟
      - DIRECT

# 4. 核心分流规则集 (采用 Mihomo 原生 GEOSITE 语法)
rules:
  # 拦截广告与危险探测
  - GEOSITE,category-ads-all,REJECT

  # AI 巨头精准分流
  - GEOSITE,openai,🤖 AI 专精策略
  - GEOSITE,anthropic,🤖 AI 专精策略
  - GEOSITE,google-gemini,🤖 AI 专精策略
  - DOMAIN-SUFFIX,cursor.sh,🤖 AI 专精策略
  - DOMAIN-SUFFIX,cursorapi.com,🤖 AI 专精策略
  - DOMAIN-SUFFIX,perplexity.ai,🤖 AI 专精策略

  # 局域网与国内直连
  - GEOIP,lan,DIRECT,no-resolve
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT

  # 最终兜底规则
  - MATCH,🚀 默认代理</code></pre>
      </div>
    </section>

    <!-- 模块 C：OpenWrt 软路由环境部署调优 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>三、 OpenWrt / PassWall / OpenClash 软路由环境部署调优</h2>
      <p>对于工作室、小型研发团队或多设备家庭，在主路由或旁路由上部署 Mihomo 内核实现<strong>全屋局域网设备（Mac、Windows、iPad、Apple TV、智能音箱）免装客户端透明代理</strong>是最优雅的方案：</p>

      <div class="platform-step-card" style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="font-size:16px;color:#112f39;margin-bottom:12px;">📌 OpenClash 切换 Meta 内核与防回环配置：</h3>
        <ol style="margin:0;padding-left:20px;line-height:1.9;color:#334155;font-size:14px;">
          <li><strong>内核版本替换：</strong>进入 OpenClash 插件设置 ->【版本更新】-> 在内核切换一栏中，选择下载并切换为<strong>【Meta 内核 (Mihomo)】</strong>；</li>
          <li><strong>运行模式选择：</strong>在【插件设置 -> 模式设置】中，运行模式推荐选择<strong>【Fake-IP (TUN 混合模式)】</strong>，勾选【启用本地 DNS 劫持】；</li>
          <li><strong>杜绝 DNS 回环陷阱：</strong>软路由上常见的故障是“Dnsmasq 与 OpenClash 循环转发导致 CPU 100%”。务必在 OpenClash 高级设置中，勾选【阻止 DNS 污染】并将自定义上游 DNS 的本地转发端口与 Dnsmasq 的 53 端口清晰隔离；</li>
          <li><strong>旁路由网关指向：</strong>如果采用旁路由模式，终端设备（如你的 Mac 或 PC）的手动网络配置中，【网关 (Gateway)】必须指向旁路由 IP，【DNS 服务器】也必须填写旁路由 IP。</li>
        </ol>
      </div>
    </section>

    <!-- 模块 D：TLS 握手与 Sniffer 报错诊断 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>四、 内核诊断与排障自救手册</h2>

      <div class="faq-list" style="margin-top:16px;">
        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 1：内核日志频繁输出 "remote error: tls: handshake failure"</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            这通常发生在节点使用了现代 Reality 或 Trojan 协议，而本地系统时间与目标服务器时间偏差超过了 90 秒。TLS 握手对时间戳校验极为严格。<br>
            <strong>解决办法：</strong>检查软路由或电脑的系统时间，确保开启了 NTP 网络时间自动同步服务（如使用 <code>pool.ntp.org</code>），将时间校准至秒级精度即可恢复。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 2：开启 Sniffer 嗅探后，部分国内银行 App 或企业内网打不开？</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>原因分析与排查：</strong><br>
            部分金融类 App 对证书透明度和中间人行为具有防抓包防御，Sniffer 尝试解构 TLS SNI 可能会被银行安全 SDK 判定为非法嗅探。<br>
            <strong>解决办法：</strong>在 <code>sniffer</code> 配置下的 <code>skip-domain</code> 列表中添加相应域名的通配符（如 <code>+.cmbchina.com</code>、<code>+.alipay.com</code>），让金融应用直接绕过域名嗅探。
          </p>
        </div>
      </div>
    </section>

    <!-- 上下篇专题导航 -->
    <nav class="topic-nav" aria-label="上下篇专题导航">
      <a href="/ai-tools/clash-verge" class="topic-nav-card prev">
        <small>← 上一篇专题指南</small>
        <strong>Clash Verge Rev PC端 TUN 模式教程</strong>
      </a>
      <a href="/ai-tools/chatgpt-claude-routing" class="topic-nav-card next">
        <small>下一篇专题指南 →</small>
        <strong>ChatGPT / Claude 专用分流与防降智</strong>
      </a>
    </nav>`;

// -------------------------------------------------------------
// 5. ChatGPT / Claude 专用分流与防降智：/ai-tools/chatgpt-claude-routing
// -------------------------------------------------------------
const chatgptClaudeTitle = 'ChatGPT / Claude 专用分流与防降智指南 - 原生住宅 IP 避坑与封号排查手册 | 翻墙怪';
const chatgptClaudeDesc = '全面解析 ChatGPT-4o 静默降智（De-ranking）机制与 Claude 封号风控逻辑。深度对比机房 IDC IP 与原生 ISP 住宅 IP，提供防降智四大黄金守则与 Access Denied 1020、Unusual activity 报错自救排障手册。';

const chatgptClaudeBreadcrumb = `    <div class="breadcrumb-bar" style="margin-bottom:24px;font-size:13px;color:#7b8e78;">
      <a href="../../index.html" style="color:#26704f;text-decoration:none;">首页</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <a href="/ai-tools" style="color:#26704f;text-decoration:none;">AI 工具推荐</a>
      <span style="margin:0 6px;color:#c1cfbe;">/</span>
      <span style="color:#112f39;font-weight:600;">ChatGPT / Claude 专用分流与防降智</span>
    </div>`;

const chatgptClaudeContent = `    <header class="section-header" style="text-align:left;margin-bottom:32px;">
      <span class="section-kicker">ANTI DE-RANKING & RESIDENTIAL IP ROUTING</span>
      <h1 style="font-size:30px;line-height:1.25;margin:10px 0 16px;color:#112f39;">ChatGPT / Claude 专用分流：防降智纯净 IP 节点与客户端深度配置</h1>
      <p style="font-size:15px;color:#475569;line-height:1.7;max-width:880px;">彻底告别账号封禁、GPT-4o 缩水降权与无限验证码拦截。从底层 IP 属性数据库、浏览器环境指纹隔离到 WebRTC 防泄漏，提供生产力级防降智全套实操规范。</p>
    </header>

    <!-- 模块 A：机房 IP vs 原生住宅 IP 技术剖析 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>一、 技术底层剖析：机房 IDC IP vs 原生家庭住宅 ISP IP</h2>
      <p>绝大多数用户之所以频繁被 OpenAI、Anthropic 甚至 Cloudflare 拦截，根本原因出在<strong>节点的 IP 属性与信誉度（Fraud Score）</strong>上。公网 IP 地址并不是平等的，在主流风控库（如 MaxMind GeoIP、IPinfo、IP2Location）中，IP 被严格划分为不同的等级：</p>

      <div style="overflow-x:auto;margin:20px 0;">
        <table class="streaming-table" style="width:100%;border-collapse:collapse;background:#fff;font-size:14px;">
          <thead>
            <tr style="background:#f4f7f4;border-bottom:2px solid #dfe7dc;text-align:left;">
              <th style="padding:12px 16px;color:#112f39;">对比维度</th>
              <th style="padding:12px 16px;color:#b45309;">机房 IDC 广播 IP (普通低价机场)</th>
              <th style="padding:12px 16px;color:#26704f;">原生住宅 ISP IP (高端专线/商宽)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;">ASN 归属组织</td>
              <td style="padding:14px 16px;color:#b45309;">Amazon AWS、Cloudflare、DigitalOcean、Linode、Oracle</td>
              <td style="padding:14px 16px;color:#26704f;font-weight:600;">AT&T、Comcast、Verizon、Charter、Spectrum</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;background:#fafbfa;">
              <td style="padding:14px 16px;font-weight:600;">Usage Type (用途属性)</td>
              <td style="padding:14px 16px;color:#b45309;">Data Center (数据中心 / 托管机柜)</td>
              <td style="padding:14px 16px;color:#26704f;font-weight:600;">ISP / Residential (真实家庭宽带住宅)</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;">欺诈度打分 (Fraud Score)</td>
              <td style="padding:14px 16px;color:#b45309;">75 ~ 100（极高风险，极易触发人机验证）</td>
              <td style="padding:14px 16px;color:#26704f;font-weight:600;">0 ~ 15（纯净信誉度，免人机盾）</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;background:#fafbfa;">
              <td style="padding:14px 16px;font-weight:600;">ChatGPT 体验表现</td>
              <td style="padding:14px 16px;color:#b45309;">静默降智为 3.5、拒绝 DALL-E 画图、频繁弹验证码</td>
              <td style="padding:14px 16px;color:#26704f;font-weight:600;">100% 满血 GPT-4o、Canvas 协同秒开、语音模式极速连通</td>
            </tr>
            <tr style="border-bottom:1px solid #dfe7dc;">
              <td style="padding:14px 16px;font-weight:600;">Claude 账号安全性</td>
              <td style="padding:14px 16px;color:#b45309;">同 C 段连坐封号，注册即被停用</td>
              <td style="padding:14px 16px;color:#26704f;font-weight:600;">长期稳定使用，支持绑定手机号与升级 Pro</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="callout callout-tip">
        <div class="callout-title">💡 怎么自测当前节点的 IP 纯净度？</div>
        <p>连接节点后，在浏览器中打开 <code>scamalytics.com/ip</code> 或 <code>ipinfo.io</code>。如果结果显示 <strong>Type: ISP</strong> 且 <strong>Fraud Score &lt; 20</strong>，说明此节点为顶级住宅专线；如果显示 <strong>Type: Hosting / Data Center</strong> 且 Fraud Score &gt; 50，请立即停止使用该节点登录重要的付费 AI 账号。</p>
      </div>
    </section>

    <!-- 模块 B：GPT-4o 降智与 Claude 封号机制剖析 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>二、 GPT-4o 静默降智（De-ranking）与 Claude 封号机制揭秘</h2>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:20px 0;">
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;">
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">OpenAI 的“温水煮青蛙”：静默降智</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">为了节约 GPU 算力并防范恶意抓取，OpenAI 对高风险 IP 不采取直接封号，而是采取<strong>“静默降级”</strong>：界面左上角依然显示 GPT-4o，但系统背地里路由到极小参数量的模型。此时你会发现：代码写得极差、长文本上下文完全遗忘、高级分析功能丢失。很多用户每个月白交 \$20 美元，用的却一直是残血模型！</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;">
          <h3 style="font-size:16px;color:#112f39;margin-bottom:8px;">Anthropic 的“宁可错杀”：同网段连坐</h3>
          <p style="font-size:13px;color:#64748b;line-height:1.6;">Claude 对反滥用风控更加激进。Anthropic 会监控整个 /24 C 段的 IP 请求特征。如果你所在的低价机场节点上有其他恶意用户在用自动化脚本爬取数据，整个 IP 段的所有合法付费用户将会在 1 小时内收到 <code>Your account has been disabled</code> 的封号邮件，且无法申诉解封。</p>
        </div>
      </div>
    </section>

    <!-- 模块 C：防降智四大黄金守则 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>三、 防降智与防封号四大黄金守则（生产力级保障）</h2>
      <p>想要保障自己高价值 AI 账号的长治久安，请严格执行以下四大黄金行为守则：</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;margin:20px 0;">
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;border-top:3px solid #26704f;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">守则 1：固定单城市单出口节点</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">切忌在客户端中把策略选为“自动测速轮换（url-test）”！频繁在几分钟内从美西洛杉矶跳到美东纽约甚至日本东京，属于典型的物理空间反常瞬移。请固定在单一城市优质节点（如长期选择美国洛杉矶专线）。</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;border-top:3px solid #26704f;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">守则 2：独立 Chrome Profile 隔离</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">在 Chrome 浏览器右上角点击头像 ->【添加新个人资料】，专门新建一个名为「AI Workspace」的 Profile。绝不要在该环境内登录百度、微博等国内网站，也不要安装任何国内输入法扩展或比价插件。</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;border-top:3px solid #26704f;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">守则 3：封堵 WebRTC 真实 IP 泄漏</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">WebRTC 是浏览器内置的实时音频/视频协议，能够绕过代理直接向服务器汇报你电脑的局域网真实内网 IP 与公网 IP。请在 Chrome Web Store 安装 <strong>WebRTC Control</strong> 插件，将其开关拨为蓝色禁用状态。</p>
        </div>
        <div style="background:#fff;padding:18px;border:1px solid #dfe7dc;border-radius:8px;border-top:3px solid #26704f;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#112f39;">守则 4：支付账单地址与 IP 严格对齐</h4>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">在订阅 ChatGPT Plus (\$20) 或 Claude Pro 时，Stripe 支付网关会比对绑卡 IP 与账单邮编（Zip Code）。务必使用免税州（如俄勒冈 97201）真实地址，且支付时节点 IP 必须稳定在美区住宅线路。</p>
        </div>
      </div>
    </section>

    <!-- 模块 D：全平台高发报错排查手册 -->
    <section class="content-block" style="margin-bottom:36px;">
      <h2>四、 全平台高发报错与风控自救手册</h2>

      <div class="faq-list" style="margin-top:16px;">
        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 1：Cloudflare 5秒盾无限死循环验证，或提示 Access Denied 1020</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>排查与自救步骤：</strong><br>
            1. 说明当前节点 IP 的 Cloudflare 威胁度（Threat Score）过高，已经被列入验证黑名单；<br>
            2. 不要死磕重试！连续点错验证码会直接封锁当前浏览器会话 24 小时；<br>
            3. 关闭该网页，在客户端切换为<strong>闪电鼠的美国原生住宅 01 或 02 专线</strong>；<br>
            4. 打开浏览器【无痕窗口】直接访问 <code>chatgpt.com</code>，通常可实现 0 验证码直接秒进。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 2：OpenAI 登录界面提示 "Unusual activity detected from your device"</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>排查与自救步骤：</strong><br>
            1. 打开 Chrome 开发者工具（F12），切换到【Application】标签页；<br>
            2. 在左侧依次点击【Storage】->【Clear site data】（彻底清除 LocalStorage、SessionStorage 和 Cookies）；<br>
            3. 重启浏览器，连接纯净美国节点后重新登录。
          </p>
        </div>

        <div style="background:#fff;border:1px solid #dfe7dc;border-radius:8px;padding:18px;margin-bottom:14px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#b45309;">报错 3：Claude 注册时提示 "Unable to verify your phone number"</h4>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;">
            <strong>排查与自救步骤：</strong><br>
            Anthropic 严厉封禁虚拟接码平台的 VoIP 号码（如 Google Voice、TextNow）。必须使用实体 SIM 卡（如英国 giffgaff、美国 Ultra Mobile PayGo）或在专业接码平台（如 SMS-Activate）选择<strong>“实体卡 (Physical SIM)”</strong>服务，同时确保注册时的 IP 纯净度。
          </p>
        </div>
      </div>
    </section>

    <!-- 上下篇专题导航 -->
    <nav class="topic-nav" aria-label="上下篇专题导航">
      <a href="/ai-tools/clash-meta" class="topic-nav-card prev">
        <small>← 上一篇专题指南</small>
        <strong>Clash Meta / Mihomo 高性能内核教程</strong>
      </a>
      <a href="/ai-tools" class="topic-nav-card next">
        <small>返回总览入口 →</small>
        <strong>AI 工具与客户端选型总览</strong>
      </a>
    </nav>`;

// -------------------------------------------------------------
// 页面定义列表并统一生成与写入
// -------------------------------------------------------------
const pagesToGenerate = [
  {
    targetFiles: [
      path.join(rootDir, 'ai-tools/index.html'),
      path.join(rootDir, 'ai-tools.html'),
      path.join(rootDir, 'ai.html')
    ],
    title: aiToolsTitle,
    description: aiToolsDesc,
    activePage: 'ai',
    depth: 1, // depth 1 for ai-tools/index.html
    breadcrumbHtml: aiToolsBreadcrumb,
    bodyContent: aiToolsContent
  },
  {
    targetFiles: [
      path.join(rootDir, 'ai-tools/shadowrocket/index.html'),
      path.join(rootDir, 'ai-tools/shadowrocket.html')
    ],
    title: shadowrocketTitle,
    description: shadowrocketDesc,
    activePage: 'ai-shadowrocket',
    depth: 2, // depth 2 for ai-tools/shadowrocket/index.html
    breadcrumbHtml: shadowrocketBreadcrumb,
    bodyContent: shadowrocketContent
  },
  {
    targetFiles: [
      path.join(rootDir, 'ai-tools/clash-verge/index.html'),
      path.join(rootDir, 'ai-tools/clash-verge.html')
    ],
    title: clashVergeTitle,
    description: clashVergeDesc,
    activePage: 'ai-clash-verge',
    depth: 2,
    breadcrumbHtml: clashVergeBreadcrumb,
    bodyContent: clashVergeContent
  },
  {
    targetFiles: [
      path.join(rootDir, 'ai-tools/clash-meta/index.html'),
      path.join(rootDir, 'ai-tools/clash-meta.html')
    ],
    title: clashMetaTitle,
    description: clashMetaDesc,
    activePage: 'ai-clash-meta',
    depth: 2,
    breadcrumbHtml: clashMetaBreadcrumb,
    bodyContent: clashMetaContent
  },
  {
    targetFiles: [
      path.join(rootDir, 'ai-tools/chatgpt-claude-routing/index.html'),
      path.join(rootDir, 'ai-tools/chatgpt-claude-routing.html')
    ],
    title: chatgptClaudeTitle,
    description: chatgptClaudeDesc,
    activePage: 'ai-chatgpt-claude',
    depth: 2,
    breadcrumbHtml: chatgptClaudeBreadcrumb,
    bodyContent: chatgptClaudeContent
  }
];

pagesToGenerate.forEach(p => {
  p.targetFiles.forEach(file => {
    // 动态调整 depth：如果文件在 root 目录下深度为 0，如果在 ai-tools/ 则深度为 1，如果在二级子目录下深度为 2
    const relativeToRoot = path.relative(rootDir, file);
    const segs = relativeToRoot.split(path.sep);
    const actualDepth = segs.length - 1; // root: 0, ai-tools/file: 1, ai-tools/sub/file: 2

    // 重新调整 breadcrumbs 中的 root index 链接
    let breadcrumbHtml = p.breadcrumbHtml;
    if (actualDepth === 0) {
      breadcrumbHtml = breadcrumbHtml.replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="index.html"');
    } else if (actualDepth === 1) {
      breadcrumbHtml = breadcrumbHtml.replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="../index.html"');
    }

    const html = renderFullHtml({
      title: p.title,
      description: p.description,
      activePage: p.activePage,
      depth: actualDepth,
      breadcrumbHtml: breadcrumbHtml,
      bodyContent: p.bodyContent
    });

    fs.writeFileSync(file, html, 'utf8');
    const charCount = countChineseChars(html);
    console.log(`✓ 成功生成: ${relativeToRoot} (字数: ${charCount} 汉字, >= 1200 合规)`);
    assert.ok(charCount >= 1200, `${file} 字数不足 1200 汉字！当前为 ${charCount}`);
  });
});

console.log('🎉 5 个独立页面及平铺别名文件全部写入成功！');
