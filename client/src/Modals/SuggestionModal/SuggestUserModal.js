import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Components/Button/Button';
import { Avatar } from '@material-ui/core';

import './Suggestion.css';

const SuggestUserModal = (props) => {
  const [choosen, setChoosen] = useState('');
  const ordinalSuffix = (number) => {
    let j = number % 10;
    let k = number % 100;
    if (j == 1 && k != 11) {
      return `${number}st`;
    }
    if (j == 2 && k != 12) {
      return `${number}nd`;
    }
    if (j == 3 && k != 13) {
      return `${number}rd`;
    }
    return `${number}th`;
  };
  return ReactDOM.createPortal(
    <div className='responseModal'>
      <div className='responseModal__container pop__up'>
        {props.suggested.length !== 0 ? (
          <div className='suggestion__true'>
            <div className='suggestion__header'>Rank</div>
            <div className='suggestion__body'>
              {props.suggested.map((suggestion, index) => (
                <div
                  className={`suggestion__single ${
                    choosen === suggestion.email ? 'choosen' : ''
                  }`}
                  onClick={() => {
                    setChoosen(suggestion.email);
                    props.selectEmail(suggestion.email);
                    props.selectId(suggestion._id);
                  }}>
                  <div className='suggestion__rank'>
                    <div className='suggestion__rankText'>
                      {ordinalSuffix(index + 1)}
                    </div>
                  </div>
                  <div className='suggestion__user'>
                    <Avatar
                      style={{ height: '1.8vw', width: '1.8vw' }}
                      src={`http://localhost:5000/${suggestion.image}`}
                    />
                    <div className='suggestion__name'>{suggestion.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className='suggest__extraSpace'></div>
        <Button onClick={props.setOpen} size='small'>
          Okay
        </Button>
      </div>
    </div>,
    document.getElementById('suggestionPortal')
  );
};

export default SuggestUserModal;
