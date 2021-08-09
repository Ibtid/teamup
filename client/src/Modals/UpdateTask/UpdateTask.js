import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import { listAllMembers } from '../../API/project';
import Spinkit from '../Spinkit/Spinkit';
import ResponseModal from '../ResponseModal/ResponseModal';
import { useParams } from 'react-router-dom';
import { getSprints } from '../../API/sprint';
import './UpdateTask.css';
import Button from '../../Components/Button/Button';
import { updateTask } from '../../API/task';

const UpdateTask = (props) => {
  const { projectId } = useParams();

  const [story, setStory] = useState(props.story);
  const [points, setPoints] = useState(props.points);

  const members = [{ _id: props.assignedTo._id, email: 'None' }];
  const [toBeAssigned, setToBeAssigned] = useState([]);
  const [assignedTo, setAssignedTo] = useState(props.assignedTo._id);

  const defaultSprint = [
    { _id: props.sprintId || 0, sprintNo: props.sprintNo || '--' },
  ];
  const [sprints, setSprints] = useState([]);
  const [sprint, setSprint] = useState('');

  const [loading, setLoading] = useState(true);
  const [loadinga, setLoadinga] = useState(true);
  const [loadingb, setLoadingb] = useState(false);
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

  useEffect(() => {
    setLoadinga(true);
    getSprints(projectId).then((response) => {
      if (response.success) {
        response.sprints.map((sprint) => {
          if (sprint._id !== defaultSprint[0]._id) defaultSprint.push(sprint);
        });
        setSprints(defaultSprint);
        setLoadinga(false);
      } else {
        setMessage(response.message);
        setOpenResponse(true);
        setLoadinga(false);
      }
    });
  }, []);

  const selectMember = (event) => {
    setAssignedTo(event.target.value);
  };

  const selectSprint = (event) => {
    setSprint(event.target.value);
  };

  const update = () => {
    setLoadingb(true);
    const body = {
      assignedTo,
      story,
      points,
      sprintId: sprint,
      taskId: props._id,
    };
    console.log(body);
    updateTask(body).then((response) => {
      console.log(response);
      if (response.success) {
        setLoadingb(false);
        props.close();
      } else {
        setMessage(response.message);
        setOpenResponse(true);
        setLoadingb(false);
      }
    });
  };

  return ReactDOM.createPortal(
    <div className='updateTask'>
      {loading && <Spinkit />}
      {loadinga && <Spinkit />}
      {loadingb && <Spinkit />}
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
            <select className='addTask__selector' onChange={selectSprint}>
              {sprints.map((indexSprint) => (
                <option
                  key={indexSprint._id}
                  value={indexSprint._id}
                  className='addTask__option'>
                  Sprint {indexSprint.sprintNo}
                </option>
              ))}
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
