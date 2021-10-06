import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { deletePitchers } from '../../API/pitcher';
import { useParams } from 'react-router-dom';

const DraggableCard = ({ name, xaxis, yaxis, _id, image }) => {
  const cardRef = useRef(null);
  useDraggable(cardRef, xaxis, yaxis, _id);
  const projectId = useParams();

  const deletePitcher = () => {
    let body = {
      _id: _id,
    };
    deletePitchers(body).then((response) => console.log(response));
  };

  if (!image) {
    return (
      <div className='card' ref={cardRef}>
        <div className='card__iconOne' onClick={deletePitcher}>
          <HighlightOffIcon style={{ height: '2vh' }} />
        </div>
        {name}
      </div>
    );
  } else {
    return (
      <div className='imageCard' ref={cardRef}>
        <div className='card__icon' onClick={deletePitcher}>
          <HighlightOffIcon style={{ height: '2vh' }} />
        </div>
        <img className='card__image' src={`http://localhost:5000/${name}`} />
      </div>
    );
  }
};

export default DraggableCard;
