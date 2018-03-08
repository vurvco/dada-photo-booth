/*
based on:
 - Simple Image Glitching Processing - datamoshing.com | 2016
 - a pixel sorting sketch from Jerome Martinez | 2017
 */

// output needs to be 1066 x 800

var capture;
var gif;
var img;
var imgFileName = 'vera';
var fileType = 'jpg';

var START_FRAME = 15;
var END_FRAME = 115;

const serverUrl = 'http://localhost:3000';

const socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};
const socket = io(serverUrl, socketOptions);

function preload () {
  // load an image from our library to set the canvas createCanvas
  img = loadImage(imgFileName + '.' + fileType); // eslint-disable-line no-undef
}

function setup () {
  var canvas = createCanvas(img.width, img.height); // eslint-disable-line no-undef
  canvas.parent('p5canvas');

  // allows the viewer to recreateCanvas and update surface to image file dimensions
  // surface.setResizable(true);
  // surface.setSize(img.width, img.height);

  // todo: tweak these settings
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  setupGif();

  // load image onto surface
  // todo: fix the fact that `capture` hides the image
  image(capture, 0, 0); // eslint-disable-line no-undef

  img.loadPixels();
  noStroke(); // eslint-disable-line no-undef

  // set the speed at which rectangles are created; 1 frame = 1 rectangle
  frameRate(30000); // eslint-disable-line no-undef
}

function draw () {
  var randomX = random(0, width);
  var randomY = random(0, height);
  var randomColor = img.get(randomX, randomY);

  var randomXOffset = random(0, 8);
  var randomYOffset = random(0, 8);

  var randomHeight = random(2, 3) + random(2, 6);
  var randomWidth = randomHeight * random(2, 7);
  var randomS = random(2, 6);

  fill(randomColor);
  rect(randomX + randomXOffset, randomY + randomYOffset, randomWidth, randomS);

  // apply a posterized filter effect to the colors being randomly generated
  filter(POSTERIZE, 6);
  /*
  filter(POSTERIZE, random(19,21));
  filter(INVERT);
  */

  if (frameCount > START_FRAME && frameCount < END_FRAME) {
    console.log(`saving frame #${frameCount}`);
    gif.addFrame(document.getElementById('defaultCanvas0'), {delay: 1, copy: true});
  }

  if (frameCount === END_FRAME) {
    console.log('done');
    // remove();
    gif.render();
  }
}

function setupGif () {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', (blob) => {
    console.log('~~~downloading...');
    // Blob is sent to server, where it is saved as a gif
    socket.emit('save_gif', blob);
    socket.on('saved_gif_response', (res) => console.log(res)); // 'ok' or 'not ok'
    setupGif();
  });
}
