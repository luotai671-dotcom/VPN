const fs = require('fs');

function createIco32() {
  const width = 32;
  const height = 32;
  
  // Create 32x32 pixel buffer (top-to-bottom for drawing, then flip bottom-to-top for DIB)
  const pixels = Array.from({ length: height }, () => Array(width).fill([0, 0, 0, 0]));

  // Helper to set pixel
  function setPixel(x, y, r, g, b, a = 255) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      pixels[y][x] = [b, g, r, a];
    }
  }

  // Draw 翻墙怪 in 32x32 grid:
  // 1. Horns at top: (8,1) to (11,7) and (20,7) to (23,1) in neon green (#34d399 -> 52, 211, 153)
  for (let dy = 0; dy <= 6; dy++) {
    const lx = 11 - Math.floor(dy * 0.5);
    const rx = 20 + Math.floor(dy * 0.5);
    setPixel(lx, 2 + dy, 52, 211, 153);
    setPixel(lx - 1, 2 + dy, 52, 211, 153);
    setPixel(rx, 2 + dy, 52, 211, 153);
    setPixel(rx + 1, 2 + dy, 52, 211, 153);
  }

  // 2. Shield / Face from y=8 to y=29
  for (let y = 8; y <= 29; y++) {
    // Shield width narrows towards bottom
    let span = 11;
    if (y > 20) {
      span = Math.max(1, 11 - Math.floor((y - 20) * 1.2));
    }
    const left = 16 - span;
    const right = 15 + span;
    for (let x = left; x <= right; x++) {
      // Border or interior
      if (x === left || x === right || y === 8 || y === 29) {
        setPixel(x, y, 38, 112, 79); // #26704f
      } else {
        setPixel(x, y, 25, 89, 60); // #19593c
      }
    }
  }

  // 3. Cyber eyes at y=12, x=9..12 and x=19..22 in neon mint
  for (let x = 9; x <= 12; x++) {
    setPixel(x, 12, 52, 211, 153);
    setPixel(x, 13, 52, 211, 153);
  }
  for (let x = 19; x <= 22; x++) {
    setPixel(x, 12, 52, 211, 153);
    setPixel(x, 13, 52, 211, 153);
  }
  // Eye pupils
  setPixel(11, 12, 14, 54, 36);
  setPixel(20, 12, 14, 54, 36);

  // 4. Center Lightning bolt in white & mint:
  // (16,14) -> (12,21) -> (15,21) -> (13,28) -> (19,19) -> (16,19)
  const bolt = [
    [16, 14], [17, 14],
    [15, 15], [16, 15],
    [14, 16], [15, 16],
    [13, 17], [14, 17],
    [12, 18], [13, 18],
    [12, 19], [13, 19], [14, 19], [15, 19], [16, 19],
    [14, 20], [15, 20],
    [13, 21], [14, 21],
    [14, 22], [15, 22],
    [14, 23], [15, 23],
    [15, 24], [16, 24],
    [15, 25], [16, 25],
    [15, 26]
  ];
  for (const [bx, by] of bolt) {
    setPixel(bx, by, 255, 255, 255);
  }

  // Build binary ICO
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type
  icoHeader.writeUInt16LE(1, 4); // count: 1

  const dibHeaderSize = 40;
  const pixelDataSize = width * height * 4;
  const maskDataSize = (width / 8) * height; // 32/8 * 32 = 128 bytes
  const bytesInRes = dibHeaderSize + pixelDataSize + maskDataSize;

  const icoDir = Buffer.alloc(16);
  icoDir.writeUInt8(width, 0);
  icoDir.writeUInt8(height, 1);
  icoDir.writeUInt8(0, 2); // color count
  icoDir.writeUInt8(0, 3); // reserved
  icoDir.writeUInt16LE(1, 4); // planes
  icoDir.writeUInt16LE(32, 6); // bit count
  icoDir.writeUInt32LE(bytesInRes, 8);
  icoDir.writeUInt32LE(6 + 16, 12); // offset

  const dibHeader = Buffer.alloc(40);
  dibHeader.writeUInt32LE(40, 0); // biSize
  dibHeader.writeInt32LE(width, 4); // biWidth
  dibHeader.writeInt32LE(height * 2, 8); // biHeight (doubled for mask)
  dibHeader.writeUInt16LE(1, 12); // biPlanes
  dibHeader.writeUInt16LE(32, 14); // biBitCount
  dibHeader.writeUInt32LE(0, 16); // biCompression = BI_RGB
  dibHeader.writeUInt32LE(pixelDataSize + maskDataSize, 20); // biSizeImage
  dibHeader.writeInt32LE(0, 24); // biXPelsPerMeter
  dibHeader.writeInt32LE(0, 28); // biYPelsPerMeter
  dibHeader.writeUInt32LE(0, 32); // biClrUsed
  dibHeader.writeUInt32LE(0, 36); // biClrImportant

  const pixelBuffer = Buffer.alloc(pixelDataSize);
  let pIdx = 0;
  // DIB is bottom-to-top
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const [b, g, r, a] = pixels[y][x];
      pixelBuffer.writeUInt8(b, pIdx++);
      pixelBuffer.writeUInt8(g, pIdx++);
      pixelBuffer.writeUInt8(r, pIdx++);
      pixelBuffer.writeUInt8(a, pIdx++);
    }
  }

  // Mask buffer (1 bit per pixel, 0 for opaque / alpha-handled)
  const maskBuffer = Buffer.alloc(maskDataSize, 0);

  const fullIco = Buffer.concat([icoHeader, icoDir, dibHeader, pixelBuffer, maskBuffer]);
  return fullIco;
}

const ico = createIco32();
fs.writeFileSync('favicon.ico', ico);
fs.writeFileSync('assets/favicon.ico', ico);
console.log('Successfully created favicon.ico and assets/favicon.ico, size:', ico.length);
