import React from 'react';
import Button from '../../Components/Button/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__navbar'>
        <div className='dashboard__buttondrop'>
          <div className='dashboard__buttondropText'>Design Project - 1</div>
          <div className='dashboard__icon'>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <div className='dashboard__content'></div>
    </div>
  );
};

export default Dashboard;
