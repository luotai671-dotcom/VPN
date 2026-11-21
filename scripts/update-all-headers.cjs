const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 统一的 AI 下拉 HTML
function makeAiNav(isActive = false) {
  const activeClass = isActive ? 'nav-active' : '';
  return `<div class="nav-item-dropdown" id="nav-ai-dropdown">
        <div class="nav-item-dropdown-row">
          <a href="/ai-tools" class="${activeClass}">AI 工具 <span class="nav-arrow">⌄</span></a>
          <button class="mobile-dropdown-btn" type="button" aria-label="展开 AI 工具分类">⌄</button>
        </div>
        <div class="dropdown-panel" aria-label="AI 工具分类子菜单">
          <div class="dropdown-grid">
            <a href="/ai-tools/shadowrocket" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5"/><path d="M15 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Shadowrocket (小火箭)</div>
                <div class="dropdown-item-desc">iOS 端 AI 专线分流与规则配置</div>
              </div>
            </a>
            <a href="/ai-tools/clash-verge" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Verge Rev</div>
                <div class="dropdown-item-desc">PC 端全平台 AI 节点与 TUN 模式加速</div>
              </div>
            </a>
            <a href="/ai-tools/clash-meta" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">Clash Meta / Mihomo</div>
                <div class="dropdown-item-desc">高性能内核与 AI 专属分流规则组</div>
              </div>
            </a>
            <a href="/ai-tools/chatgpt-claude-routing" class="dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
              </span>
              <div class="dropdown-item-text">
                <div class="dropdown-item-title">ChatGPT / Claude 专用分流</div>
                <div class="dropdown-item-desc">防降智纯净 IP 节点与客户端配置</div>
              </div>
            </a>
          </div>
          <div class="dropdown-footer">
            <a href="/ai-tools" class="dropdown-footer-link">查看全部 AI 工具与分流配置指南 <span>→</span></a>
          </div>
        </div>
      </div>`;
}

// 遍历目录寻找所有 html 文件
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file.startsWith('.')) return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allHtml = getAllHtmlFiles(rootDir);
console.log(`共发现 ${allHtml.length} 个 HTML 文件，开始批量升级导航...`);

let updatedCount = 0;
allHtml.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  const isAiPage = f.includes('ai-tools') || f.endsWith('ai.html') || f.endsWith('ai-tools.html');

  // 1. 如果包含旧的 nav-ai-dropdown，进行替换
  if (content.includes('id="nav-ai-dropdown"')) {
    const aiNavRegex = /<div class="nav-item-dropdown" id="nav-ai-dropdown">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    if (aiNavRegex.test(content)) {
      content = content.replace(aiNavRegex, makeAiNav(isAiPage));
    }
  }

  // 2. 如果包含旧的单链接 <a href="ai.html">AI 工具</a>
  if (content.includes('<a href="ai.html"') && !content.includes('id="nav-ai-dropdown"')) {
    content = content.replace(/<a href="ai\.html"[^>]*>AI 工具.*?<\/a>/g, makeAiNav(isAiPage));
  }

  // 3. 页脚链接标准化：<a href="ai.html">AI 工具推荐</a> -> <a href="/ai-tools">AI 工具推荐</a>
  content = content.replace(/<a href="ai\.html">AI 工具推荐<\/a>/g, '<a href="/ai-tools">AI 工具推荐</a>');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  }
});

console.log(`✓ 成功更新 ${updatedCount} 个 HTML 文件的 AI 导航组件！`);
