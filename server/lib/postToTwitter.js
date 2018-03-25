'use strict';

require('dotenv').config();

const { readFileSync } = require('fs');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const uploadGif = () => {
  const data = readFileSync('glitch.gif');
  const mediaParams = { media: data };

  console.log('mediaParams', mediaParams);

  return client.post('media/upload', mediaParams);
};

const postGifToTimeline = (media) => {
  const statusParams = {
    media_ids: media.media_id_string,
    media_type: 'video/mp4',
    media_category: 'tweetvideo'
  };

  console.log('statusParams', statusParams);

  return client.post('statuses/update', statusParams);
};

const main = () => {
  return uploadGif()
    .then(postGifToTimeline)
    .catch(err => console.log(err));
};

module.exports = main;
