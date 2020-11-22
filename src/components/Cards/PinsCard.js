import React from 'react';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default function PinsCard({ pin, updatePin, removePin }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>

        <button className='btn btn-danger' id={pin.firebaseKey} onClick={(e) => removePin(e)}>Delete</button>
        <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
          <PinForm pin={pin} onUpdate={updatePin}/>
            </AppModal>
      </div>
    </div>
  );
}
