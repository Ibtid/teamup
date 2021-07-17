import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Components/Button/Button';
import { useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import './AddSprint.css';

const AddSprint = (props) => {
  const { projectId } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const createSprint = () => {
    const body = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      projectId: projectId,
    };
    console.log(body);
    if (body.startDate < body.endDate) {
      console.log('right');
    }
    if (body.startDate > body.endDate) {
      console.log('wrong');
    }
  };
  return ReactDOM.createPortal(
    <div className='addSprint'>
      <div className='addSprint__container'>
        <div className='addTask__closeButton' onClick={props.closeAddSprint}>
          <CloseIcon />
        </div>
        <div className='addSprint__sprintName'>Sprint 1</div>
        <div className='addSprint__time'>
          <div className='addSprint__sprintName'>Start Time</div>
          <input
            type='datetime-local'
            name='datetime'
            value={startDate}
            className='addSprint__dateInput'
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className='addSprint__time'>
          <div className='addSprint__sprintName'>End Time</div>
          <input
            type='datetime-local'
            name='datetime'
            className='addSprint__dateInput'
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div className='addSprint__buttonContainer'>
          <Button onClick={createSprint}>Add Sprint</Button>
        </div>
      </div>
    </div>,
    document.getElementById('addSprint')
  );
};

export default AddSprint;
