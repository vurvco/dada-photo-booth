'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const pwd = process.cwd();

const processing = `processing-java --sketch=${pwd} --output=${pwd}/output --force --run`;
const gifIt = 'gifsicle --delay=3 -O3 --loop artifacts/f*.gif > glitch.gif';
const cleanUp = 'rm cropped.jpg';

// run the processing sketch
const gifOut = () => {
  console.log(`Starting to process gif.`);
  exec(processing)
    .then(() => exec(gifIt))
    .then(() => exec(cleanUp));
};

module.exports = gifOut;
