'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(require('fs').writeFile);

const pwd = process.cwd();

const processing = `processing-java --sketch=${pwd} --output=${pwd}/output --force --run`;
const gifIt = 'gifsicle --delay=3 -O3 --loop artifacts/f*.gif > glitch.gif';
const cleanUp = 'rm cropped.jpg';

// h/t: https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
const decodeBase64Image = (data) => {
  const matches = data.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  return {
    type: matches[1],
    data: Buffer.from(matches[2], 'base64')
  };
};

// run the processing sketch
const gifOut = (filename) => {
  console.log(`Starting to process ${filename}.`);
  exec(processing)
    .then(() => exec(gifIt))
    .then(() => exec(cleanUp));
};

const main = (payload) => {
  const imageBuffer = decodeBase64Image(payload);
  const filename = `cropped.jpg`;
  return writeFile(filename, imageBuffer.data)
    .then(() => {
      return gifOut(filename);
    })
    .catch(err => {
      console.log('err in main catch', err);
      return err;
    });
};

module.exports.gifOut = main;
