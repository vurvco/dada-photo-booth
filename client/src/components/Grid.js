import React from 'react';

const Grid = ({ urls }) => (
  <div className='images'>
    {urls.map((image, index) => {
      return (
        <div className='image' key={index}>
          <img src={image} alt='glitched portrait' />
        </div>
      );
    })}
  </div>
);

export default Grid;
