import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Reports.css';

const Reports = () => {
  return (
    <div className='reports'>
      <div className='reports__navbar'>
        <div className='reports__buttondrop'>
          <div className='reports__buttondropText'>Design Project - 1</div>
          <div className='reports__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='reports__content'></div>
    </div>
  );
};

export default Reports;
