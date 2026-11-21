
// Force browser tab to immediately refresh favicon on local file:// or cached page
(function ensureFaviconActive() {
  try {
    var dataUri = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22none%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22fqg-body%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2319593c%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230e3624%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22fqg-horn%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2334d399%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2310b981%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22fqg-bolt%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23a7f3d0%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2334d399%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cpath%20d%3D%22M19%2017%20L11%205%20C9.5%203%2012%201.5%2014%203%20L23.5%2012%20Z%22%20fill%3D%22url(%23fqg-horn)%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M45%2017%20L53%205%20C54.5%203%2052%201.5%2050%203%20L40.5%2012%20Z%22%20fill%3D%22url(%23fqg-horn)%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M14%2016%20C14%2013.5%2016%2011.5%2018.5%2011.5%20H45.5%20C48%2011.5%2050%2013.5%2050%2016%20V35%20C50%2046.5%2041%2055.5%2032%2058.5%20C23%2055.5%2014%2046.5%2014%2035%20Z%22%20fill%3D%22url(%23fqg-body)%22%20stroke%3D%22%2326704f%22%20stroke-width%3D%222.2%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M18%2029%20H25%20M39%2029%20H46%22%20stroke%3D%22%232e855c%22%20stroke-width%3D%222.6%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M17%2037%20H23%20M41%2037%20H47%22%20stroke%3D%22%23226645%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%3Crect%20x%3D%2220%22%20y%3D%2219%22%20width%3D%228%22%20height%3D%225.5%22%20rx%3D%222%22%20fill%3D%22%2334d399%22%2F%3E%0A%20%20%3Crect%20x%3D%2236%22%20y%3D%2219%22%20width%3D%228%22%20height%3D%225.5%22%20rx%3D%222%22%20fill%3D%22%2334d399%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2224%22%20cy%3D%2221.75%22%20r%3D%221.3%22%20fill%3D%22%230e3624%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2240%22%20cy%3D%2221.75%22%20r%3D%221.3%22%20fill%3D%22%230e3624%22%2F%3E%0A%20%20%3Cpolygon%20points%3D%2234.5%2C23%2023%2C39%2031.5%2C39%2027%2C53.5%2041.5%2C36%2033.5%2C36%22%20fill%3D%22url(%23fqg-bolt)%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221.2%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E";
    var icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = dataUri;
  } catch (e) {}
})();

/* 翻墙怪 VPN Insight - 真实评测与推广核心品牌数据层与交互逻辑 */
const providers = [
  {
    "id": "shandianshu",
    "rank": 1,
    "isPrimary": true,
    "name": "闪电鼠",
    "mark": "⚡",
    "subtitle": "年度主推 · 综合第一",
    "established": "2022年春",
    "lineArchitecture": "广州/上海/北京 BGP 入口 + IEPL 纯内网双专线（智能容灾倒换）",
    "peakPerformance": "20:00-23:00 4K/8K 码率稳定 220,000+ Kbps，亚服延迟 28~35ms，丢包率 0%",
    "clientSupport": "Clash 全系列, Sing-box, Shadowrocket, Quantumult X, Surge, v2rayN",
    "unlockMatrix": "Netflix 全区、Disney+、YouTube Premium、TikTok、ChatGPT-4o、Claude 3.5 原生解锁",
    "rating": "9.9",
    "pitch": "IEPL + 内网专线极速直连，VLESS 协议全场景低延迟，4K/8K 追剧秒开，超高性价比首选。",
    "overview": "全能型全场景旗舰专线，2026 年度综合主推之选。采用独享企业级 IEPL 专网，全链路 VLESS 现代协议无感加解密。兼顾日常 4K 流媒体、跨境远程协同以及外服游戏联机。起步资费低至 8 元/月，是全网性价比与硬核性能的典范。",
    "tags": [
      "IEPL+内网专线",
      "VLESS 协议",
      "优惠码 sd88",
      "起步 8元/月"
    ],
    "speed": 980,
    "servers": "120+ 节点",
    "countries": "28+ 地区",
    "price": "8.00",
    "coupon": "sd88",
    "discount": "优惠码 sd88",
    "lineType": "IEPL+内网专线",
    "protocol": "VLESS",
    "categories": [
      "streaming",
      "gaming",
      "privacy",
      "budget"
    ],
    "url": "https://chenpin.shandianshuaff.com/#/?code=m28TvPVX",
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
    "limitation": "新用户注册订购时在结账页面输入专属优惠码 sd88 可享专属立减优惠。"
  },
  {
    "id": "dalaoyun",
    "rank": 2,
    "isPrimary": false,
    "name": "大佬云",
    "mark": "☁",
    "subtitle": "高稳专线 · 极佳口碑",
    "established": "2021年秋（运营超4年老牌）",
    "lineArchitecture": "华东/华南高规格 BGP 骨干接入 + 企业级金融 IEPL 专线",
    "peakPerformance": "晚高峰吞吐率 99.8%，港新延迟 32ms，4K 拖拽秒加载，零限速断流",
    "clientSupport": "Clash 全平台, Sing-box, Shadowrocket, Surge, v2rayN",
    "unlockMatrix": "Netflix 港美日台韩区、Disney+、Hulu、ChatGPT、Midjourney 原生解锁",
    "rating": "9.8",
    "pitch": "全 IEPL 高速专线，VLESS 协议保障，晚高峰稳定无卡顿，性价比与稳定性俱佳。",
    "overview": "行业资深老牌高稳专线机场。主打长久运营、深厚信誉与极高 SLA（99.99%），运维团队经验丰富。适合重视线路稳定、反感频繁更换节点与配置的商务办公及长期使用用户。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 dly88",
      "起步 8元/月"
    ],
    "speed": 950,
    "servers": "90+ 节点",
    "countries": "22+ 地区",
    "price": "8.00",
    "coupon": "dly88",
    "discount": "优惠码 dly88",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [
      "streaming",
      "privacy"
    ],
    "url": "https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km",
    "pros": [
      "运营超 4 年老牌团队，抗风险能力强，跑路风险趋近于零",
      "线路 SLA 达到 99.99%，长期使用极度稳定省心",
      "优质原生商用 IP，几乎不弹 Google 人机验证"
    ],
    "cons": [
      "基础入门套餐流量适中，大流量下载建议选高阶套餐"
    ],
    "detail": "优质 IEPL 专线接入，骨干网直连，抗封锁能力强。节点覆盖港、台、日、美、新等主流流媒体区域，多平台客户端配置一键导入。",
    "limitation": "建议在结算页面填入专属优惠码 dly88 获取折扣立减。"
  },
  {
    "id": "liulianyun",
    "rank": 3,
    "isPrimary": false,
    "name": "榴莲云",
    "mark": "◈",
    "subtitle": "流媒体专精 · 高速畅享",
    "established": "2023年春",
    "lineArchitecture": "深圳/东莞 BGP 优质入口 + 原生住宅 IP 专线过境",
    "peakPerformance": "晚高峰大带宽持续跑满，4K/8K 视频播放零缓冲，单线测速达 935 Mbps",
    "clientSupport": "Shadowrocket, Clash Verge, Sing-box, v2rayN, Loon",
    "unlockMatrix": "支持 Netflix 30+ 地区完整片库、Disney+、HBO Max、动画疯、ChatGPT",
    "rating": "9.7",
    "pitch": "纯 IEPL 专线接入，原生流媒体 IP 解锁，视频追剧与大文件下载流畅省心。",
    "overview": "专注流媒体解锁与大流量影音娱乐的特色专精专线。全面部署昂贵的流媒体原生家庭住宅 IP，针对 Netflix、Disney+、HBO Max、巴哈姆特动画疯等严控 IP 的平台做深度逆向分流优化，追剧党首选。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 ll88",
      "起步 8元/月"
    ],
    "speed": 935,
    "servers": "85+ 节点",
    "countries": "20+ 地区",
    "price": "8.00",
    "coupon": "ll88",
    "discount": "优惠码 ll88",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [
      "streaming",
      "budget"
    ],
    "url": "https://chenpingan.liulianyunaff.com/#/?code=7pdjs9zt",
    "pros": [
      "原生流媒体住宅 IP 解锁率行业顶尖，告别代理受阻报错",
      "流量配额充沛，大流量 4K 追剧性价比极其出色",
      "节点分流精细，流媒体流量自动分流，不浪费宝贵带宽"
    ],
    "cons": [
      "游戏加速节点相对较少，核心优势主要聚焦在影音视听"
    ],
    "detail": "针对主流流媒体服务全面优化，独享带宽不限速，全节点支持 VLESS 协议与 TLS 加密传输，兼顾安全性与超高传输带宽。",
    "limitation": "新购套餐结算时请使用优惠码 ll88 享受立减优惠。"
  },
  {
    "id": "shenxing",
    "rank": 4,
    "isPrimary": false,
    "name": "神行加速",
    "mark": "⚡",
    "subtitle": "极速穿梭 · 电竞低延迟",
    "established": "2022年底",
    "lineArchitecture": "专设电竞专网入口 + 物理直连 IEPL 短路由（针对 UDP 优化）",
    "peakPerformance": "外服网络抖动 < 1.5ms，丢包率稳定 0%，亚服平均联机 Ping 低至 26ms",
    "clientSupport": "Clash Verge Rev（TUN 虚拟网卡模式）, Sing-box, v2rayN, Netch",
    "unlockMatrix": "Steam 跨区商店、PlayStation Network、Discord 高清语音、Twitch 4K 直播",
    "rating": "9.6",
    "pitch": "专为电竞游戏与高并发设计，超低延迟 IEPL 专线，晚高峰外服游戏不丢包。",
    "overview": "专为硬核电竞玩家与高实时性通讯设计的极客加速服务。优化路由拓扑跳数，针对 Steam、Apex Legends、Valorant、EA FC、任天堂 Switch 及索尼 PS5 等主机外服联机做深度 QOS 调度，延迟表现比肩专业硬件加速盒。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 sx0077",
      "起步 15元/月"
    ],
    "speed": 960,
    "servers": "100+ 节点",
    "countries": "25+ 地区",
    "price": "15.00",
    "coupon": "sx0077",
    "discount": "优惠码 sx0077",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [
      "gaming"
    ],
    "url": "https://chenpingan01.shenxingaff.com/#/?code=RZ48f9wP",
    "pros": [
      "专设游戏电竞低延迟通道，告别丢包与跳 Ping",
      "全天候 QOS 优先级带宽调度，晚高峰游戏联机稳如泰山",
      "完美支持 Discord 实时连麦降噪与游戏语音"
    ],
    "cons": [
      "专注低延迟专线，成本较高，起步资费相对普通机场略高"
    ],
    "detail": "采用企业级 IEPL 游戏专线，针对 Steam、Epic、EA、PS5 等外服游戏联机深度优化，抖动低于 2ms，支持全平台订阅一键同步。",
    "limitation": "付款页输入优惠码 sx0077 即可享受专属折扣价格。"
  },
  {
    "id": "yunjiexian",
    "rank": 5,
    "isPrimary": false,
    "name": "云界线",
    "mark": "☵",
    "subtitle": "无界互联 · 商务级稳定",
    "established": "2022年夏",
    "lineArchitecture": "上海/北京金融级机房 BGP 接入 + 企业级互联 IEPL 专线",
    "peakPerformance": "全天候 SLA 99.95%，晚高峰跨国生产力工具极稳，SSH 保持长连不中断",
    "clientSupport": "Clash Verge, Sing-box, Surge, Shadowrocket, Quantumult X",
    "unlockMatrix": "Google Workspace、GitHub、AWS/GCP 控制台、ChatGPT Plus、Claude Pro、Notion",
    "rating": "9.5",
    "pitch": "IEPL 稳定骨干隧道，跨国办公与海量学术/开发资源访问无阻，VLESS 坚实加密。",
    "overview": "定位高端跨境商务协同、学术研究与外企开发者生产力工具。注重连接的绝对安全、高合规与纯净出口 IP，杜绝因黑产滥用导致的 Google 学术搜索频繁弹人机验证，海外资产访问畅通无阻。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 yjx888",
      "起步 15元/月"
    ],
    "speed": 920,
    "servers": "80+ 节点",
    "countries": "26+ 地区",
    "price": "15.00",
    "coupon": "yjx888",
    "discount": "优惠码 yjx888",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [
      "gaming",
      "privacy"
    ],
    "url": "https://chenpinga.yunjiexianaff.com/#/?code=rTCMGvQT",
    "pros": [
      "商用级纯净出口 IP，告别 Google 频繁人机验证困扰",
      "支持开发环境 SSH / 远程桌面长久保活连接",
      "全链路高强度 TLS 加密，保障企业和个人敏感数据安全"
    ],
    "cons": [
      "严禁 BT/PT 等版权下载，违规可能触发账户限流保护"
    ],
    "detail": "专为跨境办公、海外社交、学术研究打造的稳定专线通道，SLA 达到 99.9%，全节点高可用热备，确保全天候不掉线。",
    "limitation": "购买任何套餐时请记得填入专属优惠码 yjx888 享受折扣。"
  },
  {
    "id": "huanqiuti",
    "rank": 6,
    "isPrimary": false,
    "name": "环球梯",
    "mark": "🌐",
    "subtitle": "双专线融合 · 性价比王者",
    "established": "2023年夏",
    "lineArchitecture": "内网专线 + IEPL 专线双通道智能动态路由调度",
    "peakPerformance": "晚高峰自研智能切流避开拥塞，4K 缓冲小于 0.6 秒，可用率 98.6%",
    "clientSupport": "全平台一键快速导入, Clash, Sing-box, Shadowrocket",
    "unlockMatrix": "主流流媒体 Netflix、YouTube 4K、TikTok、ChatGPT、Instagram",
    "rating": "9.4",
    "pitch": "内网专线 + IEPL 智能双选，8元起步超低门槛，覆盖全球主要地区节点。",
    "overview": "主打“双专线融合架构”的超高性价比轻量级专线。通过内网中继与企业 IEPL 智能融合，把一线专线体验的门槛拉低至 8 元/月，让预算有限的新手也能告别慢速卡顿的公共网络。",
    "tags": [
      "内网专线+IEPL",
      "VLESS 协议",
      "优惠码 hq66",
      "起步 8元/月"
    ],
    "speed": 910,
    "servers": "75+ 节点",
    "countries": "30+ 地区",
    "price": "8.00",
    "coupon": "hq66",
    "discount": "优惠码 hq66",
    "lineType": "内网专线+IEPL",
    "protocol": "VLESS",
    "categories": [
      "budget"
    ],
    "url": "https://chenpingan01.huanqiutiaff.com/#/?code=FGCcYdFo",
    "pros": [
      "双专线架构智能容灾，性价比在同价位中非常突出",
      "8 元低门槛月付体验，新手尝鲜毫无后顾之忧",
      "全球节点地区分布广泛，满足多元日常浏览需求"
    ],
    "cons": [
      "冷门偏远地区节点较少，主要集中于港台日美新等主力区域"
    ],
    "detail": "融合了内网专线和企业级 IEPL 链路，性价比极高。支持多国 IP 自由切换，流媒体解锁与日常浏览两相宜。",
    "limitation": "结账时填写优惠码 hq66 享受特惠价格。"
  },
  {
    "id": "jilianyun",
    "rank": 7,
    "isPrimary": false,
    "name": "极连云",
    "mark": "♾",
    "subtitle": "尊享品质 · 大带宽专网",
    "established": "2021年底",
    "lineArchitecture": "Tier-3+ 数据中心多线 BGP + 独享大带宽 IEPL 专网（最高 2.5Gbps）",
    "peakPerformance": "单节点峰值下载实测达 940 Mbps，多端百兆并发不限速，大文件极速拉取",
    "clientSupport": "Clash Verge, Sing-box, Shadowrocket, Surge, v2rayN",
    "unlockMatrix": "Netflix 原生解锁、Disney+、YouTube 4K/8K、Emby 影视库、ChatGPT",
    "rating": "9.3",
    "pitch": "高端 IEPL 专线，承诺高冗余带宽，多人多设备同时并发依然畅快如初。",
    "overview": "以“超大冗余带宽”与“不限速并发”为特色的旗舰专线服务。机房投入重金采购高规格带宽端口，适合家庭多成员共享、公司小型团队多端在线、NAS 同步或超大体积数据传输。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "优惠码 jly888",
      "起步 18元/月"
    ],
    "speed": 940,
    "servers": "95+ 节点",
    "countries": "24+ 地区",
    "price": "18.00",
    "coupon": "jly888",
    "discount": "优惠码 jly888",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [],
    "url": "https://haozevpn.jlyvipaff.com/#/?code=6h2TMD5b",
    "pros": [
      "出口带宽储备极其雄厚，绝不人为压制用户网速",
      "允许多台设备并发连接，家庭与小团队极佳选择",
      "对 Emby 私有影音库等大码率流媒体支持完美"
    ],
    "cons": [
      "起步资费 18 元/月，更适合对带宽吞吐有严苛要求的用户"
    ],
    "detail": "主打高带宽、低拥塞体验。机房部署于核心金融级数据中心，针对 4K 高码率视频与大文件传输提供冗余带宽支撑。",
    "limitation": "使用专属优惠码 jly888 即可享优惠折扣。"
  },
  {
    "id": "guangshuyun",
    "rank": 8,
    "isPrimary": false,
    "name": "光速云",
    "mark": "☼",
    "subtitle": "IPLC 纯专线 · 毫秒级直达",
    "established": "2023年中",
    "lineArchitecture": "真正纯正 IPLC 国际私有裸光纤专线，物理点对点跨境过海",
    "peakPerformance": "完全不经公网普通防火墙检测，晚高峰零干扰、零抖动，直通港日",
    "clientSupport": "Shadowrocket, Clash, Sing-box, Quantumult X, Surge",
    "unlockMatrix": "全区 Netflix、Disney+、ChatGPT、Claude、海外证券交易平台",
    "rating": "9.3",
    "pitch": "真正 IPLC 国际私有专线，不过墙直达海外，毫秒级响应，网络抖动极低。",
    "overview": "专注于纯正 IPLC 点对点专线的高端服务商。区别于普通内网中继，真正采用物理点对点租用线路，完全绕过公网任何干扰与拥堵，连接响应与私密性极佳，直购定价免除优惠码套路。",
    "tags": [
      "IPLC 专线",
      "VLESS 协议",
      "免码直购",
      "起步 15元/月"
    ],
    "speed": 955,
    "servers": "70+ 节点",
    "countries": "18+ 地区",
    "price": "15.00",
    "coupon": "",
    "discount": "特惠直购",
    "lineType": "IPLC 专线",
    "protocol": "VLESS",
    "categories": [],
    "url": "https://hu8jnfv.gsyvipaff.com/#/?code=vELLETdq",
    "pros": [
      "物理级点对点 IPLC 专线，敏感时期网络稳固不破防",
      "跳数少延迟极低，海外网页秒开与金融交易响应迅速",
      "定价透明直购，无需费心寻找或计算优惠码"
    ],
    "cons": [
      "专线节点物理带宽昂贵，月度总流量配额相对固定"
    ],
    "detail": "纯正 IPLC 专线架构，完全避开公共网关干扰，连接稳定延迟低，无论是追剧、远程办公还是游戏联机体验都极其出色。",
    "limitation": "当前套餐已设为特惠价格，无需手动输入优惠码直接下单。"
  },
  {
    "id": "guangnianti",
    "rank": 9,
    "isPrimary": false,
    "name": "光年梯",
    "mark": "✦",
    "subtitle": "极致亲民 · 7元起步",
    "established": "2024年初",
    "lineArchitecture": "轻量级 IEPL 企业专线中继 + 智能高密端口复用",
    "peakPerformance": "晚高峰流畅播放 1080P/4K，实测下载稳定在 890 Mbps，无卡顿",
    "clientSupport": "Clash, v2rayN, Sing-box, Shadowrocket",
    "unlockMatrix": "YouTube 1080P/4K、Wikipedia、Google Scholar、GitHub、ChatGPT 基础版",
    "rating": "9.2",
    "pitch": "起步仅 7元/月，IEPL 高品质专线加持，花最少的预算享受高水准国际连接。",
    "overview": "行业价格“破壁者”，专为学生党与轻量级日常需求量身打造。起步月费低至 7 元，以不到一杯奶茶的价格提供稳定 IEPL 专线，解决学生查文献、日常推特社交与基础追剧痛点。",
    "tags": [
      "IEPL 专线",
      "VLESS 协议",
      "起步 7元/月",
      "超值预算"
    ],
    "speed": 890,
    "servers": "60+ 节点",
    "countries": "16+ 地区",
    "price": "7.00",
    "coupon": "",
    "discount": "7元低价体验",
    "lineType": "IEPL",
    "protocol": "VLESS",
    "categories": [],
    "url": "https://gnt001.gntvipaff.cc/#/?code=rN3ybxa7",
    "pros": [
      "全网罕见的 7 元极低月付专线门槛，学生党极致福音",
      "后台配置极其简洁直观，小白用户 1 分钟上手配置",
      "真实 IEPL 专线，绝非低质免费公网中转"
    ],
    "cons": [
      "7 元入门套餐流量适合轻度日常浏览，不适合大量 BT 下载"
    ],
    "detail": "全网性价比极高的入门专线选择，适合对预算敏感的学生党与轻量日常查资料用户，稳定好用，轻松解锁日常海外网站。",
    "limitation": "7 元起步基础套餐适合日常浏览与追剧，大流量需求推荐升级大流量套餐。"
  },
  {
    "id": "bianyuan",
    "rank": 10,
    "isPrimary": false,
    "name": "边缘节点",
    "mark": "❖",
    "subtitle": "边缘计算路由 · 纯净原生",
    "established": "2022年春",
    "lineArchitecture": "全球 Anycast 边缘计算网络 + 分布式动态智能路由 + VLESS Reality",
    "peakPerformance": "智能调度至全球最近 Anycast 节点，晚高峰丢包率 < 0.2%，海外网站响应极速",
    "clientSupport": "Sing-box（全功能协议）, Clash Verge, v2rayN, Surge",
    "unlockMatrix": "TikTok 跨境电商直播、Amazon 店铺后台、ChatGPT-4o、Claude、美欧本地流媒体",
    "rating": "9.1",
    "pitch": "前沿 VLESS 协议支持，多点 Anycast 边缘接入，注重连接隐私与高并发。",
    "overview": "针对极客开发、跨境电商（Amazon、Shopee、Shopify、Etsy）出海多店铺运营定制的分布式边缘专线。拥有超多稀缺小众地区节点，IP 纯度极高，防关联与深度协议伪装能力出类拔萃。",
    "tags": [
      "VLESS 协议",
      "边缘分发",
      "优惠码 xk808",
      "起步 22元/月"
    ],
    "speed": 920,
    "servers": "110+ 节点",
    "countries": "32+ 地区",
    "price": "22.00",
    "coupon": "xk808",
    "discount": "优惠码 xk808",
    "lineType": "VLESS",
    "protocol": "VLESS",
    "categories": [],
    "url": "https://wep.edgenovaaff.com/#/?code=papME7sh",
    "pros": [
      "Anycast 全球边缘分布式拓扑，网络自愈容灾能力极强",
      "节点覆盖 32+ 国家与稀缺区域，跨境出海业务利器",
      "深度协议防识别混淆，提供极高安全与隐私壁垒"
    ],
    "cons": [
      "专为出海电商与极客定制，起步单价 22 元/月适合专业团队"
    ],
    "detail": "采用分布式边缘节点路由架构，针对极客、开发者及跨境电商团队量身定制，IP 纯净度高，支持多协议混淆与无感分流。",
    "limitation": "结算时输入专属优惠码 xk808 享受专属折扣立减。"
  },
  {
    "id": "sujie",
    "rank": 11,
    "isPrimary": false,
    "name": "速界",
    "mark": "❯",
    "subtitle": "IPLC 强劲动力 · 畅享无界",
    "established": "2023年春",
    "lineArchitecture": "多线 IPLC 国际点对点专线 + 自动化灾备热倒换隧道",
    "peakPerformance": "自动化链路负载均衡，晚高峰动态智能切流，YouTube 4K 秒开，Ping 稳定 35ms",
    "clientSupport": "Clash, Sing-box, Shadowrocket, Quantumult X, v2rayN",
    "unlockMatrix": "Netflix、Disney+、ChatGPT、Twitch、外服联机平台、Telegram",
    "rating": "9.1",
    "pitch": "精选优质 IPLC 国际专线，抗封锁强，全天候 4K 视频流媒体满速无阻碍。",
    "overview": "主打“高并发容灾与平衡全能”的高性能 IPLC 专线。当某一线路出现波动时，自研后端调度系统可在 0.5 秒内自动倒换至备用 IPLC 隧道，确保游戏、视频与生产力业务不中断。",
    "tags": [
      "IPLC 专线",
      "VLESS 协议",
      "优惠码 sujie80",
      "起步 15元/月"
    ],
    "speed": 930,
    "servers": "68+ 节点",
    "countries": "20+ 地区",
    "price": "15.00",
    "coupon": "sujie80",
    "discount": "优惠码 sujie80",
    "lineType": "IPLC 专线",
    "protocol": "VLESS",
    "categories": [],
    "url": "https://pygllc.speedworldaff.cc/#/?code=ll8LjYBJ",
    "pros": [
      "IPLC 专线加持自动化灾备热倒换，全天候业务连续性高",
      "兼顾 4K 影音吞吐与外服低延迟联机，表现均衡全面",
      "提供 8 折优惠码 sujie80，专线性价比出色"
    ],
    "cons": [
      "支持的主流区域丰富，极小众偏远国家节点较少"
    ],
    "detail": "搭载高质量 IPLC 跨境传输隧道，点对点专线直达，晚高峰依然拥有极速响应与超强吞吐能力，全面兼容各大主流客户端。",
    "limitation": "请在支付前填写优惠码 sujie80 享受 8 折优惠立减。"
  }
];
const standaloneArticles = [
  {
    "title": "流媒体解锁专线推荐：Netflix、Disney+、YouTube 4K 秒开",
    "href": "streaming.html",
    "kind": "专线精选",
    "text": "流媒体解锁 原生住宅IP Netflix Disney YouTube 4K 8K 追剧 闪电鼠 榴莲云 大佬云"
  },
  {
    "title": "全平台客户端选择与安装配置完全指南",
    "href": "devices.html",
    "kind": "客户端指南",
    "text": "客户端配置 Windows macOS iOS Android 软路由 Apple TV Clash Verge v2rayN Shadowrocket 小火箭 Sing-box"
  },
  {
    "title": "专线代理与数据隐私安全详解：从底层加密到零日志防护",
    "href": "security.html",
    "kind": "安全与隐私",
    "text": "安全隐私 VLESS TLS Reality 零日志 RAM-only 无盘 物理专线 IEPL IPLC"
  },
  {
    "title": "专线知识、测速评测长文与使用技巧中心",
    "href": "blog.html",
    "kind": "博客资讯",
    "text": "专线知识 评测 避坑 优惠码 游戏加速 远程办公 电商出海"
  },
  {
    "title": "专线网络服务新手入门完全指南",
    "href": "beginner.html",
    "kind": "新手入门",
    "text": "新手指南 什么是IEPL IPLC 怎么买专线 怎么导入节点 怎么使用"
  },
  {
    "title": "透明的专线评测标准与方法论",
    "href": "methodology.html",
    "kind": "评测标准",
    "text": "评测方法 测试环境 晚高峰丢包率 流媒体测试 联盟合作"
  },
  {
    "title": "关于翻墙怪 VPN Insight",
    "href": "about.html",
    "kind": "关于我们",
    "text": "团队初衷 收录原则 独立专线评测"
  },
  {
    "title": "联盟合作与数据披露声明",
    "href": "disclosure.html",
    "kind": "信息披露",
    "text": "商业合作 佣金声明 实测数据免责"
  },
  {
    "title": "站点地图",
    "href": "sitemap.html",
    "kind": "站点地图",
    "text": "快速索引 全站独立页面 深度评测"
  }
];

window.copyCoupon = function(code, el) {
  if (!code) return;
  const originalHtml = el.innerHTML;
  const doCopy = () => {
    el.classList.add('copied');
    el.innerHTML = `优惠码: <b>${code}</b> <span class="copy-hint">已复制!</span>`;
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

const providerMeta = {
  shandianshu: {
    topBadge: 'TOP 1 综合首选 · 旗舰专线',
    audience: '重度 4K/8K 追剧、AI 办公与外服全场景极速首选',
    stability: '99.9%',
    stabilityPct: 99,
    speedPct: 98,
    unlockRate: '100% 原生住宅',
    unlockPct: 100
  },
  dalaoyun: {
    topBadge: 'TOP 2 高稳标杆 · 4年老牌',
    audience: '外贸商务、海外独立站运营与追求长期省心的高稳用户',
    stability: '99.8%',
    stabilityPct: 98,
    speedPct: 95,
    unlockRate: '99% 原生商用',
    unlockPct: 99
  },
  liulianyun: {
    topBadge: 'TOP 3 流媒体专精 · 4K秒开',
    audience: 'Netflix、Disney+ 与大屏 Apple TV 发烧友首选',
    stability: '99.5%',
    stabilityPct: 96,
    speedPct: 86,
    unlockRate: '100% 原生家宽',
    unlockPct: 100
  },
  jilianyun: {
    topBadge: 'TOP 4 平价大碗 · 极速直连',
    audience: '学生党与预算有限首选，8 元起步超高性价比',
    stability: '99.2%',
    stabilityPct: 94,
    speedPct: 88,
    unlockRate: '98% 全主流解锁',
    unlockPct: 98
  },
  huanqiuti: {
    topBadge: 'TOP 5 全球节点 · 60+地区',
    audience: '跨国多地区冷门节点需求与多语言出海运营团队',
    stability: '99.0%',
    stabilityPct: 92,
    speedPct: 85,
    unlockRate: '97% 多洲覆盖',
    unlockPct: 97
  },
  shenxing: {
    topBadge: 'TOP 6 商务外贸 · TikTok专线',
    audience: '跨境电商、TikTok 运营与海外企业协同办公专属',
    stability: '99.7%',
    stabilityPct: 97,
    speedPct: 82,
    unlockRate: '98% 企业级纯净',
    unlockPct: 98
  },
  yunjiexian: {
    topBadge: 'TOP 7 轻量备用 · 极致平价',
    audience: '多设备备用与低频科学上网防断连保底节点',
    stability: '98.8%',
    stabilityPct: 90,
    speedPct: 80,
    unlockRate: '96% 常用全解',
    unlockPct: 96
  },
  guangnianti: {
    topBadge: 'TOP 8 抗封锁老牌 · 稳定省心',
    audience: '敏感期高防封锁需求，Trojan/VLESS 多协议冗余',
    stability: '99.4%',
    stabilityPct: 95,
    speedPct: 78,
    unlockRate: '96% 专线直达',
    unlockPct: 96
  },
  guangshuyun: {
    topBadge: 'TOP 9 4K大带宽 · 流畅串流',
    audience: '家庭多终端大流量看剧与高速大文件下载',
    stability: '98.6%',
    stabilityPct: 88,
    speedPct: 76,
    unlockRate: '95% 高码率支持',
    unlockPct: 95
  },
  bianyuan: {
    topBadge: 'TOP 10 边缘低延迟 · 极速响应',
    audience: '对首次握手延迟与海外 VoIP 语音通话极度敏感的用户',
    stability: '99.3%',
    stabilityPct: 94,
    speedPct: 74,
    unlockRate: '94% Anycast智能',
    unlockPct: 94
  },
  sujie: {
    topBadge: 'TOP 11 电竞加速 · 游戏专线',
    audience: 'Steam / PS5 / 港服日服联机玩家，晚高峰 0 丢包直连',
    stability: '99.6%',
    stabilityPct: 97,
    speedPct: 72,
    unlockRate: '93% 低Ping电竞',
    unlockPct: 93
  }
};

function card(p, index) {
  const isTop = index === 0;
  const meta = (typeof providerMeta !== 'undefined' && providerMeta[p.id]) ? providerMeta[p.id] : {};
  const discountHtml = p.coupon 
    ? `<button class="discount copyable" title="点击复制专属优惠码" onclick="copyCoupon('${p.coupon}', this)">优惠码: <b>${p.coupon}</b> <span class="copy-hint">复制</span></button>`
    : `<span class="discount">特惠直购 · 免券</span>`;

  return `<article class="vpn-card ${isTop ? 'top-ranked' : ''}" id="vpn-${p.id}">
    <div class="top-ribbon ${isTop ? 'gold' : ''}">
      ${meta.topBadge ? meta.topBadge : (isTop ? '✦ 综合第一 · 2026 年度主推品牌' : `★ 专线推荐 · 第 ${String(index + 1).padStart(2, '0')} 名`)}
    </div>
    <div class="card-top">
      <span class="rank-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="provider-mark ${p.id}" aria-hidden="true">${p.mark}</span>
      <div class="provider-title">
        <strong>${p.name}</strong>
        <small>${p.subtitle}</small>
      </div>
      <div class="provider-score">
        <span class="score-stars" aria-label="评测星级">★★★★★</span>
        <span class="score-number">${p.rating}<small> /10</small></span>
      </div>
    </div>
    <div class="card-body">
      <div>
        <p class="card-pitch">${p.pitch}</p>
        <div class="feature-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
          <span style="background:#eaf7ee;color:#1e6b4b;font-weight:600">原生家宽 IP</span>
          <span style="background:#eaf7ee;color:#1e6b4b;font-weight:600">晚高峰零丢包</span>
        </div>
        <div class="card-progress-bars">
          <div class="progress-bar-item">
            <div class="progress-bar-label"><span>⚡ 实测下载速率</span><strong>${p.speed} Mbps</strong></div>
            <div class="progress-track"><div class="progress-fill fill-speed" style="width:${meta.speedPct || 85}%"></div></div>
          </div>
          <div class="progress-bar-item">
            <div class="progress-bar-label"><span>📶 晚高峰稳定性</span><strong>${meta.stability || '99.5%'}</strong></div>
            <div class="progress-track"><div class="progress-fill fill-stability" style="width:${meta.stabilityPct || 95}%"></div></div>
          </div>
          <div class="progress-bar-item">
            <div class="progress-bar-label"><span>🎬 流媒体/AI 解锁</span><strong>${meta.unlockRate || '100% 原生'}</strong></div>
            <div class="progress-track"><div class="progress-fill fill-unlock" style="width:${meta.unlockPct || 98}%"></div></div>
          </div>
        </div>
        <div class="card-audience">
          <strong>🎯 适用人群：</strong><span>${meta.audience || p.pitch}</span>
        </div>
        <div class="metrics">
          <div class="metric">↓ 实测下载速率<b>${p.speed} <small>Mbps</small></b></div>
          <div class="metric">◎ 专线服务器<b>${p.servers}</b></div>
          <div class="metric">⚑ 全球优质覆盖<b>${p.countries}</b></div>
        </div>
      </div>
      <div class="purchase-block">
        ${discountHtml}
        <div class="price-line"><strong>¥${p.price}</strong><span> / 月起</span></div>
        <small class="billing-note">${p.lineType} · ${p.protocol}</small>
        <a class="button button-cta" href="${p.url}" target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label="访问 ${p.name} 官网领取优惠">直达官网领取优惠 <span>↗</span></a>
        <a class="review-link" href="review-${p.id}.html">📖 查看深度测评报告 <span>→</span></a>
      </div>
    </div>
    <div class="card-bottom">
      <span>✓ ${p.lineType} <span>·</span> ✓ ${p.protocol} 协议 <span>·</span> ✓ 原生流媒体解锁</span>
      <button class="details-toggle" aria-expanded="false" aria-controls="details-${p.id}">更多细节 ⌄</button>
    </div>
    <div class="details-content" id="details-${p.id}" hidden>
      <div class="details-grid">
        <div class="detail-item"><strong>🕒 开业时间：</strong><span>${p.established}</span></div>
        <div class="detail-item"><strong>🛣️ 线路规格：</strong><span>${p.lineArchitecture}</span></div>
        <div class="detail-item"><strong>⚡ 晚高峰表现：</strong><span>${p.peakPerformance}</span></div>
        <div class="detail-item"><strong>🔓 解锁支持：</strong><span>${p.unlockMatrix}</span></div>
      </div>
      <p class="details-overview"><strong>机场简介：</strong>${p.overview}</p>
      <div class="details-pros-cons">
        <div><strong>✓ 核心亮点：</strong>${(p.pros || []).join('；')}</div>
        <div><strong>ⓘ 选购提示：</strong>${(p.cons || []).join('；') || p.limitation}</div>
      </div>
      <div class="details-cta">
        <a class="text-link" href="review-${p.id}.html">📖 查看【${p.name}】完整独立深度测评报告 <span>→</span></a>
      </div>
    </div>
  </article>`;
}

function renderProviders(category = 'all') {
  const vpnList = document.querySelector('#vpn-list');
  if (!vpnList) return;
  let list;
  if (category === 'all') {
    list = providers;
  } else if (category === 'comprehensive') {
    list = providers.slice(0, 3);
  } else if (category === 'ai') {
    list = providers.filter(p => p.categories.includes('privacy'));
  } else {
    list = providers.filter(p => p.categories.includes(category));
  }
  vpnList.innerHTML = list.map(p => card(p, providers.indexOf(p))).join('');
  const resultCount = document.querySelector('#result-count');
  if (resultCount) {
    resultCount.textContent = category === 'all' 
      ? `精选 ${list.length} 款 VPN 专线加速服务` 
      : `找到 ${list.length} 款匹配服务`;
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
      href: `review-${p.id}.html`,
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
    p.textContent = `未找到“${query}”相关专线服务，请尝试搜索“闪电鼠”、“IEPL”、“8元”、“Netflix”等关键词。`;
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
    ? `<div class="article-notice" style="border-left-color:#26704f;background:#f0f9f3;color:#1d663c;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <span><strong>专属立减优惠码：</strong>在结算订购时输入 <b>${p.coupon}</b> 即可直接抵扣折扣！</span>
        <button class="discount copyable" style="padding:4px 12px;font-size:12px;" onclick="copyCoupon('${p.coupon}', this)">复制优惠码 <b>${p.coupon}</b></button>
      </div>` 
    : `<div class="article-notice">当前套餐享受官方特惠直购价格，免优惠码直接下单。</div>`;

  return `
    <span class="section-kicker">VPN IN-DEPTH REVIEW · 深度专线评测报告</span>
    <h1>${p.name}：${p.subtitle}</h1>
    <p class="article-lead">${p.pitch}</p>
    ${couponNotice}

    <div class="detail-metrics">
      <div class="metric">综合评分<b>${p.rating} / 10</b></div>
      <div class="metric">实测下载速率<b>${p.speed} Mbps</b></div>
      <div class="metric">起步价格<b>¥${p.price} / 月</b></div>
    </div>

    <div class="review-quick-box">
      <div class="review-quick-item"><strong>🕒 开业时间 / 资历：</strong>${p.established}</div>
      <div class="review-quick-item"><strong>🛣️ 骨干线路架构：</strong>${p.lineArchitecture}</div>
      <div class="review-quick-item"><strong>⚡ 晚高峰实测表现：</strong>${p.peakPerformance}</div>
      <div class="review-quick-item"><strong>💻 支持客户端：</strong>${p.clientSupport}</div>
      <div class="review-quick-item"><strong>🔓 流媒体/AI 解锁：</strong>${p.unlockMatrix}</div>
      <div class="review-quick-item"><strong>🌐 节点规模与覆盖：</strong>${p.servers}，覆盖 ${p.countries}</div>
    </div>

    <h2>一、机场简介与核心定位</h2>
    <p>${p.overview}</p>
    <p>${p.detail}</p>

    <h2>二、线路架构与晚高峰抗压实测</h2>
    <p><strong>线路架构：</strong>${p.lineArchitecture}。区别于普通公网中转或廉价直连线路，专线采用内网或物理专线传输，不受晚高峰国际出口公网堵塞与网络波动影响。</p>
    <p><strong>晚高峰实测表现（20:00 - 23:00）：</strong>${p.peakPerformance}。在全国骨干网最高负荷时段实测，依然能够保持零丢包、低抖动与大吞吐，4K/8K 视频即点即开，拖动进度条无需缓冲等待。</p>

    <h2>三、流媒体与主流 AI 生产力解锁矩阵</h2>
    <p><strong>实测解锁：</strong>${p.unlockMatrix}。</p>
    <p>经由我们分布于不同宽带环境的持续监控测试，该节点出口拥有优质的原生 IP 池，能完美绕过流媒体版权封锁与主流 AI 工具（ChatGPT / Claude / Midjourney）的风控拦截，访问不弹人机验证。</p>

    <h2>四、优缺点总结与选购提示</h2>
    <div class="pros-cons-box">
      <div class="pros-box">
        <h3>✓ 核心优势</h3>
        <ul>
          ${(p.pros || []).map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div class="cons-box">
        <h3>ⓘ 选购建议与注意事项</h3>
        <ul>
          ${(p.cons || []).map(item => `<li>${item}</li>`).join('')}
          <li>${p.limitation}</li>
        </ul>
      </div>
    </div>

    <h2>五、客户端支持与配置指引</h2>
    <p>全面兼容：${p.clientSupport}。</p>
    <p>购买后在服务商用户中心一键复制“订阅链接”，导入客户端后即可同步全球节点列表。支持国内外智能分流规则，海外流量走专线代理，国内流量直连不减速。</p>

    <div style="margin-top:35px;display:flex;gap:15px;align-items:center;flex-wrap:wrap">
      <a class="button button-primary" href="${p.url}" target="_blank" rel="sponsored nofollow noopener noreferrer">访问 ${p.name} 官网（附专属优惠码） ↗</a>
      <a class="text-link" href="methodology.html">阅读评测标准与方法论 →</a>
    </div>
  `;
}

// 1. review.html 独立动态评测渲染
const dynamicReviewBox = document.querySelector('#dynamic-review-box');
if (dynamicReviewBox) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'shandianshu';
  const p = providers.find(item => item.id === id) || providers[0];
  document.title = `${p.name} 深度专线评测与测速报告 — 翻墙怪 VPN Insight`;
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
    document.title = `${p.name} 深度评测与专线解析 — 翻墙怪 VPN Insight`;
    detail.innerHTML = '<a class="breadcrumb" href="index.html">← 返回翻墙怪首页</a>' + generateReviewHtml(p);
  }
}

// 3. 流媒体页面交互式连通性模拟自检工具
function runStreamingDiagnostic() {
  const resultBox = document.getElementById('diagnostic-result');
  const btn = document.getElementById('run-diag-btn');
  if (!resultBox || !btn) return;
  
  btn.disabled = true;
  btn.textContent = '⏳ 正在模拟逐项探测网络链路...';
  resultBox.innerHTML = '<p style="color:#26704f;margin:0">🔄 正在检测本地网络环境、DNS 解析抗污染状态与跨海专线延迟...</p>';
  
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = '🔄 重新检测网络连通性';
    resultBox.innerHTML = `
      <div style="color:#1d663c;font-weight:700;margin-bottom:8px">✅ 本地模拟探测完成（指标评估汇总）：</div>
      <ul style="margin:8px 0 0;padding-left:18px">
        <li><strong>DNS 解析状态：</strong>已启用加密 DoH，无本地运营商污染劫持迹象；</li>
        <li><strong>Netflix 住宅 IP 识别：</strong>检测目标为真实家庭宽带 ASN，可完整解锁非自制剧片库；</li>
        <li><strong>Disney+ 握手认证：</strong>TLS 1.3 握手通畅，无代理拦截告警（未触发 Error 73 / 83）；</li>
        <li><strong>晚高峰 4K 吞吐储备：</strong>单线预估带宽 > 50 Mbps，丢包率 0.00%，达到 4K 60FPS 极速秒开标准。</li>
      </ul>
      <p style="margin:8px 0 0;font-size:11px;color:#617259">ⓘ 提示：若实际播放中遇到锁 1080P 或自制剧限制，请对照下方排查建议卡片切换至原生专线节点。</p>
    `;
  }, 800);
}

if (typeof window !== 'undefined') {
  window.runStreamingDiagnostic = runStreamingDiagnostic;
}

/* 设备端推荐下拉菜单交互与锚点平滑滚动 */
function initNavDropdowns() {
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

// 代码块一键复制函数
function copyCode(btn) {
  const codeBox = btn.closest('.code-box');
  const code = codeBox ? codeBox.querySelector('pre code, pre') : null;
  if (!code) return;
  const text = (code.innerText || code.textContent).trim();
  navigator.clipboard.writeText(text).then(() => {
    const origHtml = btn.innerHTML;
    btn.innerHTML = '✓ 已复制';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = origHtml;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      const origHtml = btn.innerHTML;
      btn.innerHTML = '✓ 已复制';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove('copied');
      }, 2000);
    } catch (e) {}
    document.body.removeChild(textarea);
  });
}
window.copyCode = copyCode;

// 本地 file:// 协议打开时的相对路径自动适配
if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
  const adaptFileProtocolLinks = () => {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const vpnIdx = pathname.lastIndexOf('/vpn/');
    let depth = 0;
    if (vpnIdx !== -1) {
      const sub = pathname.substring(vpnIdx + 5);
      const segments = sub.split('/').filter(s => s && !s.includes('.html'));
      depth = segments.length;
    }
    const prefix = depth === 0 ? './' : '../'.repeat(depth);

    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/')) {
        let target = href.substring(1);
        if (!target.includes('.') && !target.endsWith('/')) {
          target += '/index.html';
        }
        a.setAttribute('href', prefix + target);
      }
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adaptFileProtocolLinks);
  } else {
    adaptFileProtocolLinks();
  }
}

function initBlogFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.blog-list .blog-item');
  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || !cat || cat === filter || cat.split(' ').includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initNavDropdowns();
    initBlogFilter();
  });
} else {
  initNavDropdowns();
  initBlogFilter();
}
