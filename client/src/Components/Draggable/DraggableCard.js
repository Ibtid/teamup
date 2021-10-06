import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';

const DraggableCard = ({ name, xaxis, yaxis, _id, image }) => {
  const cardRef = useRef(null);
  useDraggable(cardRef, xaxis, yaxis, _id);

  if (!image) {
    return (
      <div className='card' ref={cardRef}>
        {name}
      </div>
    );
  } else {
    return (
      <img
        className='card__image'
        src={`http://localhost:5000/${name}`}
        ref={cardRef}
      />
    );
  }
};

export default DraggableCard;
