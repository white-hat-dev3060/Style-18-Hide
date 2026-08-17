// Run with: node make-images.js
// Generates SVG placeholder images for shoes

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const shoes = [
  { id: 1, label: "Premium Black", sub: "Leather Slip-On",       bg: "#1a1a1a", sole: "#333",    upper: "#555" },
  { id: 2, label: "Classic Comfort", sub: "Dress Shoe",          bg: "#1c1810", sole: "#5a4020", upper: "#8b6340" },
  { id: 3, label: "Premium Brown", sub: "Leather Slip-On",       bg: "#2a1f10", sole: "#6b4c20", upper: "#c4a46e" },
  { id: 4, label: "Black Horsebit", sub: "Tassel Loafer 🎱",     bg: "#0d0d0d", sole: "#222",    upper: "#444" },
  { id: 5, label: "SPECIAL: Croc", sub: "Embossed Loafers",      bg: "#0f1a0f", sole: "#2a4a2a", upper: "#4a7a4a" },
];

function makeSVG(s) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="bg${s.id}" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${s.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="glow${s.id}" cx="50%" cy="60%" r="60%">
      <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background -->
  <rect width="400" height="300" fill="url(#bg${s.id})"/>
  <rect width="400" height="300" fill="url(#glow${s.id})"/>
  <!-- Border -->
  <rect x="6" y="6" width="388" height="288" fill="none" stroke="#c9a84c" stroke-opacity="0.25" stroke-width="1.5" rx="8"/>
  <!-- Shoe Silhouette - Upper -->
  <path d="M55 195 C55 165 95 138 160 138 C215 138 235 118 282 112 C332 107 352 128 348 155 C344 177 308 185 298 192 L318 200 C330 205 340 212 334 220 C328 228 298 227 282 224 L88 224 C62 224 52 213 55 195 Z"
    fill="${s.upper}" stroke="#c9a84c" stroke-opacity="0.4" stroke-width="1.5"/>
  <!-- Sole -->
  <path d="M68 210 C68 220 82 228 100 228 L282 228 C300 228 318 225 320 218 C322 211 310 205 298 202 L298 210 Z"
    fill="${s.sole}" stroke="#c9a84c" stroke-opacity="0.3" stroke-width="1"/>
  <!-- Highlight / shine -->
  <ellipse cx="195" cy="148" rx="85" ry="12" fill="#ffffff" opacity="0.06" transform="rotate(-8 195 148)"/>
  <!-- Logo bar -->
  <rect x="0" y="255" width="400" height="45" fill="#000000" fill-opacity="0.5"/>
  <text x="200" y="276" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#c9a84c">Style 18 Hide</text>
  <text x="200" y="292" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#888">Le Jao ®</text>
  <!-- Shoe name top -->
  <text x="200" y="38" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="600" fill="#ffffff" opacity="0.85">${s.label}</text>
  <text x="200" y="56" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#c9a84c" opacity="0.75">${s.sub}</text>
</svg>`;
}

shoes.forEach(s => {
  const svg = makeSVG(s);
  fs.writeFileSync(path.join(dir, `shoe${s.id}.jpg`), svg);
  console.log(`Created images/shoe${s.id}.jpg (SVG)`);
});

// Placeholder
const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#1a1a1a"/>
  <rect x="6" y="6" width="388" height="288" fill="none" stroke="#c9a84c" stroke-opacity="0.2" stroke-width="1" rx="8"/>
  <text x="200" y="155" text-anchor="middle" font-family="Arial" font-size="14" fill="#555">No Image</text>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-size="11" fill="#c9a84c" opacity="0.5">Style 18 Hide</text>
</svg>`;
fs.writeFileSync(path.join(dir, 'placeholder.png'), placeholder);
console.log('Created images/placeholder.png (SVG)');
console.log('\nAll images generated!');
