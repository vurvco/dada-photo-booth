'use strict';

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const goUp = 'cd ..';
const processing = 'processing-java --sketch=`pwd` --output=`pwd`/output --force --run';
const gifIt = 'gifsicle --delay=3 -O3 --loop artifacts/f*.gif > glitch.gif';

function decodeBase64Image (dataString) {
  const str = JSON.parse(dataString.toString());
  console.log(typeof str);
  console.log(typeof str.image);
  const matches = str.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}

const gifOut = (request, reply) => {
  // request.payload is a Buffer
  const { payload } = request;
  const imageBuffer = decodeBase64Image(payload);
  console.log(imageBuffer);
  fs.writeFile('test.jpg', imageBuffer.data, (err) => {
    if (err) throw err;
    reply('received').code(200);
  });
  // get the handle of the twitter poster
  // get the image from the request object
  // save the image using the handle
  // run the processing sketch
  // exec(goUp) // start with
  //   .then(() => exec(processing))
  //   .then(() => exec(gifIt))
  //   .then(() => reply('gif\'d').code(201))
  //   .catch((err) => reply({ err }).code(400));
};

// kick off postImg here

module.exports.gifOut = gifOut;
