'use strict';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const goUp = 'cd ..';
const processing = 'processing-java --sketch=`pwd` --output=`pwd`/output --force --run';
const gifIt = 'gifsicle --delay=3 -O3 --loop artifacts/f*.gif > glitch.gif';

const gifOut = (request, reply) => {
  // request will be application/x-www-form-urlencode
  // get the handle of the twitter poster
  // get the image from the request object
  // save the image using the handle
  // run the processing sketch
  exec(goUp) // start with
    .then(() => exec(processing))
    .then(() => exec(gifIt))
    .then(() => reply('gif\'d').code(201))
    .catch((err) => reply({ err }).code(400));
};

// kick off postImg here

module.exports.gifOut = gifOut;
