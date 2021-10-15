import React, { useState } from 'react';
import './Scrumboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Kanban from '../../Components/Kanban/Kanban';
import Button from '../../Components/Button/Button';
import AddSprint from '../../Modals/AddSprint/AddSprint';
import ConsentModal from '../../Modals/ConsentModal/ConsentModal';
import { deleteSprint } from '../../API/sprint';
import { useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import Spinkit from '../../Modals/Spinkit/Spinkit';

const Scrumboard = () => {
  const sprintId = useParams();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [openNewSprint, setOpenNewSprint] = useState(false);
  const [sprintNo, setSprintNo] = useState(0);
  const [openConsentModal, setOpenConsentModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const deleteSprintClicked = () => {
    setLoading(true);

    deleteSprint(sprintId.sprintId).then((response) => {
      if (response.success) {
        setLoading(false);
        setOpenConsentModal(false);
        history.push(`/scrumboard/${response.projectId}`);
      } else {
        setOpenConsentModal(false);
        setMessage(response.message);
        setOpen(true);
        setLoading(false);
      }
    });
  };

  return (
    <div className='scrumboard'>
      {loading && <Spinkit />}
      {open && (
        <ResponseModal
          message={message}
          setOpen={() => {
            setOpen(false);
          }}
        />
      )}
      {openConsentModal && (
        <ConsentModal
          message={`Are you sure you want to delete this sprint?`}
          answerNo={() => {
            setOpenConsentModal(false);
          }}
          answerYes={deleteSprintClicked}
        />
      )}
      <div className='scrumboard__navbar'>
        <BigDropDown />

        <div className='scrumboard__selector'></div>
        <Button
          fill='red'
          onClick={() => {
            setOpenConsentModal(true);
          }}>
          Delete
        </Button>
      </div>

      <div className='scrumboard__content'>
        <Kanban />
      </div>
    </div>
  );
};

export default Scrumboard;
