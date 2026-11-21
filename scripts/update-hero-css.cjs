const fs = require('fs');

// Read styles/main.css
let css = fs.readFileSync('styles/main.css', 'utf8');

// Check if hero-monster-emblem is already added
if (!css.includes('.hero-monster-emblem')) {
  const extraCss = `
/* 封面全新「翻墙怪」破壁机能徽章与动效 */
.hero-monster-emblem {
  position: absolute;
  width: 146px;
  height: 146px;
  top: 170px;
  left: 205px;
  filter: drop-shadow(0 0 28px rgba(52, 211, 153, 0.45)) drop-shadow(0 18px 38px rgba(0, 0, 0, 0.42));
  animation: heroFloat 4.5s ease-in-out infinite;
  z-index: 6;
}
.hero-monster-emblem svg {
  width: 100%;
  height: 100%;
  display: block;
}
@keyframes heroFloat {
  0%, 100% {
    transform: translateY(0px) rotate(1.5deg);
  }
  50% {
    transform: translateY(-8px) rotate(-1.5deg);
  }
}
@media (max-width: 1150px) {
  .hero-monster-emblem {
    left: 175px;
    width: 130px;
    height: 130px;
  }
}
@media (max-width: 900px) {
  .hero-monster-emblem {
    left: calc(50% - 60px);
    top: 140px;
    width: 120px;
    height: 120px;
  }
}
@media (max-width: 700px) {
  .hero-monster-emblem {
    left: calc(50% - 55px);
    top: 125px;
    width: 110px;
    height: 110px;
  }
}
`;
  css += extraCss;
  fs.writeFileSync('styles/main.css', css);
  console.log('✓ Updated styles/main.css with hero-monster-emblem styles');
} else {
  console.log('styles/main.css already contains hero-monster-emblem');
}
