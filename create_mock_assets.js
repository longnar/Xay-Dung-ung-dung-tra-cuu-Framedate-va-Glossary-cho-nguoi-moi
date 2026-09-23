const fs = require('fs');
const path = require('path');

// Base64 transparent 1x1 PNG data
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const pngBuffer = Buffer.from(pngBase64, 'base64');

// Basic placeholder SVG content
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2" rx="8"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#3b82f6" font-size="12" font-family="sans-serif">Mock</text>
</svg>`;

const assets = [
  // select/
  { dir: 'select', name: 'idolshowdownicon-1.png', type: 'png' },
  { dir: 'select', name: 'image.svg', type: 'svg' },
  { dir: 'select', name: 'rectangle-37.png', type: 'png' },
  { dir: 'select', name: 'rectangle-42.svg', type: 'svg' },
  { dir: 'select', name: 'rectangle-43.png', type: 'png' },
  { dir: 'select', name: 'rectangle-44.svg', type: 'svg' },
  { dir: 'select', name: 'rectangle-45.png', type: 'png' },
  { dir: 'select', name: 'rectangle-46.png', type: 'png' },
  { dir: 'select', name: 'rectangle-47.png', type: 'png' },
  { dir: 'select', name: 'rectangle-48.png', type: 'png' },
  { dir: 'select', name: 'rectangle-49.svg', type: 'svg' },

  // main/
  { dir: 'main', name: 'idolshowdownnextfesbiboo-1-3.png', type: 'png' },
  { dir: 'main', name: 'idolshowdownnf-logo-1.png', type: 'png' },
  { dir: 'main', name: 'line-1.svg', type: 'svg' },
  { dir: 'main', name: 'line-2.svg', type: 'svg' },
  { dir: 'main', name: 'rectangle-47.svg', type: 'svg' },
  { dir: 'main', name: 'rectangle-48.svg', type: 'svg' },
  { dir: 'main', name: 'rectangle-49.svg', type: 'svg' },
  { dir: 'main', name: 'rectangle-58.svg', type: 'svg' },

  // infor/
  { dir: 'infor', name: 'idolshowdownnextfesbiboo-1-3.png', type: 'png' },
  { dir: 'infor', name: 'idolshowdownnf-logo-1.png', type: 'png' },
  { dir: 'infor', name: 'line-1.svg', type: 'svg' },
  { dir: 'infor', name: 'line-2.svg', type: 'svg' },
  { dir: 'infor', name: 'rectangle-47.svg', type: 'svg' },
  { dir: 'infor', name: 'rectangle-48.svg', type: 'svg' },
  { dir: 'infor', name: 'rectangle-49.svg', type: 'svg' },
  { dir: 'infor', name: 'rectangle-58.svg', type: 'svg' },

  // golosary/
  { dir: 'golosary', name: 'idolshowdownicon-1.png', type: 'png' },
  { dir: 'golosary', name: 'rectangle-59.svg', type: 'svg' },
  { dir: 'golosary', name: 'rectangle-60.svg', type: 'svg' }
];

console.log('Generating missing mock image assets...');
let count = 0;

assets.forEach(asset => {
  const dirPath = path.join(__dirname, asset.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = path.join(dirPath, asset.name);
  if (!fs.existsSync(filePath)) {
    if (asset.type === 'png') {
      fs.writeFileSync(filePath, pngBuffer);
    } else {
      fs.writeFileSync(filePath, svgContent);
    }
    count++;
  }
});

console.log(`Done! Created ${count} missing mock assets.`);
