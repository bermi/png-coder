/**
 * Created by mehsisil on 4/24/15.
 */

const fs = require('fs');
const PNG = require('../../').PNG;

const png = new PNG({
  filterType: -1
});

const src = fs.createReadStream(process.argv[2] || './examples/test/gradient_16bit.png');
const dst = fs.createWriteStream(process.argv[3] || '/examples/test/out/gradient_16bit.png');


png.on('parsed', () => {

  png.pack().pipe(dst);
});

src.pipe(png);