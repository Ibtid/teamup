import React from 'react';
import './Scrumboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';

const Scrumboard = () => {
  return (
    <div className='scrumboard'>
      <div className='scrumboard__navbar'>
        <BigDropDown />
      </div>
      <div className='scrumboard__content'></div>
    </div>
  );
};

export default Scrumboard;
