import React from 'react';
import shuffle from 'lodash.shuffle';

const Grid = ({ urls }) => {
  const shuffledFour = shuffle(urls.slice(1)).slice(0, 4);
  return <div className='images'>
    <div className='newest'>
      <img src={urls[0]} alt='newest glitched portrait' />
    </div>
    <div className='grid'>
      {shuffledFour.map((image, index) => {
        return (
          <div className='image' key={index}>
            <img src={image} alt='rando glitched portraits' />
          </div>
        );
      })}
    </div>
  </div>;
};

export default Grid;