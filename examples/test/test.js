
const fs = require('fs');
const PNG = require('../../').PNG;


fs.readdir(`${__dirname}/img/`, (err, files) => {
    if (err) throw err;

    files.forEach(file => {

        if (!file.match(/\.png$/i))
            return;

        fs.createReadStream(`${__dirname}/img/${file}`)
            .pipe(new PNG())
            .on('parsed', function() {

                if (this.gamma) {
                    for (let y = 0; y < this.height; y++) {
                        for (let x = 0; x < this.width; x++) {
                            const idx = (this.width * y + x) << 2;

                            for (let i = 0; i < 3; i++) {
                                let sample = this.data[idx + i] / 255;
                                sample = Math.pow(sample, 1 / 2.2 / this.gamma);
                                this.data[idx + i] = Math.round(sample * 255);
                            }
                        }
                    }
                }

                this.pack()
                    .pipe(fs.createWriteStream(`${__dirname}/out/${file}`));

            });

    });
});
