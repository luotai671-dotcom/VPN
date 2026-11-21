export interface VPNProvider {
  id: string;
  rank: number;
  isPrimary?: boolean;
  name: string;
  slug: string;
  badge?: string;
  mark: string;
  color?: string;
  subtitle: string;
  established: string;
  lineArchitecture: string;
  peakPerformance: string;
  clientSupport: string;
  unlockMatrix: string;
  rating: number;
  pitch: string;
  overview: string;
  affiliateUrl: string;
  coupon?: string;
  startingPrice: number;
  currency: string;
  billingCycle: string;
  lineType: string;
  protocol: string;
  speed: number;
  servers: string;
  countries: string;
  discount: string;
  categories: Array<'streaming' | 'gaming' | 'privacy' | 'budget'>;
  tags: string[];
  pros: string[];
  cons: string[];
  detail: string;
  limitation: string;
}

export const VPN_SERVICES: VPNProvider[] = [
  {
    "id": "shandianshu",
    "rank": 1,
    "isPrimary": true,
    "name": "闪电鼠",
    "badge": "🏆 2026 年度主推综合首选",
    "mark": "⚡",
    "color": "#f59e0b",
    "subtitle": "年度主推 · 综合第一",
    "established": "2022年春",
    "lineArchitecture": "广州/上海/北京 BGP 入口 + IEPL 纯内网双专线（智能容灾倒换）",
    "peakPerformance": "20:00-23:00 4K/8K 码率稳定 220,000+ Kbps，亚服延迟 28~35ms，丢包率 0%",
    "clientSupport": "Clash 全系列, Sing-box, Shadowrocket, Quantumult X, Surge, v2rayN",
    "unlockMatrix": "Netflix 全区、Disney+、YouTube Premium、TikTok、ChatGPT-4o、Claude 3.5 原生解锁",
    "rating": 9.9,
    "pitch": "IEPL + 内网专线极速直连，VLESS 协议全场景低延迟，4K/8K 追剧秒开，超高性价比首选。",
    "overview": "全能型全场景旗舰专线，2026 年度综合主推之选。采用独享企业级 IEPL 专网，全链路 VLESS 现代协议无感加解密。兼顾日常 4K 流媒体、跨境远程协同以及外服游戏联机。起步资费低至 8 元/月，是全网性价比与硬核性能的典范。",
    "affiliateUrl": "/go/shandianshu",
    "coupon": "sd88",
    "startingPrice": 8,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL+内网专线",
    "protocol": "VLESS",
    "speed": 980,
    "servers": "120+ 节点",
    "countries": "28+ 地区",
    "discount": "优惠码 sd88",
    "categories": [
      "streaming",
      "gaming",
      "privacy",
      "budget"
    ],
    "tags": [
      "IEPL+内网专线",
      "VLESS 协议",
      "优惠码 sd88",
      "起步 8元/月"
    ],
    "pros": [
      "8 元/月起步超高性价比，支持灵活月付",
      "全节点部署 VLESS 协议，抗封锁与并发吞吐极佳",
      "晚高峰双专线冗余备份，4K/8K 极速无卡顿",
      "流媒体与主流 AI 工具原生 IP 完美解锁"
    ],
    "cons": [
      "热门节点在节假日用量激增，建议开启客户端自动测速优选"
    ],
    "detail": "全节点采用 IEPL 纯内网专线直连，免受公网拥堵影响。全面支持 VLESS 现代协议，适配 Clash、v2rayN、Sing-box、Shadowrocket 等主流客户端。流媒体解锁支持 Netflix、Disney+、YouTube 4K/8K 与 ChatGPT。",
    "limitation": "新用户注册订购时在结账页面输入专属优惠码 sd88 可享专属立减优惠。",
    "slug": "shandianshu-review"
  },
  {
    "id": "dalaoyun",
    "rank": 2,
    "isPrimary": false,
    "name": "大佬云",
    "badge": "⭐ 高稳专线 · 极佳口碑",
    "mark": "☁",
    "color": "#3b82f6",
    "subtitle": "高稳专线 · 极佳口碑",
    "established": "2021年秋（运营超4年老牌）",
    "lineArchitecture": "华东/华南高规格 BGP 骨干接入 + 企业级金融 IEPL 专线",
    "peakPerformance": "晚高峰吞吐率 99.8%，港新延迟 32ms，4K 拖拽秒加载，零限速断流",
    "clientSupport": "Clash 全平台, Sing-box, Shadowrocket, Surge, v2rayN",
    "unlockMatrix": "Netflix 港美日台韩区、Disney+、Hulu、ChatGPT、Midjourney 原生解锁",
    "rating": 9.8,
    "pitch": "全 IEPL 高速专线，VLESS 协议保障，晚高峰稳定无卡顿，性价比与稳定性俱佳。",
    "overview": "行业资深老牌高稳专线机场。主打长久运营、深厚信誉与极高 SLA（99.99%），运维团队经验丰富。适合重视线路稳定、反感频繁更换节点与配置的商务办公及长期使用用户。",
    "affiliateUrl": "/go/dalaoyun",
    "coupon": "dly88",
    "startingPrice": 8,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 950,
    "servers": "90+ 节点",
    "countries": "22+ 地区",
    "discount": "优惠码 dly88",
    "categories": [
      "streaming",
      "privacy"
    ],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 dly88",
      "起步 8元/月"
    ],
    "pros": [
      "运营超 4 年老牌团队，抗风险能力强，跑路风险趋近于零",
      "线路 SLA 达到 99.99%，长期使用极度稳定省心",
      "优质原生商用 IP，几乎不弹 Google 人机验证"
    ],
    "cons": [
      "基础入门套餐流量适中，大流量下载建议选高阶套餐"
    ],
    "detail": "优质 IEPL 专线接入，骨干网直连，抗封锁能力强。节点覆盖港、台、日、美、新等主流流媒体区域，多平台客户端配置一键导入。",
    "limitation": "建议在结算页面填入专属优惠码 dly88 获取折扣立减。",
    "slug": "dalaoyun-review"
  },
  {
    "id": "liulianyun",
    "rank": 3,
    "isPrimary": false,
    "name": "榴莲云",
    "badge": "🎬 流媒体专精推荐",
    "mark": "◈",
    "color": "#10b981",
    "subtitle": "流媒体专精 · 高速畅享",
    "established": "2023年春",
    "lineArchitecture": "深圳/东莞 BGP 优质入口 + 原生住宅 IP 专线过境",
    "peakPerformance": "晚高峰大带宽持续跑满，4K/8K 视频播放零缓冲，单线测速达 935 Mbps",
    "clientSupport": "Shadowrocket, Clash Verge, Sing-box, v2rayN, Loon",
    "unlockMatrix": "支持 Netflix 30+ 地区完整片库、Disney+、HBO Max、动画疯、ChatGPT",
    "rating": 9.7,
    "pitch": "纯 IEPL 专线接入，原生流媒体 IP 解锁，视频追剧与大文件下载流畅省心。",
    "overview": "专注流媒体解锁与大流量影音娱乐的特色专精专线。全面部署昂贵的流媒体原生家庭住宅 IP，针对 Netflix、Disney+、HBO Max、巴哈姆特动画疯等严控 IP 的平台做深度逆向分流优化，追剧党首选。",
    "affiliateUrl": "/go/liulianyun",
    "coupon": "ll88",
    "startingPrice": 8,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 935,
    "servers": "85+ 节点",
    "countries": "20+ 地区",
    "discount": "优惠码 ll88",
    "categories": [
      "streaming",
      "budget"
    ],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 ll88",
      "起步 8元/月"
    ],
    "pros": [
      "原生流媒体住宅 IP 解锁率行业顶尖，告别代理受阻报错",
      "流量配额充沛，大流量 4K 追剧性价比极其出色",
      "节点分流精细，流媒体流量自动分流，不浪费宝贵带宽"
    ],
    "cons": [
      "游戏加速节点相对较少，核心优势主要聚焦在影音视听"
    ],
    "detail": "针对主流流媒体服务全面优化，独享带宽不限速，全节点支持 VLESS 协议与 TLS 加密传输，兼顾安全性与超高传输带宽。",
    "limitation": "新购套餐结算时请使用优惠码 ll88 享受立减优惠。",
    "slug": "liulianyun-review"
  },
  {
    "id": "shenxing",
    "rank": 4,
    "isPrimary": false,
    "name": "神行加速",
    "badge": "⚡ 极速穿梭 · 电竞低延迟",
    "mark": "⚡",
    "color": "#ef4444",
    "subtitle": "极速穿梭 · 电竞低延迟",
    "established": "2022年底",
    "lineArchitecture": "专设电竞专网入口 + 物理直连 IEPL 短路由（针对 UDP 优化）",
    "peakPerformance": "外服网络抖动 < 1.5ms，丢包率稳定 0%，亚服平均联机 Ping 低至 26ms",
    "clientSupport": "Clash Verge Rev（TUN 虚拟网卡模式）, Sing-box, v2rayN, Netch",
    "unlockMatrix": "Steam 跨区商店、PlayStation Network、Discord 高清语音、Twitch 4K 直播",
    "rating": 9.6,
    "pitch": "专为电竞游戏与高并发设计，超低延迟 IEPL 专线，晚高峰外服游戏不丢包。",
    "overview": "专为硬核电竞玩家与高实时性通讯设计的极客加速服务。优化路由拓扑跳数，针对 Steam、Apex Legends、Valorant、EA FC、任天堂 Switch 及索尼 PS5 等主机外服联机做深度 QOS 调度，延迟表现比肩专业硬件加速盒。",
    "affiliateUrl": "/go/shenxing",
    "coupon": "sx0077",
    "startingPrice": 15,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 960,
    "servers": "100+ 节点",
    "countries": "25+ 地区",
    "discount": "优惠码 sx0077",
    "categories": [
      "gaming"
    ],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 sx0077",
      "起步 15元/月"
    ],
    "pros": [
      "专设游戏电竞低延迟通道，告别丢包与跳 Ping",
      "全天候 QOS 优先级带宽调度，晚高峰游戏联机稳如泰山",
      "完美支持 Discord 实时连麦降噪与游戏语音"
    ],
    "cons": [
      "专注低延迟专线，成本较高，起步资费相对普通机场略高"
    ],
    "detail": "采用企业级 IEPL 游戏专线，针对 Steam、Epic、EA、PS5 等外服游戏联机深度优化，抖动低于 2ms，支持全平台订阅一键同步。",
    "limitation": "付款页输入优惠码 sx0077 即可享受专属折扣价格。",
    "slug": "shenxing-review"
  },
  {
    "id": "yunjiexian",
    "rank": 5,
    "isPrimary": false,
    "name": "云界线",
    "badge": "🌐 无界互联 · 商务级稳定",
    "mark": "☵",
    "color": "#8b5cf6",
    "subtitle": "无界互联 · 商务级稳定",
    "established": "2022年夏",
    "lineArchitecture": "上海/北京金融级机房 BGP 接入 + 企业级互联 IEPL 专线",
    "peakPerformance": "全天候 SLA 99.95%，晚高峰跨国生产力工具极稳，SSH 保持长连不中断",
    "clientSupport": "Clash Verge, Sing-box, Surge, Shadowrocket, Quantumult X",
    "unlockMatrix": "Google Workspace、GitHub、AWS/GCP 控制台、ChatGPT Plus、Claude Pro、Notion",
    "rating": 9.5,
    "pitch": "IEPL 稳定骨干隧道，跨国办公与海量学术/开发资源访问无阻，VLESS 坚实加密。",
    "overview": "定位高端跨境商务协同、学术研究与外企开发者生产力工具。注重连接的绝对安全、高合规与纯净出口 IP，杜绝因黑产滥用导致的 Google 学术搜索频繁弹人机验证，海外资产访问畅通无阻。",
    "affiliateUrl": "/go/yunjiexian",
    "coupon": "yjx888",
    "startingPrice": 15,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 920,
    "servers": "80+ 节点",
    "countries": "26+ 地区",
    "discount": "优惠码 yjx888",
    "categories": [
      "gaming",
      "privacy"
    ],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 yjx888",
      "起步 15元/月"
    ],
    "pros": [
      "商用级纯净出口 IP，告别 Google 频繁人机验证困扰",
      "支持开发环境 SSH / 远程桌面长久保活连接",
      "全链路高强度 TLS 加密，保障企业和个人敏感数据安全"
    ],
    "cons": [
      "严禁 BT/PT 等版权下载，违规可能触发账户限流保护"
    ],
    "detail": "专为跨境办公、海外社交、学术研究打造的稳定专线通道，SLA 达到 99.9%，全节点高可用热备，确保全天候不掉线。",
    "limitation": "购买任何套餐时请记得填入专属优惠码 yjx888 享受折扣。",
    "slug": "yunjiexian-review"
  },
  {
    "id": "huanqiuti",
    "rank": 6,
    "isPrimary": false,
    "name": "环球梯",
    "badge": "💰 双专线融合 · 性价比王者",
    "mark": "🌐",
    "color": "#06b6d4",
    "subtitle": "双专线融合 · 性价比王者",
    "established": "2023年夏",
    "lineArchitecture": "内网专线 + IEPL 专线双通道智能动态路由调度",
    "peakPerformance": "晚高峰自研智能切流避开拥塞，4K 缓冲小于 0.6 秒，可用率 98.6%",
    "clientSupport": "全平台一键快速导入, Clash, Sing-box, Shadowrocket",
    "unlockMatrix": "主流流媒体 Netflix、YouTube 4K、TikTok、ChatGPT、Instagram",
    "rating": 9.4,
    "pitch": "内网专线 + IEPL 智能双选，8元起步超低门槛，覆盖全球主要地区节点。",
    "overview": "主打“双专线融合架构”的超高性价比轻量级专线。通过内网中继与企业 IEPL 智能融合，把一线专线体验的门槛拉低至 8 元/月，让预算有限的新手也能告别慢速卡顿的公共网络。",
    "affiliateUrl": "/go/huanqiuti",
    "coupon": "hq66",
    "startingPrice": 8,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "内网专线+IEPL",
    "protocol": "VLESS",
    "speed": 910,
    "servers": "75+ 节点",
    "countries": "30+ 地区",
    "discount": "优惠码 hq66",
    "categories": [
      "budget"
    ],
    "tags": [
      "内网专线+IEPL",
      "VLESS 协议",
      "优惠码 hq66",
      "起步 8元/月"
    ],
    "pros": [
      "双专线架构智能容灾，性价比在同价位中非常突出",
      "8 元低门槛月付体验，新手尝鲜毫无后顾之忧",
      "全球节点地区分布广泛，满足多元日常浏览需求"
    ],
    "cons": [
      "冷门偏远地区节点较少，主要集中于港台日美新等主力区域"
    ],
    "detail": "融合了内网专线和企业级 IEPL 链路，性价比极高。支持多国 IP 自由切换，流媒体解锁与日常浏览两相宜。",
    "limitation": "结账时填写优惠码 hq66 享受特惠价格。",
    "slug": "huanqiuti-review"
  },
  {
    "id": "jilianyun",
    "rank": 7,
    "isPrimary": false,
    "name": "极连云",
    "badge": "🚀 尊享品质 · 大带宽专网",
    "mark": "♾",
    "color": "#ec4899",
    "subtitle": "尊享品质 · 大带宽专网",
    "established": "2021年底",
    "lineArchitecture": "Tier-3+ 数据中心多线 BGP + 独享大带宽 IEPL 专网（最高 2.5Gbps）",
    "peakPerformance": "单节点峰值下载实测达 940 Mbps，多端百兆并发不限速，大文件极速拉取",
    "clientSupport": "Clash Verge, Sing-box, Shadowrocket, Surge, v2rayN",
    "unlockMatrix": "Netflix 原生解锁、Disney+、YouTube 4K/8K、Emby 影视库、ChatGPT",
    "rating": 9.3,
    "pitch": "高端 IEPL 专线，承诺高冗余带宽，多人多设备同时并发依然畅快如初。",
    "overview": "以“超大冗余带宽”与“不限速并发”为特色的旗舰专线服务。机房投入重金采购高规格带宽端口，适合家庭多成员共享、公司小型团队多端在线、NAS 同步或超大体积数据传输。",
    "affiliateUrl": "/go/jilianyun",
    "coupon": "jly888",
    "startingPrice": 18,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 940,
    "servers": "95+ 节点",
    "countries": "24+ 地区",
    "discount": "优惠码 jly888",
    "categories": [],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 jly888",
      "起步 18元/月"
    ],
    "pros": [
      "出口带宽储备极其雄厚，绝不人为压制用户网速",
      "允许多台设备并发连接，家庭与小团队极佳选择",
      "对 Emby 私有影音库等大码率流媒体支持完美"
    ],
    "cons": [
      "起步资费 18 元/月，更适合对带宽吞吐有严苛要求的用户"
    ],
    "detail": "主打高带宽、低拥塞体验。机房部署于核心金融级数据中心，针对 4K 高码率视频与大文件传输提供冗余带宽支撑。",
    "limitation": "使用专属优惠码 jly888 即可享优惠折扣。",
    "slug": "jilianyun-review"
  },
  {
    "id": "guangshuyun",
    "rank": 8,
    "isPrimary": false,
    "name": "光速云",
    "badge": "🔥 IPLC 极速专线 · 极光体验",
    "mark": "☼",
    "color": "#f97316",
    "subtitle": "IPLC 纯专线 · 毫秒级直达",
    "established": "2023年中",
    "lineArchitecture": "真正纯正 IPLC 国际私有裸光纤专线，物理点对点跨境过海",
    "peakPerformance": "完全不经公网普通防火墙检测，晚高峰零干扰、零抖动，直通港日",
    "clientSupport": "Shadowrocket, Clash, Sing-box, Quantumult X, Surge",
    "unlockMatrix": "全区 Netflix、Disney+、ChatGPT、Claude、海外证券交易平台",
    "rating": 9.3,
    "pitch": "真正 IPLC 国际私有专线，不过墙直达海外，毫秒级响应，网络抖动极低。",
    "overview": "专注于纯正 IPLC 点对点专线的高端服务商。区别于普通内网中继，真正采用物理点对点租用线路，完全绕过公网任何干扰与拥堵，连接响应与私密性极佳，直购定价免除优惠码套路。",
    "affiliateUrl": "/go/guangshuyun",
    "coupon": "",
    "startingPrice": 15,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IPLC 专线",
    "protocol": "VLESS",
    "speed": 955,
    "servers": "70+ 节点",
    "countries": "18+ 地区",
    "discount": "特惠直购",
    "categories": [],
    "tags": [
      "IPLC 专线",
      "VLESS 协议",
      "免码直购",
      "起步 15元/月"
    ],
    "pros": [
      "物理级点对点 IPLC 专线，敏感时期网络稳固不破防",
      "跳数少延迟极低，海外网页秒开与金融交易响应迅速",
      "定价透明直购，无需费心寻找或计算优惠码"
    ],
    "cons": [
      "专线节点物理带宽昂贵，月度总流量配额相对固定"
    ],
    "detail": "纯正 IPLC 专线架构，完全避开公共网关干扰，连接稳定延迟低，无论是追剧、远程办公还是游戏联机体验都极其出色。",
    "limitation": "当前套餐已设为特惠价格，无需手动输入优惠码直接下单。",
    "slug": "guangshuyun-review"
  },
  {
    "id": "guangnianti",
    "rank": 9,
    "isPrimary": false,
    "name": "光年梯",
    "badge": "💡 极致省钱 · 学生/轻量首选",
    "mark": "✦",
    "color": "#14b8a6",
    "subtitle": "极致亲民 · 7元起步",
    "established": "2024年初",
    "lineArchitecture": "轻量级 IEPL 企业专线中继 + 智能高密端口复用",
    "peakPerformance": "晚高峰流畅播放 1080P/4K，实测下载稳定在 890 Mbps，无卡顿",
    "clientSupport": "Clash, v2rayN, Sing-box, Shadowrocket",
    "unlockMatrix": "YouTube 1080P/4K、Wikipedia、Google Scholar、GitHub、ChatGPT 基础版",
    "rating": 9.2,
    "pitch": "起步仅 7元/月，IEPL 高品质专线加持，花最少的预算享受高水准国际连接。",
    "overview": "行业价格“破壁者”，专为学生党与轻量级日常需求量身打造。起步月费低至 7 元，以不到一杯奶茶的价格提供稳定 IEPL 专线，解决学生查文献、日常推特社交与基础追剧痛点。",
    "affiliateUrl": "/go/guangnianti",
    "coupon": "",
    "startingPrice": 7,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "speed": 890,
    "servers": "60+ 节点",
    "countries": "16+ 地区",
    "discount": "7元低价体验",
    "categories": [],
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "起步 7元/月",
      "超值预算"
    ],
    "pros": [
      "全网罕见的 7 元极低月付专线门槛，学生党极致福音",
      "后台配置极其简洁直观，小白用户 1 分钟上手配置",
      "真实 IEPL 专线，绝非低质免费公网中转"
    ],
    "cons": [
      "7 元入门套餐流量适合轻度日常浏览，不适合大量 BT 下载"
    ],
    "detail": "全网性价比极高的入门专线选择，适合对预算敏感的学生党与轻量日常查资料用户，稳定好用，轻松解锁日常海外网站。",
    "limitation": "7 元起步基础套餐适合日常浏览与追剧，大流量需求推荐升级大流量套餐。",
    "slug": "guangnianti-review"
  },
  {
    "id": "bianyuan",
    "rank": 10,
    "isPrimary": false,
    "name": "边缘节点",
    "badge": "🛡️ 分布式边缘计算 · 极客纯净",
    "mark": "❖",
    "color": "#6366f1",
    "subtitle": "边缘计算路由 · 纯净原生",
    "established": "2022年春",
    "lineArchitecture": "全球 Anycast 边缘计算网络 + 分布式动态智能路由 + VLESS Reality",
    "peakPerformance": "智能调度至全球最近 Anycast 节点，晚高峰丢包率 < 0.2%，海外网站响应极速",
    "clientSupport": "Sing-box（全功能协议）, Clash Verge, v2rayN, Surge",
    "unlockMatrix": "TikTok 跨境电商直播、Amazon 店铺后台、ChatGPT-4o、Claude、美欧本地流媒体",
    "rating": 9.1,
    "pitch": "前沿 VLESS 协议支持，多点 Anycast 边缘接入，注重连接隐私与高并发。",
    "overview": "针对极客开发、跨境电商（Amazon、Shopee、Shopify、Etsy）出海多店铺运营定制的分布式边缘专线。拥有超多稀缺小众地区节点，IP 纯度极高，防关联与深度协议伪装能力出类拔萃。",
    "affiliateUrl": "/go/bianyuan",
    "coupon": "xk808",
    "startingPrice": 22,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "VLESS",
    "protocol": "VLESS",
    "speed": 920,
    "servers": "110+ 节点",
    "countries": "32+ 地区",
    "discount": "优惠码 xk808",
    "categories": [],
    "tags": [
      "VLESS 协议",
      "边缘分发",
      "优惠码 xk808",
      "起步 22元/月"
    ],
    "pros": [
      "Anycast 全球边缘分布式拓扑，网络自愈容灾能力极强",
      "节点覆盖 32+ 国家与稀缺区域，跨境出海业务利器",
      "深度协议防识别混淆，提供极高安全与隐私壁垒"
    ],
    "cons": [
      "专为出海电商与极客定制，起步单价 22 元/月适合专业团队"
    ],
    "detail": "采用分布式边缘节点路由架构，针对极客、开发者及跨境电商团队量身定制，IP 纯净度高，支持多协议混淆与无感分流。",
    "limitation": "结算时输入专属优惠码 xk808 享受专属折扣立减。",
    "slug": "bianyuan-review"
  },
  {
    "id": "sujie",
    "rank": 11,
    "isPrimary": false,
    "name": "速界",
    "badge": "⚡ IPLC 强劲动力 · 畅享无界",
    "mark": "❯",
    "color": "#0ea5e9",
    "subtitle": "IPLC 强劲动力 · 畅享无界",
    "established": "2023年春",
    "lineArchitecture": "多线 IPLC 国际点对点专线 + 自动化灾备热倒换隧道",
    "peakPerformance": "自动化链路负载均衡，晚高峰动态智能切流，YouTube 4K 秒开，Ping 稳定 35ms",
    "clientSupport": "Clash, Sing-box, Shadowrocket, Quantumult X, v2rayN",
    "unlockMatrix": "Netflix、Disney+、ChatGPT、Twitch、外服联机平台、Telegram",
    "rating": 9.1,
    "pitch": "精选优质 IPLC 国际专线，抗封锁强，全天候 4K 视频流媒体满速无阻碍。",
    "overview": "主打“高并发容灾与平衡全能”的高性能 IPLC 专线。当某一线路出现波动时，自研后端调度系统可在 0.5 秒内自动倒换至备用 IPLC 隧道，确保游戏、视频与生产力业务不中断。",
    "affiliateUrl": "/go/sujie",
    "coupon": "sujie80",
    "startingPrice": 15,
    "currency": "¥",
    "billingCycle": "元/月",
    "lineType": "IPLC 专线",
    "protocol": "VLESS",
    "speed": 930,
    "servers": "68+ 节点",
    "countries": "20+ 地区",
    "discount": "优惠码 sujie80",
    "categories": [],
    "tags": [
      "IPLC 专线",
      "VLESS 协议",
      "优惠码 sujie80",
      "起步 15元/月"
    ],
    "pros": [
      "IPLC 专线加持自动化灾备热倒换，全天候业务连续性高",
      "兼顾 4K 影音吞吐与外服低延迟联机，表现均衡全面",
      "提供 8 折优惠码 sujie80，专线性价比出色"
    ],
    "cons": [
      "支持的主流区域丰富，极小众偏远国家节点较少"
    ],
    "detail": "搭载高质量 IPLC 跨境传输隧道，点对点专线直达，晚高峰依然拥有极速响应与超强吞吐能力，全面兼容各大主流客户端。",
    "limitation": "请在支付前填写优惠码 sujie80 享受 8 折优惠立减。",
    "slug": "sujie-review"
  }
];
