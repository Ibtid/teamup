import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './BigDropDown.css';

const BigDropDown = () => {
  return (
    <div className='bigDropDown'>
      <div className='bigDropDown__Text'>Design Project - 1</div>
      <div className='bigDropDown__icon'>
        <ExpandMoreIcon />
      </div>
    </div>
  );
};

export default BigDropDown;
