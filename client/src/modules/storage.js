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

export const filenameRef = firebase.database().ref('2018_hello_world/filenames');

const storage = firebase.storage();
const bucket = storage.ref('2018_hello_world');

export const getImageUrls = async (filenames) => {
  const names = Object.values(filenames);
  return Promise.all(await names.map(async (filename) => {
    const url = await bucket.child(filename).getDownloadURL();
    return url;
  }));
};

export const subset = (arr, num) => {
  // Because we want to include the newest image first,
  // but not twice
  const theRest = arr.slice(0, -1);
  const last = arr.slice(arr.length - 1);
  return [last, ...sampleSize(theRest, num)];
};
