const fs = require('fs');

// We are designing an elegant, ultra-sleek, modern cyber logo for 「翻墙怪」.
// Let's create two refined variations:
// Style A: "Cyber Wall-Breaker Beast" (Shield + Tech Horns + Cyber Visor + Central Lightning Breach)
// - Transparent background
// - High contrast, razor-sharp at 16x16, 32x32, 38x38
// - Professional tech brand aesthetic like Cloudflare / WireGuard / Clash Meta

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="fqg-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E6B4B"/>
      <stop offset="100%" stop-color="#113626"/>
    </linearGradient>
    <linearGradient id="fqg-neon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="fqg-bolt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>

  <!-- 灵动破壁怪兽尖角 (几何天线) -->
  <path d="M19 16 L12 5 C10.5 3 13 1.5 14.8 3 L23.5 11 Z" fill="url(#fqg-neon)"/>
  <path d="M45 16 L52 5 C53.5 3 51 1.5 49.2 3 L40.5 11 Z" fill="url(#fqg-neon)"/>

  <!-- 机能怪兽头部护盾 (精细倒角) -->
  <path d="M14 15 C14 12.8 15.8 11 18 11 H46 C48.2 11 50 12.8 50 15 V36 C50 47.5 40.5 56.5 32 59.5 C23.5 56.5 14 47.5 14 36 Z" 
        fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>

  <!-- 左右对称被破开的防火墙基座线条 -->
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#246848" stroke-width="2" stroke-linecap="round"/>

  <!-- 极客数码微光双眼 -->
  <rect x="20" y="19" width="8" height="6" rx="2" fill="url(#fqg-neon)"/>
  <rect x="36" y="19" width="8" height="6" rx="2" fill="url(#fqg-neon)"/>
  <circle cx="24" cy="22" r="1.3" fill="#0c2d1e"/>
  <circle cx="40" cy="22" r="1.3" fill="#0c2d1e"/>

  <!-- 贯穿高墙的金色/青翠破壁闪电核心 (⚡ 突破审查) -->
  <polygon points="34.5,23 23,39 31.5,39 27,54 41.5,36 33.5,36" 
           fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

console.log('Logo SVG defined, length:', logoSvg.length);
