const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { getHeader, getFooter, countChineseChars, rootDir } = require('./ai-common.cjs');

console.log('=== 开始构建博客资讯 10 篇 SEO 主题集群独立文章与路由 ===');

// 1. 定义 10 篇长尾文章的基础元数据
const articles = [
  {
    id: 1,
    slug: 'cheap-vpn-airport-recommendation',
    category: 'budget',
    categoryName: '💰 性价比推荐',
    title: '2026 高性价比平价机场推荐：月付 10 元左右稳定专线实测对比',
    metaDesc: '预算有限如何挑选稳定不跑路的平价专线？深度横评月付 8~15 元平价机场，实测晚高峰 YouTube 4K 测速与丢包率，揭秘年付 9.9 超售套路，推荐月付支持的真 IEPL 专线首选。',
    readTime: '8 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['平价首选', '月付 8 元起', 'IEPL 专线', '性价比实测']
  },
  {
    id: 2,
    slug: 'best-vpn-for-chatgpt-claude',
    category: 'ai-office',
    categoryName: '🤖 AI与办公',
    title: '2026 适合 ChatGPT 与 Claude 的纯净 IP 专线推荐：防降智不封号实测',
    metaDesc: '告别 GPT-4o 静默降智（De-ranking）与 Claude 连坐封号！全面评测主流专线出口 IP 纯净度（Fraud Score），详解家庭住宅原生 ISP 节点选购、WebRTC 防泄漏与分流实操。',
    readTime: '9 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['ChatGPT-4o', 'Claude 3.5', '原生住宅 IP', '防降智指南']
  },
  {
    id: 3,
    slug: 'streaming-4k-netflix-vpn-guide',
    category: 'streaming-gaming',
    categoryName: '🎬 流媒体与游戏',
    title: '2026 奈飞 Netflix 与 Disney+ 4K 秒开机场推荐：全节点原生解锁评测',
    metaDesc: '彻底告别“检测到代理”报错与 4K 画质降级！实测评测主流专线机场对 Netflix 美/日/港/韩全区与 Disney+ 的原生住宅 IP 解锁率，提供 Apple TV 与电视盒子大屏分流配置方案。',
    readTime: '8 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['Netflix 4K', 'Disney+', '全区解锁', 'Apple TV 分流']
  },
  {
    id: 4,
    slug: 'ios-shadowrocket-best-nodes',
    category: 'ai-office budget',
    categoryName: '📱 苹果 iOS 生态',
    title: '2026 苹果 iOS 小火箭（Shadowrocket）最佳配套机场与订阅节点推荐',
    metaDesc: 'iPhone 与 iPad 端小火箭订阅节点选购全书，涵盖订阅链接一键导入、分流规则配置、晚高峰自动测速与去广告规则。',
    readTime: '7 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['Shadowrocket', 'iOS 节点', '一键导入', '分流规则']
  },
  {
    id: 5,
    slug: 'pc-mac-clash-verge-vpn',
    category: 'ai-office',
    categoryName: '💻 PC/Mac 办公',
    title: '2026 Windows 与 macOS 电脑端高速 VPN 推荐：Clash Verge 专线配置指南',
    metaDesc: 'PC 桌面办公必备，详解 Clash Verge Rev 与 Mihomo 内核配套节点选择、TUN 虚拟网卡开启、Merge 脚本覆写与开机自启调优。',
    readTime: '8 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['Clash Verge Rev', 'TUN 模式', '桌面办公', '开发者代理']
  },
  {
    id: 6,
    slug: 'cross-border-ecommerce-vpn',
    category: 'ai-office',
    categoryName: '🌐 跨境电商商务',
    title: '2026 跨境电商与外贸办公专用 VPN 推荐：TikTok 运营与独立站低延迟线路',
    metaDesc: '专为亚马逊、Shopify 独立站、TikTok 跨国直播与外贸客户沟通打造，评测固定住宅 IP、防关联机制与大文件传输专线。',
    readTime: '9 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['TikTok 运营', '跨境电商', '独立站', '固定住宅 IP']
  },
  {
    id: 7,
    slug: 'low-latency-gaming-iepl-vpn',
    category: 'streaming-gaming',
    categoryName: '🎮 电竞游戏加速',
    title: '2026 晚高峰不卡顿的 IEPL 专线机场推荐：Steam 联机与外服低延迟实测',
    metaDesc: 'Steam、Apex、Valorant 外服玩家救星，对比公网中转与物理 IEPL 专线的网络抖动与丢包率，评测亚服 30ms 低延迟稳定方案。',
    readTime: '7 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['游戏专线', 'Steam 联机', '低延迟 30ms', '晚高峰零丢包']
  },
  {
    id: 8,
    slug: 'vless-reality-trojan-stable-vpn',
    category: 'security-guide',
    categoryName: '🛡️ 协议防封技术',
    title: '2026 敏感时期依然稳定的 VLESS Reality 与 Trojan 协议机场推荐清单',
    metaDesc: '特殊敏感时期总断流？深度剖析 VLESS Reality 证书借用伪装技术与 Trojan 协议，推荐抗封锁能力最强的稳定应急节点清单。',
    readTime: '8 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['VLESS Reality', 'Trojan 协议', '抗封锁', '敏感期稳定']
  },
  {
    id: 9,
    slug: 'avoid-scam-vpn-buying-guide',
    category: 'security-guide',
    categoryName: '⚠️ 新手避坑指南',
    title: '2026 新手买 VPN 机场防跑路避坑指南：如何识别真专线与假中转？',
    metaDesc: '揭露低价年付 29 元跑路机场的底层收割套路，教你通过入口 IP、路由追踪 mtr 与真实物理专线抓包鉴别真假 IEPL 服务商。',
    readTime: '8 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['防跑路', '假中转识别', 'MTR 路由追踪', '避坑铁律']
  },
  {
    id: 10,
    slug: 'high-bandwidth-pay-as-you-go-vpn',
    category: 'budget',
    categoryName: '💰 大流量与按量',
    title: '2026 大流量不限速与按量付费机场推荐：多设备共用与高性价比套餐解析',
    metaDesc: '偶尔出差或轻度使用不想按月续费？大容量按量付费（不限时间）与多设备不限并发套餐深度评测与性价比横评。',
    readTime: '7 分钟阅读',
    date: '2026 年 11 月 18 日',
    tags: ['按量付费', '不限时间', '大流量包', '多设备不限并发']
  }
];

// 辅助函数：生成 JSON-LD 结构化数据
function generateJsonLd(article, faqs, fullUrl) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${fullUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": fullUrl
        },
        "headline": article.title,
        "description": article.metaDesc,
        "datePublished": "2026-11-18T08:00:00+08:00",
        "dateModified": "2026-11-18T08:00:00+08:00",
        "mainEntityOfPage": fullUrl,
        "author": {
          "@type": "Organization",
          "name": "翻墙怪 VPN Insight 评测实验室",
          "url": "https://fanqiangguai.blog"
        },
        "publisher": {
          "@type": "Organization",
          "name": "翻墙怪 VPN Insight",
          "logo": {
            "@type": "ImageObject",
            "url": "https://fanqiangguai.blog/assets/favicon.svg"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "首页",
            "item": "https://fanqiangguai.blog/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "博客资讯",
            "item": "https://fanqiangguai.blog/blog.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": fullUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${fullUrl}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// 辅助函数：生成同集群相关推荐阅读 HTML
function generateClusterRelatedHtml(currentId) {
  const others = articles.filter(a => a.id !== currentId).slice(0, 3);
  let cardsHtml = others.map(a => `
    <a href="/blog/${a.slug}" class="cluster-related-card">
      <span class="badge">${a.categoryName}</span>
      <strong>${a.title}</strong>
      <p>${a.metaDesc.substring(0, 52)}…</p>
    </a>
  `).join('');

  return `
    <div class="cluster-related-box">
      <div class="cluster-related-title">
        <span>📚</span>
        <span>SEO 主题集群 · 同栏目深度推荐阅读</span>
      </div>
      <div class="cluster-related-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

// 辅助函数：生成侧边栏 HTML (含 TOC 与核心支柱排行榜卡片)
function generateSidebarHtml(tocItems, root = '../../') {
  const tocLinks = tocItems.map(item => `<li><a href="#${item.id}">${item.text}</a></li>`).join('');
  return `
    <aside class="article-sidebar">
      <div class="article-toc">
        <div class="article-toc-title">
          <span>📑</span>
          <span>本文目录速览</span>
        </div>
        <ul class="article-toc-list">
          ${tocLinks}
        </ul>
      </div>

      <div class="article-pillar-box">
        <strong>🏆 2026 核心专线排行榜</strong>
        <p>基于全网 40+ 款专线服务晚高峰压力实测，实时汇总低至 8 元/月的 IEPL 优质方案。</p>
        <a href="${root}index.html#rankings" class="article-pillar-btn">查看核心榜单 ↗</a>
      </div>
    </aside>
  `;
}

module.exports = {
  articles,
  generateJsonLd,
  generateClusterRelatedHtml,
  generateSidebarHtml
};
