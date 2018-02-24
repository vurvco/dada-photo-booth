'use strict';

require('dotenv').config();

const { readFileSync } = require('fs');
const path = require('path');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const data = readFileSync(path.join(`${__dirname}/../glitch.gif`));
const mediaParams = { media: data };

console.log('mediaParams', mediaParams);

client.post('media/upload', mediaParams)
  .then((media) => {
    const statusParams = {
      media_ids: media.media_id_string,
      media_type: 'video/mp4',
      media_category: 'tweetvideo'
    };

    console.log('statusParams', statusParams);

    client.post('statuses/update', statusParams)
      .then((tweet) => {
        console.log(`Tweet: ${tweet}`);
      })
      .catch((error) => {
        console.log(`Error in status post: ${JSON.stringify(error)}`);
        throw error;
      });
  })
  .catch((error) => {
    console.log(`Error in file upload: ${JSON.stringify(error)}`);
    throw error;
  });
