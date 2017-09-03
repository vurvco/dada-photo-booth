'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(require('fs').writeFile);

const pwd = process.cwd();
const processing = `processing-java --sketch=${pwd} --output=${pwd}/output --force --run`;
console.log({ processing });
const gifIt = 'gifsicle --delay=3 -O3 --loop artifacts/f*.gif > glitch.gif';
const cleanUp = 'rm cropped.jpg';

// h/t: https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
const decodeBase64Image = (data) => {
  const str = JSON.parse(data.toString());
  const matches = str.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
};

// run the processing sketch
const gifOut = (filename) => {
  exec(processing)
    .then(() => exec(gifIt))
    .then(() => exec(cleanUp));
};

// get the image from the request object
const main = (request, reply) => {
  // request.payload is a Buffer
  const { payload } = request;
  const imageBuffer = decodeBase64Image(payload);
  const filename = `cropped.jpg`;
  writeFile(filename, imageBuffer.data)
    .then(() => {
      reply('received').code(200);
      gifOut(filename);
    })
    .catch(err => err);
};

// kick off postImg here

module.exports.gifOut = main;
