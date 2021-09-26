import React from 'react';
import './ReviewCard.css';
import image from '../svgs/banner3.png';
import { Avatar } from '@material-ui/core';
const ReviewCard = (props) => {
  return (
    <div className='reviewCard'>
      <div className='reviewCard__container'>
        <div className='reviewCard__top'>
          <Avatar style={{ height: '15vh', width: '15vh' }} src={image} />
        </div>
        <div className='reviewCard__bottom'>
          <div className='reviewCard__name'>Ibtid Rahman</div>
          <div className='reviewCard__review'>
            Teamup has been essential part of our business. I would definitely
            recommend Teamup.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
