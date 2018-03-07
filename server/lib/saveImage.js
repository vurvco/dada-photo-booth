'use strict';

const util = require('util');
const writeFile = util.promisify(require('fs').writeFile);

const decodeBuffer = (data) => {
  return Buffer.from(data, 'base64');
};

// h/t: https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
const decodeBase64Image = (data) => {
  const matches = data.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    return new Error(`Invalid input string: ${matches}`);
  }

  return Buffer.from(matches[2], 'base64');
};

const saveImage = (payload, filename) => {
  const imageBuffer = Buffer.isBuffer(payload)
    ? decodeBuffer(payload)
    : decodeBase64Image(payload);
  console.log(`~~~Writing ${filename}.\n`);
  return writeFile(filename, imageBuffer);
};

module.exports = saveImage;
