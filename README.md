# 翻墙怪 VPN Insight — 专线加速与评测推荐站

原生 HTML、CSS、JavaScript 极速静态框架，专注推荐优质 IEPL/IPLC 专线与 VLESS 现代协议服务，严格绑定推广邀请码与优惠码。

## 核心推荐品牌矩阵 (`src/data/services.json`)

| 排名 | 品牌 | 定位/线路 | 起步资费 | 专属优惠码 | 核心协议 | 官网推广链接 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01 (主推)** | **闪电鼠** | IEPL+内网专线 | 8元/月 | `sd88` | VLESS | `https://chenpin.shandianshuaff.com/#/?code=m28TvPVX` |
| **02** | **大佬云** | IEPL 专线 | 8元/月 | `dly88` | VLESS | `https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km` |
| **03** | **榴莲云** | IEPL 专线 | 8元/月 | `ll88` | VLESS | `https://chenpingan.liulianyunaff.com/#/?code=7pdjs9zt` |
| **04** | **神行加速** | IEPL 游戏专线 | 15元/月 | `sx0077` | VLESS | `https://chenpingan01.shenxingaff.com/#/?code=RZ48f9wP` |
| **05** | **云界线** | IEPL 商务专线 | 15元/月 | `yjx888` | VLESS | `https://chenpinga.yunjiexianaff.com/#/?code=rTCMGvQT` |
| **06** | **环球梯** | 内网专线+IEPL | 8元/月 | `hq66` | VLESS | `https://chenpingan01.huanqiutiaff.com/#/?code=FGCcYdFo` |
| **07** | **极连云** | IEPL 大带宽专线 | 18元/月 | `jly888` | VLESS | `https://haozevpn.jlyvipaff.com/#/?code=6h2TMD5b` |
| **08** | **光速云** | IPLC 极速专线 | 15元/月 | 免码直购 | VLESS | `https://hu8jnfv.gsyvipaff.com/#/?code=vELLETdq` |
| **09** | **光年梯** | IEPL 亲民专线 | 7元/月 | 免码直购 | VLESS | `https://gnt001.gntvipaff.cc/#/?code=rN3ybxa7` |
| **10** | **边缘节点** | 分布式边缘计算 | 22元/月 | `xk808` | VLESS | `https://wep.edgenovaaff.com/#/?code=papME7sh` |
| **11** | **速界** | IPLC 专线 | 15元/月 | `sujie80` | VLESS | `https://pygllc.speedworldaff.cc/#/?code=ll8LjYBJ` |

## 快速预览与运行

1. **双击批处理一键启动**：
   - 双击 `启动本地服务器.bat`：本地监听 `http://localhost:3000` 并自动打开浏览器。
   - 双击 `启动预览.bat`：直接在浏览器中打开 `index.html` 本地文件。
2. **命令行运行**：
   - `npm run dev`：启动本地轻量静态 HTTP 服务器。
   - `npm run check`：静态语法检查。

## 页面架构

- **核心数据层**：`src/data/services.json` 与 `data/services.json`，严格锁定邀请码参数。
- **动态交互**：`js/app.js` 支持多场景筛选（综合、Netflix、游戏、隐私、高性价比）、一键复制优惠码反馈、Ctrl+K 全局即时搜索、深度评测文章参数路由。
- **侧边栏与吸底推荐**：主推品牌 **闪电鼠** 独占侧边栏 `✦ 编辑之选` 与移动端吸底浮窗。
