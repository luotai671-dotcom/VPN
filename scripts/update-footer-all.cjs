const fs = require('fs');
const path = require('path');

// 1. Update styles/main.css to upgrade the footer styles
let css = fs.readFileSync('styles/main.css', 'utf8');

const updatedFooterCss = `
/* ==========================================================================
   全新「翻墙怪」极客科技感页脚规范 (Cyber Navy High-Contrast Footer - 2026 Enhanced)
   ========================================================================== */
footer {
  background: radial-gradient(circle at 12% 0%, rgba(52, 211, 153, 0.09) 0%, transparent 45%), linear-gradient(180deg, #0e292d 0%, #07171a 100%) !important;
  color: #c4d6d0 !important;
  border-top: 1px solid rgba(52, 211, 153, 0.3) !important;
  padding-top: 60px !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: 0 -10px 40px rgba(7, 23, 26, 0.5) !important;
}

footer:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 5%, #34d399 35%, #a7f3d0 50%, #34d399 65%, transparent 95%);
  opacity: 0.9;
  filter: drop-shadow(0 0 8px #34d399);
}

.footer-main {
  display: grid !important;
  grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr !important;
  gap: 36px !important;
  padding-bottom: 42px !important;
}

/* 品牌专栏 */
.footer-brand .wordmark strong {
  color: #ffffff !important;
  font-size: 23px !important;
  letter-spacing: 2px !important;
}
.footer-brand .wordmark strong span {
  color: #34d399 !important;
  font-size: 8.5px !important;
  letter-spacing: 1.6px !important;
  font-weight: 700 !important;
}
.footer-brand p {
  font-size: 12.5px !important;
  color: #a4beba !important;
  line-height: 1.85 !important;
  margin: 16px 0 18px !important;
}

/* 品牌特色徽章胶囊 */
.footer-tags {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 7px !important;
  margin-bottom: 18px !important;
}
.footer-tag {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  padding: 5px 9px !important;
  border-radius: 5px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  background: rgba(52, 211, 153, 0.08) !important;
  border: 1px solid rgba(52, 211, 153, 0.25) !important;
  color: #a7f3d0 !important;
  white-space: nowrap !important;
  transition: all 0.2s ease !important;
}
.footer-tag:hover {
  background: rgba(52, 211, 153, 0.18) !important;
  border-color: #34d399 !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
}

/* 实时监控状态指示 */
.footer-monitor {
  display: inline-flex !important;
  align-items: center !important;
  gap: 9px !important;
  font-size: 11.5px !important;
  color: #c0ded6 !important;
  background: rgba(0, 0, 0, 0.4) !important;
  padding: 6px 14px !important;
  border-radius: 20px !important;
  border: 1px solid rgba(52, 211, 153, 0.3) !important;
}
.footer-monitor .status-dot {
  background: #34d399 !important;
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  display: inline-block !important;
  animation: dotPulse 2s infinite !important;
}
@keyframes dotPulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.75); }
  70% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

/* 导航链接列 */
.footer-col h3 {
  font-size: 13.5px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  letter-spacing: 0.6px !important;
  margin: 0 0 18px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}
.footer-col h3:after {
  content: '';
  display: inline-block;
  width: 14px;
  height: 3px;
  background: #34d399;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.6);
}
.footer-col a {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-size: 12px !important;
  color: #9cb8b3 !important;
  margin-bottom: 11px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}
.footer-col a:hover {
  color: #34d399 !important;
  transform: translateX(4px) !important;
  text-shadow: 0 0 10px rgba(52, 211, 153, 0.35) !important;
}

/* 联盟合作与客观原则卡片 */
.affiliate-disclosure {
  display: flex !important;
  gap: 20px !important;
  align-items: center !important;
  background: rgba(14, 46, 45, 0.6) !important;
  border: 1px solid rgba(52, 211, 153, 0.22) !important;
  border-left: 4px solid #34d399 !important;
  border-radius: 8px !important;
  padding: 18px 24px !important;
  margin-bottom: 26px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(8px) !important;
}
.affiliate-disclosure strong {
  font-size: 12px !important;
  color: #34d399 !important;
  white-space: nowrap !important;
  font-weight: 700 !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}
.affiliate-disclosure p {
  font-size: 11.5px !important;
  line-height: 1.8 !important;
  margin: 0 !important;
  color: #a4beba !important;
}

/* 页脚底部版权与法律说明 */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 20px !important;
  padding: 22px 0 35px !important;
  font-size: 11.5px !important;
  color: #7a9c92 !important;
}
.footer-bottom a {
  color: #9cb5ad !important;
  transition: color 0.2s !important;
}
.footer-bottom a:hover {
  color: #34d399 !important;
}
.footer-legal-note {
  font-size: 10.5px !important;
  color: #69897f !important;
  margin-top: 5px !important;
}
.footer-bottom-tools {
  display: flex !important;
  align-items: center !important;
  gap: 18px !important;
}
.footer-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-size: 11px !important;
  color: #8ae4bc !important;
  background: rgba(52, 211, 153, 0.08) !important;
  border: 1px solid rgba(52, 211, 153, 0.2) !important;
  padding: 4px 10px !important;
  border-radius: 12px !important;
}
.back-to-top-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  background: rgba(52, 211, 153, 0.08) !important;
  border: 1px solid rgba(52, 211, 153, 0.25) !important;
  color: #a7f3d0 !important;
  padding: 5px 12px !important;
  border-radius: 4px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}
.back-to-top-btn:hover {
  background: #34d399 !important;
  border-color: #34d399 !important;
  color: #0b2b1d !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(52, 211, 153, 0.4) !important;
}

/* 响应式适配 */
@media (max-width: 1050px) {
  .footer-main {
    grid-template-columns: 1fr 1fr !important;
    gap: 32px 24px !important;
  }
  .footer-brand {
    grid-column: 1 / -1 !important;
  }
  .affiliate-disclosure {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 8px !important;
  }
}
@media (max-width: 650px) {
  .footer-main {
    grid-template-columns: 1fr !important;
    gap: 28px !important;
  }
  .footer-bottom {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 14px !important;
  }
  .footer-bottom-tools {
    width: 100% !important;
    justify-content: space-between !important;
  }
}
`;

// Replace the old footer CSS in styles/main.css
if (css.includes('Cyber Navy High-Contrast Footer')) {
  css = css.replace(/\/\* ==========================================================================\s+全新「翻墙怪」极客科技感页脚规范[\s\S]*?@media \(max-width: 650px\) \{[\s\S]*?\}\s*\}\s*/, updatedFooterCss);
  fs.writeFileSync('styles/main.css', css, 'utf8');
  console.log('✓ Updated footer CSS in styles/main.css');
} else {
  css += updatedFooterCss;
  fs.writeFileSync('styles/main.css', css, 'utf8');
  console.log('✓ Added updated footer CSS to styles/main.css');
}

// 2. Define the template function for footer HTML
function buildFooter(relPrefix = '') {
  return `<footer><div class="container">
  <div class="footer-main">
    <div class="footer-brand">
      <a href="${relPrefix}index.html" class="wordmark" aria-label="翻墙怪首页">
        <span class="brand-icon" aria-hidden="true"><svg viewBox="0 0 64 64" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg></span><strong>翻墙怪<span>FANQIANGGUAI · VPN INSIGHT</span></strong>
      </a>
      <p>专注专线机场与稳定 VPN 科学上网深度评测。坚持自费匿名购买、晚高峰真机压力测试与客观中立原则，为你剔除超售套路，找到真正稳定不卡顿的高速连接。</p>
      <div class="footer-tags">
        <span class="footer-tag">⚡ 100% 独立实测</span>
        <span class="footer-tag">📶 晚高峰 0 丢包监控</span>
        <span class="footer-tag">🎬 4K 原生流媒体解锁</span>
        <span class="footer-tag">🛡️ 防跑路避坑指南</span>
      </div>
      <div class="footer-monitor"><span class="status-dot"></span> 全球专线监测中 · 2026 最新基准数据</div>
    </div>
    
    <div class="footer-col">
      <h3>核心推荐</h3>
      <a href="${relPrefix}index.html">首页</a>
      <a href="${relPrefix}vpn.html">2026 专线排行榜</a>
      <a href="${relPrefix}streaming.html">4K 流媒体解锁专线</a>
      <a href="${relPrefix}devices.html">全平台客户端推荐</a>
      <a href="${relPrefix}ai-tools/index.html">AI 工具与专用分流</a>
      <a href="${relPrefix}security.html">安全与隐私指南</a>
      <a href="${relPrefix}blog.html">博客资讯长尾中心</a>
    </div>

    <div class="footer-col">
      <h3>设备端配置</h3>
      <a href="${relPrefix}devices.html#windows">Windows (Clash Verge)</a>
      <a href="${relPrefix}devices.html#macos">macOS (Surge / Clash)</a>
      <a href="${relPrefix}devices.html#ios">iOS (Shadowrocket 小火箭)</a>
      <a href="${relPrefix}devices.html#android">Android (Clash / v2rayNG)</a>
      <a href="${relPrefix}devices.html#tv">TV 电视端 4K 串流</a>
      <a href="${relPrefix}devices.html#router">软路由网关 (OpenClash)</a>
    </div>

    <div class="footer-col">
      <h3>评测与避坑</h3>
      <a href="${relPrefix}methodology.html">评测方法与晚高峰测试</a>
      <a href="${relPrefix}blog/avoid-scam-vpn-buying-guide/index.html">买机场防跑路 6 大法则</a>
      <a href="${relPrefix}blog/vless-reality-trojan-stable-vpn/index.html">抗封锁稳定协议科普</a>
      <a href="${relPrefix}blog/best-vpn-for-chatgpt-claude/index.html">ChatGPT / Claude 防降智</a>
      <a href="${relPrefix}blog/cheap-vpn-airport-recommendation/index.html">平价高性价比机场实测</a>
      <a href="${relPrefix}beginner.html">新手断连快速自检指南</a>
    </div>

    <div class="footer-col">
      <h3>关于与合规</h3>
      <a href="${relPrefix}about.html">关于翻墙怪团队</a>
      <a href="${relPrefix}disclosure.html">广告与联盟合作声明</a>
      <a href="${relPrefix}privacy.html">隐私政策与数据安全</a>
      <a href="${relPrefix}terms.html">服务条款与免责声明</a>
      <a href="${relPrefix}sitemap.html">全站站点地图 (Sitemap)</a>
    </div>
  </div>

  <div class="affiliate-disclosure">
    <strong>ⓘ 联盟合作与独立原则</strong>
    <p>本站部分外部跳转包含联盟推广链接。若读者通过链接订购专线服务，我们可能获取微量返现以补贴自动化压测集群与服务器支出。商业合作绝不影响任何评测排名或评分，所有推荐机场均经受晚高峰持续实测，数据真实透明。</p>
  </div>

  <div class="footer-bottom">
    <div>
      <span>© 2026 翻墙怪 (FANQIANGGUAI · VPN INSIGHT). 独立评测，保留所有权利。</span>
      <div class="footer-legal-note">技术声明：本站提供之内容仅供网络技术学术交流、正规外贸及海外合法流媒体使用。请自觉遵守当地网络法规。</div>
    </div>
    <div class="footer-bottom-tools">
      <span class="footer-status-pill">🟢 SLA 99.98% 监测正常</span>
      <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" class="back-to-top-btn">↑ 回到顶部</a>
      <span>简体中文</span>
    </div>
  </div>
</div></footer>`;
}

// 3. Scan all HTML files and replace <footer>...</footer>
function getAllHtmlFiles(dir, list = []) {
  for (const item of fs.readdirSync(dir)) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      getAllHtmlFiles(p, list);
    } else if (item.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles('.');
let count = 0;

for (const f of htmlFiles) {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('<footer')) continue;

  // Determine prefix
  const norm = f.replace(/\\/g, '/');
  let relPrefix = '';
  if (norm.startsWith('ai-tools/') || norm.startsWith('blog/')) {
    const parts = norm.split('/');
    if (parts.length === 3) {
      relPrefix = '../../';
    } else if (parts.length === 2) {
      relPrefix = '../';
    }
  }

  const newFooter = buildFooter(relPrefix);
  content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooter);
  fs.writeFileSync(f, content, 'utf8');
  count++;
}
console.log(`✓ Updated footer in ${count} HTML files!`);
