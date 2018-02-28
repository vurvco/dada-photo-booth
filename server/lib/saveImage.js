'use strict';

const util = require('util');
const writeFile = util.promisify(require('fs').writeFile);

// h/t: https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
const decodeBase64Image = (data) => {
  const matches = data.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    return new Error(`Invalid input string: ${matches}`);
  }

  return {
    type: matches[1],
    data: Buffer.from(matches[2], 'base64')
  };
};

const saveImage = (payload) => {
  const imageBuffer = decodeBase64Image(payload);
  const filename = `cropped.jpg`;
  console.log('~~~Writing file.\n');
  return writeFile(filename, imageBuffer.data);
};

module.exports = saveImage;
