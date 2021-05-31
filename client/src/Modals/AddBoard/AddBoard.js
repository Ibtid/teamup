import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Components/Button/Button';
import CloseIcon from '@material-ui/icons/Close';

import './AddBoard.css';

const AddBoard = () => {
  return ReactDOM.createPortal(
    <div className='addboard'></div>,
    document.getElementById('addboard')
  );
};

export default AddBoard;
