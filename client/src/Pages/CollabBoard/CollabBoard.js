import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './CollabBoard.css';

const CollabBoard = () => {
  return (
    <div className='collabboard'>
      <div className='collabboard__navbar'>
        <div className='collabboard__buttondrop'>
          <div className='collabboard__buttondropText'>Design Project - 1</div>
          <div className='collabboard__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='collabboard__content'></div>
    </div>
  );
};

export default CollabBoard;
