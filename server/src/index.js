#! /usr/bin/env node

import Io from 'socket.io';
import Opencv from 'opencv';
import { crop } from 'easyimage';

import Image from './models/image';
import copyImage from '../lib/copyImage';
import saveImage from '../lib/saveImage';
import postToFirebase from '../lib/postToFirebase';
import postToTwitter from '../lib/postToTwitter';

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
    const dir = '../camera/public';

    socket.emit('state', { isLoading: true });

    saveImage(payload, 'cropped.jpg')
      .then(() => {
        console.log('~~~File written.\n');
        crop({ src, dst, x, y, cropHeight: height, cropWidth: width })
          .then((returned) => {
            console.log({ x, y, width, height });
            console.log(`returned: ${JSON.stringify(returned, null, 2)}\n`);
            return copyImage(dir);
          })
          .then(() => {
            console.log(`Copied image to ${dir}`);
            socket.emit('state', { isLoading: false, isGenerating: true });
          })
          .catch(err => console.error(err));
      })
      .catch((err) => {
        console.log('err', err);
        socket.emit('state', { isGenerating: false });
      });
  });

  socket.on('save_gif', (blob) => {
    console.log('~~~Blob received.');

    saveImage(blob, 'glitch.gif')
      .then(() => {
        console.log('~~~Gif saved.\n');
        return postToFirebase();
      })
      .then((res) => {
        console.log(`Glitch image added to Firebase: ${res}`);
        return postToTwitter();
      })
      .then((tweet) => {
        console.log(`Tweet: ${tweet}`);
        socket.emit('state', { isLoading: false, isGenerating: false });
      })
      .catch((err) => {
        console.log(`err: ${err}\n`);
        socket.emit('state', { isGenerating: false });
      });
  });
});

console.log('Socket listen on 3000');
io.listen(3000);
