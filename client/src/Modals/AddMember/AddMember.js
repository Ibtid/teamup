import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './AddMember.css';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../../Components/Button/Button';
import { addNewMember } from '../../API/project';
import { useParams } from 'react-router-dom';
import ResponseModal from '../ResponseModal/ResponseModal';
import Spinkit from '../Spinkit/Spinkit';
import { isAuthenticated } from '../../API/auth-helper';

const AddMember = (props) => {
  const { projectId } = useParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [message, setMessage] = useState('');

  const jwt = isAuthenticated();

  const addMember = () => {
    setLoading(true);
    const body = {
      email: email,
      projectId: projectId,
    };
    addNewMember({ t: jwt.token }, body).then((response) => {
      console.log(response);
      if (response.success) {
        setLoading(false);
        props.closeAddMember();
        props.changeReloadSignal();
      } else {
        setMessage(response.message);
        setOpenResponse(true);
        setLoading(false);
      }
    });
  };
  return ReactDOM.createPortal(
    <div className='addMember'>
      {loading && <Spinkit />}
      {openResponse && (
        <ResponseModal
          message={message}
          setOpen={() => setOpenResponse(false)}
        />
      )}
      <div className='addMember__form pop__up'>
        <div className='addMember__top'>
          <div className='addMember__label'>User Mail</div>
          <div className='addMember__closeIcon' onClick={props.closeAddMember}>
            <CloseIcon />
          </div>
        </div>
        <input
          className='addMember__input'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='@gmail.com'
        />
        <Button onClick={addMember} size='small'>
          Add Member
        </Button>
      </div>
    </div>,
    document.getElementById('addMember')
  );
};

export default AddMember;
