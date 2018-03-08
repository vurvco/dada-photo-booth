import client from './socket';
import 'p5/lib/addons/p5.dom';

let capture;
let gif;
let img;
const imgFileName = 'croppedByServer';
const fileType = 'jpg';

const START_FRAME = 15;
const END_FRAME = 115;

function setupGif () {
  // eslint-disable-next-line no-undef
  gif = new GIF({
    // todo: how many workers?
    // todo: will changing quality speed it up?
    workers: 2,
    quality: 40
  });

  gif.on('finished', (blob) => {
    console.log('~~~Downloading.');
    client.emit('save_gif', blob);
    setupGif();
  });
}

export default function sketch (p) {
  p.preload = () => {
    console.log(`about to preload ${imgFileName}`);
    img = p.loadImage(imgFileName + '.' + fileType);
  };

  p.setup = () => {
    p.createCanvas(img.width, img.height);

    // todo: tweak these settings
    capture = p.createCapture(p.VIDEO);
    capture.size(320, 240);
    capture.hide();
    setupGif();

    p.image(capture, 0, 0);

    img.loadPixels();
    p.noStroke();

    // set the speed at which rectangles are created; 1 frame = 1 rectangle
    p.frameRate(30000);
  };

  p.draw = () => {
    const randomX = p.random(0, p.width);
    const randomY = p.random(0, p.height);
    const randomColor = img.get(randomX, randomY);

    const randomXOffset = p.random(0, 8);
    const randomYOffset = p.random(0, 8);

    const randomHeight = p.random(2, 3) + p.random(2, 6);
    const randomWidth = randomHeight * p.random(2, 7);
    const randomS = p.random(2, 6);

    p.fill(randomColor);
    p.rect(randomX + randomXOffset, randomY + randomYOffset, randomWidth, randomS);

    // apply a posterized filter effect to the colors being randomly generated
    p.filter(p.POSTERIZE, 6);
    /*
    filter(POSTERIZE, random(19,21));
    filter(INVERT);
    */

    if (p.frameCount > START_FRAME &&
      p.frameCount < END_FRAME) {
      console.log(`saving frame #${p.frameCount}`);
      gif.addFrame(document.getElementById('defaultCanvas0'), {delay: 1, copy: true});
    }

    if (p.frameCount === END_FRAME) {
      console.log('~~~Preparing to render gif.');
      gif.render();
    }
  };
}
