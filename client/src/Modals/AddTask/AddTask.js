import React from 'react';
import ReactDOM from 'react-dom';
import './AddTask.css';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../../Components/Button/Button';

const AddTask = (props) => {
  const Category = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Auto & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
    { value: 4, label: 'Sports' },
  ];
  return ReactDOM.createPortal(
    <div className='addTask'>
      <div className='addTask__container'>
        <div className='addTask__closeButton' onClick={props.closeAddTask}>
          <CloseIcon />
        </div>
        <div className='addTask__storyContainer'>
          <div className='addTask__title'>Story Name</div>
          <textarea row='2' className='addTask__input' />
        </div>
        <div className='addTask__memberContainer'>
          <div className='addTask__member'>
            <div className='addTask__title'>Assign Member</div>
            <select className='addTask__selector'>
              {Category.map((item, index) => (
                <option
                  key={index}
                  value={item.value}
                  className='addTask__option'>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className='addTask__getSuggestions'>Get suggestions</div>
        </div>
        <div className='addTask__title'>Story Points</div>
        <input className='addTask__storyPoint' type='number' />
        <div className='addTask__button'>
          <Button>Add Board</Button>
        </div>
      </div>
    </div>,
    document.getElementById('addTask')
  );
};

export default AddTask;
