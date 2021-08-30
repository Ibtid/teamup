import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Components/Button/Button';

import './Suggestion.css';

const SuggestUserModal = (props) => {
  return ReactDOM.createPortal(
    <div className='responseModal'>
      <div className='responseModal__container'>
        {props.suggested.length === 0 && (
          <div className='responseModal__message'>{props.message}</div>
        )}

        <div className='suggest__data yellowtext'>
          <div>Rank</div>
          <div>Name</div>
          <div>Score</div>
        </div>
        {props.suggested.length !== 0 &&
          props.suggested.map((user, index) => (
            <div className='suggest__data'>
              <div>{index + 1}</div>
              <div>{user.name}</div>
              <div>{user.score}</div>
            </div>
          ))}
        <div className='suggest__extraSpace'></div>
        <Button onClick={props.setOpen}>Okay</Button>
      </div>
    </div>,
    document.getElementById('suggestionPortal')
  );
};

export default SuggestUserModal;
