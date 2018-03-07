'use strict';

require('dotenv').config();

const admin = require('firebase-admin');
const util = require('util');
const uuid = require('uuid');

const exec = util.promisify(require('child_process').exec);

const serviceAccount = require('../firebase-admin-key.json');

// Init
const BUCKET_NAME = '2018_hello_world';
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID
});

// Utils
const saveLocallyAs = (name) => `cp glitch.gif ${name}`;

// File Upload
const storage = app.storage();
const bucket = storage.bucket();

const uploadFile = (name) => {
  const options = { destination: `${BUCKET_NAME}/${name}` };
  console.log(`options in uploadFile: ${JSON.stringify(options)}`);
  return bucket.upload(`glitch.gif`, options);
};

// Save Filenames
const filenameRef = app.database().ref('2018_hello_world/filenames');
const saveFilenameToDatabase = (name) => {
  console.log(`saveFilenameToDatabase: ${name}`);
  return filenameRef.push(name);
};

const main = () => {
  const newName = `${uuid.v4()}.gif`;
  return exec(saveLocallyAs(newName))
    .then(() => uploadFile(newName))
    .then(() => saveFilenameToDatabase(newName));
};

module.exports = main;
