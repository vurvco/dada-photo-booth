'use strict';

const util = require('util');
const { copyFile } = require('fs');

const copyFilePromise = util.promisify(copyFile);

const copyImage = (directory) => {
  return copyFilePromise('./croppedByServer.jpg', `${directory}/croppedByServer.jpg`);
};

module.exports = copyImage;
