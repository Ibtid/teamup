import React, { useState } from 'react';
import './Scrumboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Kanban from '../../Components/Kanban/Kanban';
import Button from '../../Components/Button/Button';
import AddSprint from '../../Modals/AddSprint/AddSprint';

const Scrumboard = () => {
  const [openNewSprint, setOpenNewSprint] = useState(false);
  const [sprintNo, setSprintNo] = useState(0);
  return (
    <div className='scrumboard'>
      {openNewSprint && (
        <AddSprint
          sprintNo={sprintNo}
          closeAddSprint={() => {
            setOpenNewSprint(false);
          }}
        />
      )}
      <div className='scrumboard__navbar'>
        <BigDropDown />
        <Button
          onClick={() => {
            setOpenNewSprint(true);
          }}>
          New Sprint
        </Button>
        <select className='scrumboard__selector'>
          <option id='1' className='addTask__option'>
            Sprint 1
          </option>
          <option id='2' className='addTask__option'>
            Sprint 2
          </option>
          <option id='3' className='addTask__option'>
            Sprint 3
          </option>
          <option id='4' className='addTask__option'>
            Sprint 4
          </option>
        </select>
      </div>
      <div className='scrumboard__content'>
        <Kanban />
      </div>
    </div>
  );
};

export default Scrumboard;
