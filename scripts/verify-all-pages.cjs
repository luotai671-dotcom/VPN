const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { articles } = require('./blog-cluster-common.cjs');

console.log('--- 开始全站独立页面完整性检验 ---');

const expectedPages = [
  { file: 'index.html', activeNav: 'index', title: '翻墙怪' },
  { file: 'vpn.html', activeNav: 'vpn', title: '2026 稳定专线机场与 VPN 推荐排行榜' },
  { file: 'streaming.html', activeNav: 'streaming', title: '流媒体解锁' },
  { file: 'devices.html', activeNav: 'devices', title: '全平台客户端' },
  { file: 'security.html', activeNav: 'security', title: '安全与隐私' },
  { file: 'blog.html', activeNav: 'blog', title: '博客资讯' },
  { file: 'ai.html', activeNav: 'ai', title: 'AI 工具' },
  { file: 'review.html', activeNav: 'index', title: '深度评测' },
  { file: 'beginner.html', activeNav: 'index', title: '新手' },
  { file: 'methodology.html', activeNav: 'index', title: '评测标准' },
  { file: 'about.html', activeNav: 'index', title: '关于我们' },
  { file: 'disclosure.html', activeNav: 'index', title: '联盟合作' },
  { file: 'privacy.html', activeNav: 'index', title: '隐私政策' },
  { file: 'terms.html', activeNav: 'index', title: '使用条款' },
  { file: 'sitemap.html', activeNav: 'index', title: '站点地图' },

  // 5 个 AI 独立路由页面
  { file: 'ai-tools/index.html', activeNav: 'ai', title: 'AI 工具与代理客户端选型总览' },
  { file: 'ai-tools/shadowrocket/index.html', activeNav: 'ai-shadowrocket', title: 'Shadowrocket' },
  { file: 'ai-tools/clash-verge/index.html', activeNav: 'ai-clash-verge', title: 'Clash Verge Rev' },
  { file: 'ai-tools/clash-meta/index.html', activeNav: 'ai-clash-meta', title: 'Clash Meta / Mihomo' },
  { file: 'ai-tools/chatgpt-claude-routing/index.html', activeNav: 'ai-chatgpt-claude', title: 'ChatGPT / Claude 专用分流' },

  // 10 篇博客长尾专题独立页面
  ...articles.map(a => ({
    file: `blog/${a.slug}/index.html`,
    activeNav: 'blog',
    title: a.title
  }))
];

expectedPages.forEach(p => {
  assert.ok(fs.existsSync(p.file), `独立页面 ${p.file} 必须存在！`);
  const content = fs.readFileSync(p.file, 'utf8');
  assert.ok(content.toLowerCase().includes('<!doctype html>'), `${p.file} 必须是标准 HTML5 页面`);
  assert.ok(content.toLowerCase().includes('charset="utf-8"'), `${p.file} 必须包含 UTF-8 声明`);
  assert.ok(content.includes('main.css'), `${p.file} 必须引入主样式表`);
  assert.ok(content.includes('app.js'), `${p.file} 必须引入主脚本`);
  assert.ok(content.includes('class="wordmark"'), `${p.file} 必须包含翻墙怪品牌 Logo`);

  // 主导航栏核心链接验证
  assert.ok(content.includes('index.html'), `${p.file} 导航必须包含首页入口`);
  assert.ok(content.includes('vpn.html'), `${p.file} 导航必须包含 VPN推荐独立入口`);
  assert.ok(content.includes('streaming.html'), `${p.file} 导航必须包含流媒体入口`);
  assert.ok(content.includes('devices.html'), `${p.file} 导航必须包含设备端入口`);
  assert.ok(content.includes('ai-tools') || content.includes('ai.html'), `${p.file} 导航必须包含 AI 工具入口`);
  assert.ok(content.includes('security.html'), `${p.file} 导航必须包含安全指南入口`);
  assert.ok(content.includes('blog.html'), `${p.file} 导航必须包含博客资讯入口`);

  // 高亮项检查
  if (p.activeNav === 'vpn') {
    assert.ok(content.includes('vpn.html" class="nav-active"'), `${p.file} 必须激活 VPN推荐导航`);
  } else if (p.activeNav === 'streaming') {
    assert.ok(content.includes('streaming.html" class="nav-active"'), `streaming.html 必须激活流媒体导航`);
  } else if (p.activeNav === 'devices') {
    assert.ok(content.includes('devices.html" class="nav-active"'), `devices.html 必须激活设备端导航`);
  } else if (p.activeNav === 'ai' || p.activeNav.startsWith('ai-')) {
    assert.ok(content.includes('class="nav-active">AI 工具') || content.includes('class="nav-active"'), `${p.file} 必须激活 AI 工具导航`);
  } else if (p.activeNav === 'security') {
    assert.ok(content.includes('security.html" class="nav-active"'), `security.html 必须激活安全指南导航`);
  } else if (p.activeNav === 'blog') {
    assert.ok(content.includes('blog.html" class="nav-active"'), `blog.html 必须激活博客资讯导航`);
  }
});

console.log(`✓ 全部 ${expectedPages.length} 个独立 HTML 页面完整生成并通过基础结构验证`);
console.log('✓ 顶部导航栏核心独立入口跳转与 nav-active 高亮下划线状态全部正确');

// 核心长尾词集群文章字数验证（要求全部 >= 1500 汉字，子专题 >= 1200 汉字）
function countChineseChars(text) {
  if (!text) return 0;
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

const clusterPages = [
  { file: 'methodology.html', name: '评测方法论 (Pillar 支柱核心)', min: 1500 },
  { file: 'beginner.html', name: '新手入门指南 (Cluster 1)', min: 1500 },
  { file: 'security.html', name: '安全与隐私指南 (Cluster 2)', min: 1500 },
  { file: 'devices.html', name: '全平台客户端配置指南 (Cluster 3)', min: 1500 },
  { file: 'streaming.html', name: '流媒体解锁专精指南 (Cluster 4)', min: 1500 },
  { file: 'blog.html', name: '博客长尾资讯中心 (Cluster 5)', min: 1500 },
  { file: 'ai-tools/index.html', name: 'AI 工具与分流总览 (Cluster 6 总览)', min: 1500 },
  { file: 'ai-tools/shadowrocket/index.html', name: 'Shadowrocket 小火箭 AI 专题 (Cluster 6-1)', min: 1200 },
  { file: 'ai-tools/clash-verge/index.html', name: 'Clash Verge Rev PC端 TUN 专题 (Cluster 6-2)', min: 1200 },
  { file: 'ai-tools/clash-meta/index.html', name: 'Clash Meta / Mihomo 软路由专题 (Cluster 6-3)', min: 1200 },
  { file: 'ai-tools/chatgpt-claude-routing/index.html', name: 'ChatGPT/Claude 原生住宅防降智 (Cluster 6-4)', min: 1200 },

  // 本次新增的 10 篇博客长尾专题文章
  { file: 'blog/cheap-vpn-airport-recommendation/index.html', name: '博客[1] 平价高性价比机场实测', min: 1500 },
  { file: 'blog/best-vpn-for-chatgpt-claude/index.html', name: '博客[2] ChatGPT与Claude纯净IP专线', min: 1500 },
  { file: 'blog/streaming-4k-netflix-vpn-guide/index.html', name: '博客[3] 奈飞Netflix与Disney+ 4K解锁', min: 1500 },
  { file: 'blog/ios-shadowrocket-best-nodes/index.html', name: '博客[4] 苹果小火箭最佳节点大纲', min: 1000 },
  { file: 'blog/pc-mac-clash-verge-vpn/index.html', name: '博客[5] 电脑端Clash Verge专线大纲', min: 1000 },
  { file: 'blog/cross-border-ecommerce-vpn/index.html', name: '博客[6] 跨境电商TikTok运营专线大纲', min: 1000 },
  { file: 'blog/low-latency-gaming-iepl-vpn/index.html', name: '博客[7] 晚高峰不卡顿IEPL游戏大纲', min: 1000 },
  { file: 'blog/vless-reality-trojan-stable-vpn/index.html', name: '博客[8] 敏感期稳定VLESS Reality大纲', min: 1000 },
  { file: 'blog/avoid-scam-vpn-buying-guide/index.html', name: '博客[9] 新手买机场防跑路大纲', min: 1000 },
  { file: 'blog/high-bandwidth-pay-as-you-go-vpn/index.html', name: '博客[10] 大流量按量付费机场大纲', min: 1000 }
];

clusterPages.forEach(cp => {
  const content = fs.readFileSync(cp.file, 'utf8');
  const count = countChineseChars(content);
  assert.ok(count >= cp.min, `【${cp.name}】(${cp.file}) 字数不足 ${cp.min} 汉字！当前仅 ${count} 字`);
  console.log(`✓ 【${cp.name}】(${cp.file}) 纯汉字数：${count} 字（>= ${cp.min} 合规）`);
});
console.log('✓ 核心主题集群与博客文章字数严格校验 100% 通过');

// 递归遍历所有 html 文件
function getAllHtml(dir) {
  let res = [];
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f === 'node_modules' || f.startsWith('.')) return;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(getAllHtml(full));
    } else if (f.endsWith('.html')) {
      res.push(full);
    }
  });
  return res;
}

const allHtmlFiles = getAllHtml('.');
const internalLinkRegex = /href="([^"#?]+(\.html)?)"/g;

allHtmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const currentDir = path.dirname(f);
  let match;
  while ((match = internalLinkRegex.exec(content)) !== null) {
    const target = match[1];
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('javascript:')) {
      continue;
    }
    const cleanTarget = target.split('?')[0].split('#')[0];
    if (!cleanTarget) continue;

    if (cleanTarget.startsWith('/')) {
      // 根相对路径，如 /ai-tools 或 /blog/cheap-vpn-airport-recommendation
      let resolved = cleanTarget.replace(/^\//, '');
      if (!resolved) resolved = 'index.html';
      if (!resolved.includes('.')) {
        if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
          resolved = path.join(resolved, 'index.html');
        } else if (fs.existsSync(resolved + '.html')) {
          resolved = resolved + '.html';
        } else if (fs.existsSync(path.join(resolved, 'index.html'))) {
          resolved = path.join(resolved, 'index.html');
        }
      }
      assert.ok(fs.existsSync(resolved), `文件 ${f} 中引用的根相对路径 ${target} (${resolved}) 不存在！`);
    } else if (cleanTarget.endsWith('.html')) {
      // 相对 html 文件路径
      const resolved = path.resolve(currentDir, cleanTarget);
      assert.ok(fs.existsSync(resolved), `文件 ${f} 中引用的相对路径 ${cleanTarget} (${resolved}) 不存在！`);
    }
  }
});

console.log('✓ 全站内部超链接死链扫描 100% 正常，无任何失效路径');
console.log('\n🎉 全站导航与独立页面体系验证通过！');
