import sampleSize from 'lodash.samplesize';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/database';
import 'firebase/storage';

// Firebase config
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};
firebase.initializeApp(config);

export const filenameRef = firebase.database().ref('fall-event-2017/filenames');

const storage = firebase.storage();
const storageRef = storage.ref();
const bucket = storageRef.child('fall-event-2017');

export const getImageUrls = async (filenames) => {
  return Promise.all(await filenames.map(async (filename) => {
    const url = await bucket.child(filename).getDownloadURL();
    return url;
  }));
};

// Because we want to include the newest image first
export const subset = (arr, num) => {
  return [arr[0], ...sampleSize(arr, num)];
};
