import React from 'react';
import shuffle from 'lodash.shuffle';

const Grid = ({ urls }) => {
  const latest = urls[0];
  const random = shuffle(urls.slice(1))[0];
  const images = [latest, random];

  return <div className='images'>
    {images.map((img, index) => {
      return <div key={index} className='image'>
        <img src={img} alt={`portrait #${index}`} />
      </div>;
    })}
  </div>;
};

export default Grid;
