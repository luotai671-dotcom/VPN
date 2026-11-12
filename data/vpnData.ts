export interface VPNProvider {
  id: string;
  rank: number;
  name: string;
  slug: string;
  badge?: string;
  badgeColor?: 'emerald' | 'cyan' | 'purple' | 'amber';
  logoText: string;
  logoBg: string;
  rating: number; // e.g. 9.8
  reviewCount: number;
  highlightPitch: string;
  tags: string[];
  features: string[];
  metrics: {
    downloadSpeed: string; // e.g. "890 Mbps"
    speedScore: string; // "A+ (99.2%)"
    serverCount: string; // "3,200+ 台"
    countryCount: string; // "100+ 国家"
    devices: string; // "无限台设备"
    loggingPolicy: string; // "独立审计 100% 零日志"
  };
  streamingScore: string; // "解锁 30+ 地区 Netflix, Disney+, BBC"
  pricing: {
    currentPrice: string; // "$2.19"
    originalPrice: string; // "$12.95"
    billingCycle: string; // "月 / 2年付"
    discountPercent: string; // "83% OFF"
    extraBonus: string; // "赠送 3 个月"
    moneyBackDays: number; // 30
  };
  affiliateUrl: string;
  reviewUrl: string;
  categories: Array<'streaming' | 'gaming' | 'privacy' | 'budget'>;
}

export const VPN_LIST: VPNProvider[] = [
  {
    id: 'cyber-nord',
    rank: 1,
    name: 'NordVPN',
    slug: 'nordvpn-review',
    badge: '🏆 2026 年度最佳综合推荐',
    badgeColor: 'emerald',
    logoText: 'Nord',
    logoBg: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    rating: 9.8,
    reviewCount: 3820,
    highlightPitch: '极致速度与军事级加密，内置 Threat Protection Pro 威胁防护与双重数据加密。',
    tags: ['NordLynx 自研协议', '独立安全四次审计', 'RAM 纯内存无盘节点'],
    features: [
      '实测 920 Mbps+ 极速稳定连接',
      '无缝秒开 4K/8K Netflix、Disney+ 与 YouTube',
      '支持 10 台设备同时在线，支持路由插件',
      '严格驻地巴拿马，免受 14 眼情报联盟管辖'
    ],
    metrics: {
      downloadSpeed: '924 Mbps',
      speedScore: 'A+ (99.4%)',
      serverCount: '6,400+ 台',
      countryCount: '111+ 个国家',
      devices: '10 台同时在线',
      loggingPolicy: '普华永道 (PwC) 4次认证零日志'
    },
    streamingScore: '10/10 完美解锁',
    pricing: {
      currentPrice: '$2.99',
      originalPrice: '$12.99',
      billingCycle: '月 (2年计划)',
      discountPercent: '74% OFF',
      extraBonus: '限时加赠 3 个月 + Saily eSIM 流量包',
      moneyBackDays: 30
    },
    affiliateUrl: 'https://example.com/go/nordvpn?track_id=top1_hero',
    reviewUrl: '/reviews/nordvpn',
    categories: ['streaming', 'privacy', 'gaming']
  },
  {
    id: 'cyber-surfshark',
    rank: 2,
    name: 'Surfshark VPN',
    slug: 'surfshark-review',
    badge: '⚡ 性价比首选 · 不限设备数',
    badgeColor: 'cyan',
    logoText: 'Surf',
    logoBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    rating: 9.6,
    reviewCount: 2950,
    highlightPitch: '账号全家共享，单订阅支持无限设备同时连接；内置 CleanWeb 拦截广告追踪。',
    tags: ['无限设备连接', '超高性价比', '内置 GPS 虚拟定位'],
    features: [
      '单账号支持无限设备（手机、电脑、电视全覆盖）',
      '独家 Nexus 网络技术提升连接稳定性与速度',
      '内置 CleanWeb 广告、恶意软件与钓鱼网站拦截',
      '全面支持 Camouflage 伪装协议，穿透力强'
    ],
    metrics: {
      downloadSpeed: '886 Mbps',
      speedScore: 'A (96.8%)',
      serverCount: '3,200+ 台',
      countryCount: '100+ 个国家',
      devices: '无限制 (全家共享)',
      loggingPolicy: '德勤 (Deloitte) 验证无日志'
    },
    streamingScore: '9.8/10 稳定畅看',
    pricing: {
      currentPrice: '$2.19',
      originalPrice: '$15.45',
      billingCycle: '月 (2年计划)',
      discountPercent: '86% OFF',
      extraBonus: '额外免费赠送 3 个月时长',
      moneyBackDays: 30
    },
    affiliateUrl: 'https://example.com/go/surfshark?track_id=top2_budget',
    reviewUrl: '/reviews/surfshark',
    categories: ['budget', 'streaming', 'privacy']
  },
  {
    id: 'cyber-express',
    rank: 3,
    name: 'ExpressVPN',
    slug: 'expressvpn-review',
    badge: '👑 顶级稳定体验与超低延迟',
    badgeColor: 'purple',
    logoText: 'Express',
    logoBg: 'bg-gradient-to-br from-rose-600 to-red-700',
    rating: 9.5,
    reviewCount: 4110,
    highlightPitch: '行业老牌标杆，独创 Lightway 极速安全协议，在全球受限网络环境下稳定性无出其右。',
    tags: ['自研 Lightway 协议', '105 国海量节点', '高敏网络深度穿透'],
    features: [
      '自主研发 Lightway 协议，连接建立速度 <0.8秒',
      '覆盖全球 105 个国家，拥有超稀有地区住宅 IP 节点',
      'TrustedServer 纯 RAM 内存技术，每次重启彻底擦除',
      '支持专用路由器固件 Aircove，一键保护全屋智能设备'
    ],
    metrics: {
      downloadSpeed: '870 Mbps',
      speedScore: 'A (95.5%)',
      serverCount: '3,000+ 台',
      countryCount: '105+ 个国家',
      devices: '8 台同时在线',
      loggingPolicy: 'KPMG 独立审计零日志记录'
    },
    streamingScore: '9.9/10 极速秒播',
    pricing: {
      currentPrice: '$4.99',
      originalPrice: '$12.95',
      billingCycle: '月 (2年计划)',
      discountPercent: '61% OFF',
      extraBonus: '黑五特别返场特惠包',
      moneyBackDays: 30
    },
    affiliateUrl: 'https://example.com/go/expressvpn?track_id=top3_premium',
    reviewUrl: '/reviews/expressvpn',
    categories: ['streaming', 'gaming', 'privacy']
  },
  {
    id: 'cyber-proton',
    rank: 4,
    name: 'Proton VPN',
    slug: 'protonvpn-review',
    badge: '🛡️ 瑞士隐私极客与开源透明',
    badgeColor: 'cyan',
    logoText: 'Proton',
    logoBg: 'bg-gradient-to-br from-purple-700 to-indigo-900',
    rating: 9.3,
    reviewCount: 1840,
    highlightPitch: '瑞士 CERN 科学家团队打造，所有客户端代码 100% 开源，Secure Core 防物理拦截。',
    tags: ['瑞士严苛隐私法', '全客户端开源', 'Secure Core 架构'],
    features: [
      '所有客户端应用开源并经严格第三方独立代码审计',
      'Secure Core 多跳路由：流量经由冰岛与瑞士地下防空洞机房',
      '内置 NetShield 广告与恶意域名防护系统',
      '提供无速度限制的免费版供长期体验'
    ],
    metrics: {
      downloadSpeed: '810 Mbps',
      speedScore: 'B+ (91.2%)',
      serverCount: '8,600+ 台',
      countryCount: '112+ 个国家',
      devices: '10 台同时在线',
      loggingPolicy: '瑞士法律保障 + Securitum 审计'
    },
    streamingScore: '9.2/10 支持主流平台',
    pricing: {
      currentPrice: '$3.59',
      originalPrice: '$9.99',
      billingCycle: '月 (2年付)',
      discountPercent: '64% OFF',
      extraBonus: '附赠 Proton Mail 隐私套装试用',
      moneyBackDays: 30
    },
    affiliateUrl: 'https://example.com/go/protonvpn?track_id=top4_privacy',
    reviewUrl: '/reviews/protonvpn',
    categories: ['privacy', 'gaming']
  },
  {
    id: 'cyber-pia',
    rank: 5,
    name: 'Private Internet Access (PIA)',
    slug: 'pia-review',
    badge: '💰 超大服务器集群与法庭实证',
    badgeColor: 'amber',
    logoText: 'PIA',
    logoBg: 'bg-gradient-to-br from-emerald-600 to-green-700',
    rating: 9.1,
    reviewCount: 2200,
    highlightPitch: '全球拥有超过 35,000 台服务器，曾两次在美联邦法庭实战证明无任何日志可供提供。',
    tags: ['法庭实证无日志', '全美50州节点', '无限设备支持'],
    features: [
      '支持端口转发 (Port Forwarding)，P2P 下载与种子利器',
      '全美 50 个州全覆盖，精准解锁区域体育赛事直播',
      '高级分流隧道 (Split Tunneling) 与专用独享 IP 可选',
      '全平台客户端开源，支持复杂自定义 DNS 配置'
    ],
    metrics: {
      downloadSpeed: '780 Mbps',
      speedScore: 'B+ (89.5%)',
      serverCount: '35,000+ 台',
      countryCount: '91+ 个国家',
      devices: '无限台设备',
      loggingPolicy: '美国法庭实证 0 记录 + 德勤审计'
    },
    streamingScore: '9.0/10 流媒体专线',
    pricing: {
      currentPrice: '$2.03',
      originalPrice: '$11.95',
      billingCycle: '月 (3年+3月)',
      discountPercent: '83% OFF',
      extraBonus: '赠送免费邮件泄露监视器',
      moneyBackDays: 30
    },
    affiliateUrl: 'https://example.com/go/pia?track_id=top5_servers',
    reviewUrl: '/reviews/pia',
    categories: ['budget', 'privacy']
  }
];

export const TRUST_STATS = [
  { label: '实测全球 VPN 品牌', value: '50+' },
  { label: '年累计测速小时数', value: '2,800+' },
  { label: '测试节点覆盖地区', value: '110+ 地区' },
  { label: '读者联盟返利与独家折扣', value: '最高省 86%' }
];

