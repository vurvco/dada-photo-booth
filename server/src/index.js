#! /usr/bin/env node

import Io from 'socket.io';
import Opencv from 'opencv';

import Image from './models/image';
import { gifOut } from '../lib/gifOut';

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
  socket.on('image', (data) => {
    const image = new Image(data);
    image.build().then((imgBuffer) => {
      Opencv.readImage(imgBuffer, (err, imgMatrix) => {
        if (err) {
          console.log(err);
        }
        detectFace(imgMatrix).then((faces) => {
          socket.emit('faces', faces);
        }).catch(e => console.log(e));
      });
    });
  });

  socket.on('health', () => {
    console.log('200: they live!');
  });

  socket.on('camera_upload', (data) => {
    gifOut(data)
      .then((res) => {
        console.log('res', res);
        socket.emit('gif_response', { response: true });
      })
      .catch((err) => {
        console.log('err', err);
        socket.emit('gif_response', { response: false });
      });
  });
});

console.log('Socket listen on 3000');
io.listen(3000);
