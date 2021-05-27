import React from 'react';

import './CollabBoard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';

const CollabBoard = () => {
  return (
    <div className='collabboard'>
      <div className='collabboard__navbar'>
        <BigDropDown />
      </div>
      <div className='collabboard__content'></div>
    </div>
  );
};

export default CollabBoard;
