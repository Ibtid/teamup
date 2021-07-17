import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';

import './UpdateTask.css';
import Button from '../../Components/Button/Button';

const UpdateTask = (props) => {
  const [story, setStory] = useState(props.story);
  return ReactDOM.createPortal(
    <div className='updateTask'>
      <div className='updateTask__container'>
        <div className='addTask__closeButton' onClick={props.close}>
          <CloseIcon />
        </div>
        <div className='updateTask__storyContainer'>
          <div className='updateTask__title'>Story Name</div>
          <textarea
            row='2'
            className='updateTask__input'
            value={story}
            onChange={(event) => {
              setStory(event.target.value);
            }}
          />
        </div>

        <div className='updateTask__secondSection'>
          <div className='updateTask__SprintContainer'>
            <div className='updateTask__title'>Add Sprint</div>
            <select className='addTask__selector' onChange={props.selectMember}>
              <option key='1' className='addTask__option'>
                Sprint 1
              </option>
              <option key='1' className='addTask__option'>
                Sprint 2
              </option>
              <option key='1' className='addTask__option'>
                Sprint 3
              </option>
            </select>
          </div>
          <div className='updateTask__StoryPoints'>
            <div className='updateTask__title'>Story Points</div>
            <select className='addTask__selector' onChange={props.selectMember}>
              <option key='1' className='addTask__option'>
                1
              </option>
              <option key='1' className='addTask__option'>
                2
              </option>
              <option key='1' className='addTask__option'>
                3
              </option>
            </select>
          </div>
        </div>

        <div className='addTask__memberContainer'>
          <div className='addTask__member'>
            <div className='addTask__title'>Assign Member</div>
            <select className='addTask__selector' onChange={props.selectMember}>
              <option key='1' className='addTask__option'>
                Member 1
              </option>
              <option key='1' className='addTask__option'>
                Member 2
              </option>
              <option key='1' className='addTask__option'>
                Member 3
              </option>
            </select>
          </div>
          <div className='addTask__getSuggestions'>Get suggestions</div>
        </div>

        <div className='updateTask__buttonContainer'>
          <Button>Update</Button>
          <Button red='red'>Delete</Button>
        </div>
      </div>
    </div>,
    document.getElementById('updateTask')
  );
};

export default UpdateTask;
