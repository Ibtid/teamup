import React, { useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

const RecoveryFirstForm = () => {
  const history = useHistory();
  const [slideOn, setSlideOn] = useState('team__slideOn');

  return (
    <div className={`signin__form ${slideOn}`}>
      <div className='signin__header'>Account Recovery</div>
      <div
        style={{
          marginBottom: '3vh',
          color: '#f2f2f2',
          width: '21.5vw',
          fontSize: '0.9vw',
          textAlign: 'center',
        }}>
        Your Password has been updated successfully
      </div>

      <div className='signin__buttondiv'>
        <button
          className='signin__button'
          onClick={() => {
            setSlideOn('team__slideOff');
            setTimeout(() => {
              history.push('/signin');
            }, 300);
          }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecoveryFirstForm;
