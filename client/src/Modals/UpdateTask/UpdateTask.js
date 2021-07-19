import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import { listAllMembers } from '../../API/project';
import Spinkit from '../Spinkit/Spinkit';
import ResponseModal from '../ResponseModal/ResponseModal';
import { useParams } from 'react-router-dom';

import './UpdateTask.css';
import Button from '../../Components/Button/Button';

const UpdateTask = (props) => {
  const { projectId } = useParams();

  const [story, setStory] = useState(props.story);
  const [points, setPoints] = useState(props.points);

  const members = [{ _id: props.assignedTo._id, email: 'None' }];
  const [toBeAssigned, setToBeAssigned] = useState([]);
  const [assignedTo, setAssignedTo] = useState(props.assignedTo._id);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [openResponse, setOpenResponse] = useState(false);

  useEffect(() => {
    setLoading(true);
    listAllMembers(projectId).then((response) => {
      console.log(response);
      if (response.success) {
        response.members.map((member) => {
          if (member._id === members[0]._id) {
            members[0].email = member.email;
          } else {
            members.push(member);
          }
        });
        setToBeAssigned(members);
        setLoading(false);
      } else {
        setMessage(response.message);
        setOpenResponse(true);
        setLoading(false);
      }
    });
  }, []);

  const selectMember = (event) => {
    setAssignedTo(event.target.value);
  };

  const update = () => {
    const body = {
      assignedTo,
      story,
      points,
    };
    console.log(body);
  };

  return ReactDOM.createPortal(
    <div className='updateTask'>
      {loading && <Spinkit />}
      {openResponse && (
        <ResponseModal
          message={message}
          setOpen={() => setOpenResponse(false)}
        />
      )}
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

        <div className='addTask__memberContainer'>
          <div className='addTask__member'>
            <div className='addTask__title'>Assign Member</div>
            <select className='addTask__selector' onChange={selectMember}>
              {toBeAssigned.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                  className='addTask__option'>
                  {member.email}
                </option>
              ))}
            </select>
          </div>
          <div className='addTask__getSuggestions'>Get suggestions</div>
        </div>

        <div className='updateTask__secondSection'>
          <div className='updateTask__SprintContainer'>
            <div className='updateTask__title'>Add Sprint</div>
            <select className='addTask__selector' onChange={props.selectMember}>
              <option key='1' className='addTask__option'>
                None
              </option>
              <option key='2' className='addTask__option'>
                Sprint 1
              </option>
              <option key='3' className='addTask__option'>
                Sprint 2
              </option>
            </select>
          </div>
          <div className='updateTask__StoryPoints'>
            <div className='updateTask__title'>Story Points</div>
            <input
              className='updateTask__points'
              type='number'
              value={points}
              onChange={(e) => {
                setPoints(e.target.value);
              }}
            />
          </div>
        </div>

        <div className='updateTask__buttonContainer'>
          <Button onClick={update}>Update</Button>
          <Button red='red'>Delete</Button>
        </div>
      </div>
    </div>,
    document.getElementById('updateTask')
  );
};

export default UpdateTask;
