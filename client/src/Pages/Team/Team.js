import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Team.css';

const Team = () => {
  return (
    <div className='team'>
      <div className='team__navbar'>
        <div className='team__buttondrop'>
          <div className='team__buttondropText'>Design Project - 1</div>
          <div className='team__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='team__content'></div>
    </div>
  );
};

export default Team;
