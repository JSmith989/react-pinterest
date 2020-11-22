import React from 'react';

export default function PinsCard({ pin, updatePin }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
      </div>
    </div>
  );
}
