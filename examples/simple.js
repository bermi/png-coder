#!/usr/bin/env node

const fs = require('fs');
const PNG = require('../lib/png-coder').PNG;

const png = new PNG({
  filterType: -1
});

const src = fs.createReadStream(process.argv[2]);
const dst = fs.createWriteStream(process.argv[3] || 'out.png');


png.on('parsed', () => {

  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2;

      if (Math.abs(png.data[idx] - png.data[idx + 1]) <= 1 && Math.abs(png.data[idx + 1] - png.data[idx + 2]) <= 1)
        png.data[idx] = png.data[idx + 1] = png.data[idx + 2];

    }
  }

  png.pack().pipe(dst);
});

src.pipe(png);