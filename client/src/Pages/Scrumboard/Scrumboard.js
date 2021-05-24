import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Scrumboard.css';

const Scrumboard = () => {
  return (
    <div className='scrumboard'>
      <div className='scrumboard__navbar'>
        <div className='scrumboard__buttondrop'>
          <div className='scrumboard__buttondropText'>Design Project - 1</div>
          <div className='scrumboard__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='scrumboard__content'></div>
    </div>
  );
};

export default Scrumboard;
