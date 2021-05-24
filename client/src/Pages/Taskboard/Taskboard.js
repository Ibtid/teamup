import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Taskboard.css';

const Taskboard = () => {
  return (
    <div className='taskboard'>
      <div className='taskboard__navbar'>
        <div className='taskboard__buttondrop'>
          <div className='taskboard__buttondropText'>Design Project - 1</div>
          <div className='taskboard__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='taskboard__content'></div>
    </div>
  );
};

export default Taskboard;
