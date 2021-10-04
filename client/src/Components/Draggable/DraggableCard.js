import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';
import ibtid from '../LandingPageComponent/svgs/banner3.png';

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
    return <img className='card__image' src={ibtid} ref={cardRef} />;
  }
};

export default DraggableCard;
