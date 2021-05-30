import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { create } from '../../API/project';
import Button from '../../Components/Button/Button';
import CloseIcon from '@material-ui/icons/Close';
import './NewProject.css';

const NewProject = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const admin = props.admin;

  const submit = () => {
    props.setLoading();
    const project = {
      name: name,
      description: description,
      admin: admin,
    };
    console.log(project);

    create(project).then((response) => {
      if (!response.success) {
        console.log(props.loading);
        props.setMessage(response.message);
        props.setOpenResponse();
      } else {
        console.log(project);
        props.setMessage(response.message);
        props.setOpenResponse();
      }
    });
    props.setLoading();
    props.close();
  };

  return ReactDOM.createPortal(
    <div className='newproject'>
      <div className='newproject__container'>
        <div className='newproject__groupButtonless'>
          <div className='newproject__header'>
            <div className='newproject__title'>New Project</div>
            <div className='newproject__closeButton' onClick={props.close}>
              <CloseIcon />
            </div>
          </div>
          <div className='newproject__form'>
            <div className='newproject__formElement'>
              <div className='newproject__label'>Project Name</div>
              <input
                className='newproject__nameInput'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className='newproject__formElement'>
              <div className='newproject__label'>Description</div>
              <textarea
                rows='3'
                className='newproject__descriptionInput'
                type='text'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <Button onClick={submit}>Create New Project</Button>
      </div>
    </div>,
    document.getElementById('newProject')
  );
};

export default NewProject;
