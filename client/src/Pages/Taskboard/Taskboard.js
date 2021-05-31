import React from 'react';
import './Taskboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Button from '../../Components/Button/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddBoard from '../../Modals/AddBoard/AddBoard';

const Taskboard = () => {
  return (
    <div className='taskboard'>
      <AddBoard />
      <div className='taskboard__navbar'>
        <BigDropDown />
        <Button>Add Board</Button>
      </div>
      <div className='taskboard__content'>
        <div className='taskboard__taskBoard'>
          <div className='taskboard__red'>
            <div className='taskboard__header'>
              <div className='taskboard__headerText'>Authentication</div>
              <AddCircleOutlineIcon />
            </div>
            <div className='taskboard__taskList'></div>
          </div>
        </div>
        <div className='taskboard__taskBoard'>
          <div className='taskboard__green'>
            <div className='taskboard__header'>
              <div className='taskboard__headerText'>Authorization</div>
              <AddCircleOutlineIcon />
            </div>
            <div className='taskboard__taskList'></div>
          </div>
        </div>
        <div className='taskboard__taskBoard'>
          <div className='taskboard__purple'>
            <div className='taskboard__header'>
              <div className='taskboard__headerText'>Front End</div>
              <AddCircleOutlineIcon />
            </div>
            <div className='taskboard__taskList'></div>
          </div>
        </div>
        <div className='taskboard__taskBoard'>
          <div className='taskboard__yellow'>
            <div className='taskboard__header'>
              <div className='taskboard__headerText'>End Points</div>
              <AddCircleOutlineIcon />
            </div>
            <div className='taskboard__taskList'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskboard;
