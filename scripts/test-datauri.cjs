const fs = require('fs');

// The new master vector logo for 翻墙怪 (Fan Qiang Guai)
// Designed for both Desktop Navbar (38x38) and Browser Tab Favicon (16x16 / 32x32)
const logoSvgClean = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
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

  <!-- 灵动破壁怪兽尖角 (几何天线，突破限制) -->
  <path d="M19 17 L11 5 C9.5 3 12 1.5 14 3 L23.5 12 Z" fill="url(#fqg-horn)"/>
  <path d="M45 17 L53 5 C54.5 3 52 1.5 50 3 L40.5 12 Z" fill="url(#fqg-horn)"/>

  <!-- 机能怪兽头部护盾 (精细倒角几何) -->
  <path d="M14 16 C14 13.5 16 11.5 18.5 11.5 H45.5 C48 11.5 50 13.5 50 16 V35 C50 46.5 41 55.5 32 58.5 C23 55.5 14 46.5 14 35 Z" 
        fill="url(#fqg-body)" stroke="#26704f" stroke-width="2.2" stroke-linejoin="round"/>

  <!-- 左右防火墙垛阻断纹理 (被穿透的界限) -->
  <path d="M18 29 H25 M39 29 H46" stroke="#2e855c" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M17 37 H23 M41 37 H47" stroke="#226645" stroke-width="2" stroke-linecap="round"/>

  <!-- 极客微光双眼 (高辨识度数码视镜) -->
  <rect x="20" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <rect x="36" y="19" width="8" height="5.5" rx="2" fill="#34d399"/>
  <circle cx="24" cy="21.75" r="1.3" fill="#0e3624"/>
  <circle cx="40" cy="21.75" r="1.3" fill="#0e3624"/>

  <!-- 破壁穿透闪电核心 (⚡ 突破审查高墙) -->
  <polygon points="34.5,23 23,39 31.5,39 27,53.5 41.5,36 33.5,36" 
           fill="url(#fqg-bolt)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

// Generate Data URI
const dataUri = `data:image/svg+xml,${encodeURIComponent(logoSvgClean)}`;

console.log('Clean SVG length:', logoSvgClean.length);
console.log('Data URI length:', dataUri.length);
console.log('Data URI preview:', dataUri.slice(0, 100));
