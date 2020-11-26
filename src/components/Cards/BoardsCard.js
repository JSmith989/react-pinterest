import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardsCard({ board, removeBoard }) {
  return (
    <div className='card m-2 border-dark col-md-6'>
      <img className='card-img-top' src={board.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{board.name}</h5>
        <p className='card-text'>
          {board.description}
        </p>
        <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
          View Pins
        </Link>
        <button className='btn btn-danger' id={board.firebaseKey} onClick={(e) => { removeBoard(e); } }>Delete</button>
      </div>
    </div>
  );
}
