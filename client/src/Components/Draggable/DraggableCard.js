import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const DraggableCard = ({ name, xaxis, yaxis, _id, image }) => {
  const cardRef = useRef(null);
  useDraggable(cardRef, xaxis, yaxis, _id);

  if (!image) {
    return (
      <div className='card' ref={cardRef}>
        <div className='card__iconOne'>
          <HighlightOffIcon style={{ height: '2vh' }} />
        </div>
        {name}
        {/*<HighlightOffIcon style={{ marginLeft: '1vw', height: '3vh' }} />*/}
      </div>
    );
  } else {
    return (
      <div className='imageCard' ref={cardRef}>
        <div className='card__icon'>
          <HighlightOffIcon style={{ height: '2vh' }} />
        </div>
        <img className='card__image' src={`http://localhost:5000/${name}`} />
      </div>
    );
  }
};

export default DraggableCard;
