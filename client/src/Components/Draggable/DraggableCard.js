import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';

const DraggableCard = ({ name, xaxis, yaxis, _id }) => {
  const cardRef = useRef(null);
  useDraggable(cardRef, xaxis, yaxis, _id);

  return (
    <div className='card' ref={cardRef}>
      {name}
    </div>
  );
};

export default DraggableCard;
