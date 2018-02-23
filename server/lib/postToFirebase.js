'use strict';

require('dotenv').config();

const util = require('util');
const uuid = require('uuid');
const exec = util.promisify(require('child_process').exec);
// This import loads the firebase namespace along with all its type information.
const firebase = require('firebase/app');

// These imports load individual services into the firebase namespace.
require('firebase/database');
require('firebase/storage');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};
firebase.initializeApp(config);

// For the Database
const filenameRef = firebase.database().ref('fall-event-2017/filenames');

// For File Storage
const storage = firebase.storage();
const storageRef = storage.ref();
const bucket = storageRef.child('fall-event-2017');

const move = (name) => `mv glitch.gif ${name}`;

const saveName = (name) => {
  return filenameRef.push(name);
};

const uploadFile = (name) => {
  const imageRef = bucket.child(name);
  return util.promisify(imageRef.put(name, metadata));
};

const main = () => {
  const newName = `${uuid.v4()}.gif`;
  // todo: save glitch.gif as `${uuid.v4()}.gif`
  exec(move(newName))
    .then(() => saveName(newName))
    .then(() => uploadFile(newName))
    .then((res) => console.log(`Glitch image added to FB: ${res}`))
    .catch((err) => err);
};

// todo: append filename to firebase database array at
//       dada-photo-booth/fall-event-2017/filenames

// and then...
// https://github.com/desmondmorris/node-twitter/tree/master/examples#media
