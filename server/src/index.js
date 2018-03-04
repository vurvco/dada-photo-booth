#! /usr/bin/env node

import Io from 'socket.io';
import Opencv from 'opencv';
import { crop } from 'easyimage';

import Image from './models/image';
import saveImage from '../lib/saveImage';
// import gifOut from '../lib/gifOut';

const io = Io();

function detectFace (image) {
  return new Promise((resolve, reject) => {
    image.detectObject(`${__dirname}/face.xml`,
      {},
      (err, faces) => {
        if (err) {
          throw reject(err);
        }
        resolve(faces);
      });
  });
}

io.on('connection', (socket) => {
  console.log(`client ID: ${socket.client.id}`);
  let x;
  let y;
  let width;
  let height;

  socket.on('health', () => {
    console.log('200: they live!');
  });

  socket.on('image', (data) => {
    const image = new Image(data);
    image.build().then((imgBuffer) => {
      Opencv.readImage(imgBuffer, (err, imgMatrix) => {
        if (err) {
          console.log(err);
        }
        detectFace(imgMatrix).then((faces) => {
          socket.emit('faces', faces.map(({ x, y, width, height }) => {
            return { x, y: y - 40, width, height: height + 50 };
          }));
        }).catch(e => console.log(e));
      });
    });
  });

  socket.on('coordinates', (dimensions) => {
    x = dimensions.x;
    y = dimensions.y;
    width = dimensions.width;
    height = dimensions.height;
  });

  socket.on('camera_upload', (payload) => {
    console.log('~~~Payload received.\n');

    const src = './cropped.jpg';
    const dst = './croppedByServer.jpg';

    saveImage(payload, 'cropped.jpg')
      .then(() => {
        console.log('~~~File written.\n');
        crop({ src, dst, x, y, cropHeight: height, cropWidth: width })
          .then((returned) => {
            console.log({ x, y, width, height });
            console.log(`returned: ${JSON.stringify(returned, null, 2)}\n`);
            socket.emit('generating', { isGenerating: true });

            // placeholder that will be replaced with p5 sketch process
            setTimeout(() => {
              socket.emit('generating', { isGenerating: false });
            }, 3000);
          });
      })
      .catch((err) => {
        console.log('err', err);
        socket.emit('gif_response', { response: false });
      });
  });

  socket.on('save_gif', (blob) => {
    saveImage(blob, 'glitch.gif')
      .then(() => {
        console.log('~~~Image saved.\n');
        socket.emit('saved_gif_response', 'ok');
      })
      .catch(err => {
        console.log(`err: ${err}\n`);
        socket.emit('saved_gif_response', 'not ok');
      });
  });
});

console.log('Socket listen on 3000');
io.listen(3000);
