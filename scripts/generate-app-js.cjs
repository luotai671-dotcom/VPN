const fs = require('fs');

const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

const providersJsData = services.map(s => ({
  id: s.id,
  rank: s.rank,
  isPrimary: s.isPrimary,
  name: s.name,
  mark: s.mark,
  subtitle: s.subtitle,
  established: s.established,
  lineArchitecture: s.lineArchitecture,
  peakPerformance: s.peakPerformance,
  clientSupport: s.clientSupport,
  unlockMatrix: s.unlockMatrix,
  rating: String(s.rating),
  pitch: s.pitch,
  overview: s.overview,
  tags: s.tags,
  speed: s.speed,
  servers: s.servers,
  countries: s.countries,
  price: s.startingPrice.toFixed(2),
  coupon: s.coupon || '',
  discount: s.discount,
  lineType: s.lineType,
  protocol: s.protocol,
  categories: s.categories,
  url: s.affiliateUrl,
  pros: s.pros,
  cons: s.cons,
  detail: s.detail,
  limitation: s.limitation
}));

const standaloneArticles = [
  { title: '流媒体解锁专线推荐：Netflix、Disney+、YouTube 4K 秒开', href: 'streaming.html', kind: '专线精选', text: '流媒体解锁 原生住宅IP Netflix Disney YouTube 4K 8K 追剧 闪电鼠 榴莲云 大佬云' },
  { title: '全平台客户端选择与安装配置完全指南', href: 'devices.html', kind: '客户端指南', text: '客户端配置 Windows macOS iOS Android 软路由 Apple TV Clash Verge v2rayN Shadowrocket 小火箭 Sing-box' },
  { title: '专线代理与数据隐私安全详解：从底层加密到零日志防护', href: 'security.html', kind: '安全与隐私', text: '安全隐私 VLESS TLS Reality 零日志 RAM-only 无盘 物理专线 IEPL IPLC' },
  { title: '专线知识、测速评测长文与使用技巧中心', href: 'blog.html', kind: '博客资讯', text: '专线知识 评测 避坑 优惠码 游戏加速 远程办公 电商出海' },
  { title: '专线网络服务新手入门完全指南', href: 'beginner.html', kind: '新手入门', text: '新手指南 什么是IEPL IPLC 怎么买专线 怎么导入节点 怎么使用' },
  { title: '透明的专线评测标准与方法论', href: 'methodology.html', kind: '评测标准', text: '评测方法 测试环境 晚高峰丢包率 流媒体测试 联盟合作' },
  { title: '关于翻墙怪 VPN Insight', href: 'about.html', kind: '关于我们', text: '团队初衷 收录原则 独立专线评测' },
  { title: '联盟合作与数据披露声明', href: 'disclosure.html', kind: '信息披露', text: '商业合作 佣金声明 实测数据免责' },
  { title: '站点地图', href: 'sitemap.html', kind: '站点地图', text: '快速索引 全站独立页面 深度评测' }
];

const fileContent = `/* 翻墙怪 VPN Insight - 真实评测与推广核心品牌数据层与交互逻辑 */
const providers = ${JSON.stringify(providersJsData, null, 2)};
const standaloneArticles = ${JSON.stringify(standaloneArticles, null, 2)};

window.copyCoupon = function(code, el) {
  if (!code) return;
  const originalHtml = el.innerHTML;
  const doCopy = () => {
    el.classList.add('copied');
    el.innerHTML = \`优惠码: <b>\${code}</b> <span class="copy-hint">已复制!</span>\`;
    setTimeout(() => {
      el.classList.remove('copied');
      el.innerHTML = originalHtml;
    }, 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(doCopy).catch(() => {
      fallbackCopy(code, doCopy);
    });
  } else {
    fallbackCopy(code, doCopy);
  }
};

function fallbackCopy(code, cb) {
  const ta = document.createElement('textarea');
  ta.value = code;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  cb();
}

function card(p, index) {
  const isTop = index === 0;
  const discountHtml = p.coupon 
    ? \`<button class="discount copyable" title="点击复制专属优惠码" onclick="copyCoupon('\${p.coupon}', this)">优惠码: <b>\${p.coupon}</b> <span class="copy-hint">复制</span></button>\`
    : \`<span class="discount">特惠直购 · 免券</span>\`;

  return \`<article class="vpn-card \${isTop ? 'top-ranked' : ''}" id="vpn-\${p.id}">
    \${isTop ? '<div class="top-ribbon">✦ 综合第一 · 2026 年度主推品牌</div>' : \`<div class="top-ribbon" style="background:#2d5040">★ 专线推荐 · 第 \${String(index + 1).padStart(2, '0')} 名</div>\`}
    <div class="card-top">
      <span class="rank-number">\${String(index + 1).padStart(2, '0')}</span>
      <span class="provider-mark \${p.id}" aria-hidden="true">\${p.mark}</span>
      <div class="provider-title">
        <strong>\${p.name}</strong>
        <small>\${p.subtitle}</small>
      </div>
      <div class="provider-score">
        <span class="score-stars" aria-label="评测星级">★★★★★</span>
        <span class="score-number">\${p.rating}<small> /10</small></span>
      </div>
    </div>
    <div class="card-body">
      <div>
        <p class="card-pitch">\${p.pitch}</p>
        <div class="feature-tags">
          \${p.tags.map(t => \`<span>\${t}</span>\`).join('')}
        </div>
        <div class="metrics">
          <div class="metric">↓ 实测下载速率<b>\${p.speed} <small>Mbps</small></b></div>
          <div class="metric">◎ 专线服务器<b>\${p.servers}</b></div>
          <div class="metric">⚑ 全球优质覆盖<b>\${p.countries}</b></div>
        </div>
      </div>
      <div class="purchase-block">
        \${discountHtml}
        <div class="price-line"><strong>¥\${p.price}</strong><span> / 月起</span></div>
        <small class="billing-note">\${p.lineType} · \${p.protocol}</small>
        <a class="button" href="\${p.url}" target="_blank" rel="nofollow sponsored noopener noreferrer" aria-label="访问 \${p.name} 官网">访问官网 <span>↗</span></a>
        <a class="review-link" href="review-\${p.id}.html">📖 查看深度测评报告 <span>→</span></a>
      </div>
    </div>
    <div class="card-bottom">
      <span>✓ \${p.lineType} <span>·</span> ✓ \${p.protocol} 协议 <span>·</span> ✓ 原生流媒体解锁</span>
      <button class="details-toggle" aria-expanded="false" aria-controls="details-\${p.id}">更多细节 ⌄</button>
    </div>
    <div class="details-content" id="details-\${p.id}" hidden>
      <div class="details-grid">
        <div class="detail-item"><strong>🕒 开业时间：</strong><span>\${p.established}</span></div>
        <div class="detail-item"><strong>🛣️ 线路规格：</strong><span>\${p.lineArchitecture}</span></div>
        <div class="detail-item"><strong>⚡ 晚高峰表现：</strong><span>\${p.peakPerformance}</span></div>
        <div class="detail-item"><strong>🔓 解锁支持：</strong><span>\${p.unlockMatrix}</span></div>
      </div>
      <p class="details-overview"><strong>机场简介：</strong>\${p.overview}</p>
      <div class="details-pros-cons">
        <div><strong>✓ 核心亮点：</strong>\${(p.pros || []).join('；')}</div>
        <div><strong>ⓘ 选购提示：</strong>\${(p.cons || []).join('；') || p.limitation}</div>
      </div>
      <div class="details-cta">
        <a class="text-link" href="review-\${p.id}.html">📖 查看【\${p.name}】完整独立深度测评报告 <span>→</span></a>
      </div>
    </div>
  </article>\`;
}

function renderProviders(category = 'all') {
  const vpnList = document.querySelector('#vpn-list');
  if (!vpnList) return;
  const list = providers.filter(p => category === 'all' || p.categories.includes(category));
  vpnList.innerHTML = list.map(p => card(p, providers.indexOf(p))).join('');
  const resultCount = document.querySelector('#result-count');
  if (resultCount) {
    resultCount.textContent = category === 'all' 
      ? \`精选 \${list.length} 款 VPN 专线加速服务\` 
      : \`找到 \${list.length} 款匹配服务\`;
  }
  document.querySelectorAll('[data-filter]').forEach(b => {
    const active = b.dataset.filter === category;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
}

// 首页榜单交互初始化
if (document.querySelector('#vpn-list')) {
  renderProviders(new URLSearchParams(location.search).get('category') || 'all');

  document.querySelectorAll('[data-filter]').forEach(b => {
    b.addEventListener('click', () => renderProviders(b.dataset.filter));
  });

  document.querySelectorAll('[data-filter-link]').forEach(a => {
    a.addEventListener('click', e => {
      const p = new URLSearchParams(location.search);
      if (!p.get('page') && !p.get('review')) {
        e.preventDefault();
        renderProviders(a.dataset.filterLink);
        document.querySelector('#rankings')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 全局 details-toggle 抽屉展开/收起代理
document.addEventListener('click', e => {
  const b = e.target.closest('.details-toggle');
  if (!b) return;
  const content = document.getElementById(b.getAttribute('aria-controls'));
  if (!content) return;
  content.hidden = !content.hidden;
  b.setAttribute('aria-expanded', String(!content.hidden));
  b.textContent = content.hidden ? '更多细节 ⌄' : '收起细节 ⌃';
});

// 全局即时搜索功能
const searchDialog = document.querySelector('#search-dialog');
const searchInput = document.querySelector('#search-input');

function search(query = '') {
  if (!searchDialog || !searchInput) return;
  const term = query.trim().toLowerCase();
  const records = [
    ...providers.map(p => ({
      title: p.name + ' (' + p.lineType + ' · ' + p.protocol + ')',
      text: p.name + ' ' + p.pitch + ' ' + p.overview + ' ' + p.lineArchitecture + ' ' + p.peakPerformance + ' ' + p.established + ' ' + p.tags.join(' ') + ' ' + p.categories.join(' ') + ' ' + (p.coupon || '') + ' ' + p.price,
      href: `review-\${p.id}.html`,
      kind: '专线评测'
    })),
    ...standaloneArticles.map(a => ({
      title: a.title,
      text: a.text,
      href: a.href,
      kind: a.kind
    }))
  ];
  const matches = term ? records.filter(r => (r.title + ' ' + r.text).toLowerCase().includes(term)) : records.slice(0, 6);
  const box = document.querySelector('#search-results');
  if (!box) return;
  box.replaceChildren();
  if (!matches.length) {
    const p = document.createElement('p');
    p.className = 'dialog-hint';
    p.textContent = \`未找到“\${query}”相关专线服务，请尝试搜索“闪电鼠”、“IEPL”、“8元”、“Netflix”等关键词。\`;
    box.append(p);
  }
  matches.forEach(r => {
    const a = document.createElement('a');
    a.className = 'search-result';
    a.href = r.href;
    const title = document.createElement('span');
    title.textContent = r.title;
    const kind = document.createElement('small');
    kind.textContent = r.kind + ' ↗';
    a.append(title, kind);
    box.append(a);
  });
}

if (searchDialog && searchInput) {
  document.querySelectorAll('.search-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      searchInput.value = '';
      search();
      searchDialog.showModal();
      searchInput.focus();
    });
  });

  searchInput.addEventListener('input', () => search(searchInput.value));

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchDialog.open) searchDialog.close();
      else {
        searchInput.value = '';
        search();
        searchDialog.showModal();
        searchInput.focus();
      }
    }
  });
}

document.querySelectorAll('dialog').forEach(d => {
  d.querySelector('.close-dialog')?.addEventListener('click', () => d.close());
  d.addEventListener('click', e => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const open = document.querySelector('dialog[open]');
    if (open) {
      e.preventDefault();
      open.close();
    }
  }
}, true);

document.querySelectorAll('[data-info="disclosure"]').forEach(btn => {
  btn.addEventListener('click', () => document.querySelector('#info-dialog')?.showModal());
});

const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', e => {
    const nav = document.querySelector('#main-nav');
    if (!nav) return;
    const open = nav.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
    e.currentTarget.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  });
}

document.querySelectorAll('#main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('#main-nav')?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
});

const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.querySelector('#newsletter-message');
    if (msg) msg.textContent = '订阅成功！我们将在有最新优惠与节点动态时通知你。';
    e.currentTarget.reset();
  });
}

// 移动端推荐栏自动观察
const bar = document.querySelector('.mobile-recommendation');
const hero = document.querySelector('.hero');
if (bar && hero) {
  new IntersectionObserver(entries => {
    bar.hidden = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(hero);
}

// 渲染单个服务商深度测评长文函数
function generateReviewHtml(p) {
  const couponNotice = p.coupon 
    ? \`<div class="article-notice" style="border-left-color:#26704f;background:#f0f9f3;color:#1d663c;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <span><strong>专属立减优惠码：</strong>在结算订购时输入 <b>\${p.coupon}</b> 即可直接抵扣折扣！</span>
        <button class="discount copyable" style="padding:4px 12px;font-size:12px;" onclick="copyCoupon('\${p.coupon}', this)">复制优惠码 <b>\${p.coupon}</b></button>
      </div>\` 
    : \`<div class="article-notice">当前套餐享受官方特惠直购价格，免优惠码直接下单。</div>\`;

  return \`
    <span class="section-kicker">VPN IN-DEPTH REVIEW · 深度专线评测报告</span>
    <h1>\${p.name}：\${p.subtitle}</h1>
    <p class="article-lead">\${p.pitch}</p>
    \${couponNotice}

    <div class="detail-metrics">
      <div class="metric">综合评分<b>\${p.rating} / 10</b></div>
      <div class="metric">实测下载速率<b>\${p.speed} Mbps</b></div>
      <div class="metric">起步价格<b>¥\${p.price} / 月</b></div>
    </div>

    <div class="review-quick-box">
      <div class="review-quick-item"><strong>🕒 开业时间 / 资历：</strong>\${p.established}</div>
      <div class="review-quick-item"><strong>🛣️ 骨干线路架构：</strong>\${p.lineArchitecture}</div>
      <div class="review-quick-item"><strong>⚡ 晚高峰实测表现：</strong>\${p.peakPerformance}</div>
      <div class="review-quick-item"><strong>💻 支持客户端：</strong>\${p.clientSupport}</div>
      <div class="review-quick-item"><strong>🔓 流媒体/AI 解锁：</strong>\${p.unlockMatrix}</div>
      <div class="review-quick-item"><strong>🌐 节点规模与覆盖：</strong>\${p.servers}，覆盖 \${p.countries}</div>
    </div>

    <h2>一、机场简介与核心定位</h2>
    <p>\${p.overview}</p>
    <p>\${p.detail}</p>

    <h2>二、线路架构与晚高峰抗压实测</h2>
    <p><strong>线路架构：</strong>\${p.lineArchitecture}。区别于普通公网中转或廉价直连线路，专线采用内网或物理专线传输，不受晚高峰国际出口公网堵塞与网络波动影响。</p>
    <p><strong>晚高峰实测表现（20:00 - 23:00）：</strong>\${p.peakPerformance}。在全国骨干网最高负荷时段实测，依然能够保持零丢包、低抖动与大吞吐，4K/8K 视频即点即开，拖动进度条无需缓冲等待。</p>

    <h2>三、流媒体与主流 AI 生产力解锁矩阵</h2>
    <p><strong>实测解锁：</strong>\${p.unlockMatrix}。</p>
    <p>经由我们分布于不同宽带环境的持续监控测试，该节点出口拥有优质的原生 IP 池，能完美绕过流媒体版权封锁与主流 AI 工具（ChatGPT / Claude / Midjourney）的风控拦截，访问不弹人机验证。</p>

    <h2>四、优缺点总结与选购提示</h2>
    <div class="pros-cons-box">
      <div class="pros-box">
        <h3>✓ 核心优势</h3>
        <ul>
          \${(p.pros || []).map(item => \`<li>\${item}</li>\`).join('')}
        </ul>
      </div>
      <div class="cons-box">
        <h3>ⓘ 选购建议与注意事项</h3>
        <ul>
          \${(p.cons || []).map(item => \`<li>\${item}</li>\`).join('')}
          <li>\${p.limitation}</li>
        </ul>
      </div>
    </div>

    <h2>五、客户端支持与配置指引</h2>
    <p>全面兼容：\${p.clientSupport}。</p>
    <p>购买后在服务商用户中心一键复制“订阅链接”，导入客户端后即可同步全球节点列表。支持国内外智能分流规则，海外流量走专线代理，国内流量直连不减速。</p>

    <div style="margin-top:35px;display:flex;gap:15px;align-items:center;flex-wrap:wrap">
      <a class="button button-primary" href="\${p.url}" target="_blank" rel="nofollow sponsored noopener noreferrer">访问 \${p.name} 官网（附专属优惠码） ↗</a>
      <a class="text-link" href="methodology.html">阅读评测标准与方法论 →</a>
    </div>
  \`;
}

// 1. review.html 独立动态评测渲染
const dynamicReviewBox = document.querySelector('#dynamic-review-box');
if (dynamicReviewBox) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'shandianshu';
  const p = providers.find(item => item.id === id) || providers[0];
  document.title = \`\${p.name} 深度专线评测与测速报告 — 翻墙怪 VPN Insight\`;
  dynamicReviewBox.innerHTML = generateReviewHtml(p);
}

// 2. index.html 的旧版兼容 SPA 路由（如有旧链接访问 index.html?review=xxx）
const params = new URLSearchParams(location.search);
const reviewParam = params.get('review');
if (reviewParam && document.querySelector('#detail-page')) {
  const detail = document.querySelector('#detail-page');
  const home = document.querySelector('#home-page');
  const p = providers.find(item => item.id === reviewParam);
  if (p) {
    if (home) home.hidden = true;
    detail.hidden = false;
    document.title = \`\${p.name} 深度评测与专线解析 — 翻墙怪 VPN Insight\`;
    detail.innerHTML = '<a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>' + generateReviewHtml(p);
  }
}
`;

fs.writeFileSync('js/app.js', fileContent, 'utf8');
console.log('Successfully generated updated js/app.js');
