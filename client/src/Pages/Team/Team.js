import React, { useEffect, useState } from 'react';
import './Team.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Button from '../../Components/Button/Button';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Scrollable from '../../Components/Scrollable/Scrollable';
import ClearIcon from '@material-ui/icons/Clear';
import { useParams, useHistory } from 'react-router-dom';
import { listAllMembers, changeMemberDesignation } from '../../API/project';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import AddMember from '../../Modals/AddMember/AddMember';
import ConsentModal from '../../Modals/ConsentModal/ConsentModal';
import { removeMember } from '../../API/project';
import { isAuthenticated } from '../../API/auth-helper';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
    fontSize: '1vw',
  },
}));

const Team = () => {
  let history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const { projectId } = useParams();
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [message, setMessage] = useState('');
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openConsentModal, setOpenConsentModal] = useState(false);
  const [memberToBeRemovedName, setMemberToBeRemovedName] = useState('');
  const [memberToBeRemovedId, setMemberToBeRemovedId] = useState('');
  const [selectedMember, setSelectedMember] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [reloadSignal, setReloadSignal] = useState(false);
  const [srDev, setSrDev] = useState([]);
  const [jrDev, setJrDev] = useState([]);
  const [intern, setIntern] = useState([]);
  const [openLeaveConsentModal, setOpenLeaveConsentModal] = useState(false);
  const [slideOn, setSlideOn] = useState('');

  const jwt = isAuthenticated();

  useEffect(() => {
    setLoading(true);

    listAllMembers(projectId).then((response) => {
      if (response.success) {
        setMembers([]);
        let responseMembers = [];
        console.log('i am setting');
        console.log(response);
        setAdmin(response.admin);
        response.members.forEach((member) => {
          if (member._id !== response.admin._id) {
            responseMembers.push(member);
            setMembers(responseMembers);
          }
        });
        setTasks(response.tasks);
        setSrDev(response.srDev);
        setJrDev(response.jrDev);
        setIntern(response.intern);
        setLoading(false);
      } else {
        setMessage(response.message);
        setOpenResponse(true);
        setLoading(false);
      }
    });
  }, [openAddMember, openConsentModal, reloadSignal]);

  const removeMemberClicked = () => {
    setLoading(true);
    const body = {
      projectId: projectId,
      memberId: memberToBeRemovedId,
    };
    removeMember({ t: jwt.token }, body).then((response) => {
      setLoading(true);
      if (response.success) {
        setSelectedMember(false);
        setOpenConsentModal(false);
        setLoading(false);
      } else {
        setOpenConsentModal(false);
        setOpenResponse(true);
        setMessage(response.message);
        setLoading(false);
      }
    });
  };

  const removeMyselfClicked = () => {
    setLoading(true);
    const body = {
      projectId: projectId,
      memberId: memberToBeRemovedId,
    };
    removeMember({ t: jwt.token }, body).then((response) => {
      setLoading(true);
      console.log(response);
      if (response.success) {
        setSelectedMember(false);
        setOpenConsentModal(false);
        setLoading(false);
        history.push('/project');
      } else {
        setOpenConsentModal(false);
        setOpenResponse(true);
        setMessage(response.message);
        setLoading(false);
      }
    });
  };

  const changeDesignation = (event) => {
    setLoading(true);
    let body = {
      newDesignation: event.target.value,
      memberId: selectedMember.id,
      projectId,
    };
    changeMemberDesignation(body).then((response) => {
      if (response.success) {
        switchSelect(body.memberId);
        setSelectedMember(false);
        setLoading(false);
        setReloadSignal(!reloadSignal);
      } else {
        setOpenResponse(true);
        setMessage(response.message);
        setLoading(false);
      }
    });
  };

  const srDevSelect = (
    <select className='team__buttondrop' onChange={changeDesignation}>
      <option id='1' value='sr'>
        Software Developer
      </option>
      <option id='2' value='jr'>
        Junior Developer
      </option>
      <option id='3' value='intern'>
        Intern
      </option>
    </select>
  );
  const jrDevSelect = (
    <select className='team__buttondrop' onChange={changeDesignation}>
      <option id='1' value='jr'>
        Junior Developer
      </option>
      <option id='2' value='sr'>
        Software Developer
      </option>
      <option id='3' value='intern'>
        Intern
      </option>
    </select>
  );

  const internSelect = (
    <select className='team__buttondrop' onChange={changeDesignation}>
      <option id='1' value='intern'>
        Intern
      </option>
      <option id='2' value='sr'>
        Software Developer
      </option>
      <option id='3' value='jr'>
        Junior Developer
      </option>
    </select>
  );

  const memberSelect = (
    <select className='team__buttondrop' onChange={changeDesignation}>
      <option id='0' value='member'>
        Member
      </option>
      <option id='1' value='sr'>
        Software Developer
      </option>
      <option id='2' value='jr'>
        Junior Developer
      </option>
      <option id='3' value='intern'>
        Intern
      </option>
    </select>
  );

  const switchSelect = (memberId) => {
    let memberDesignation = 'Member';
    let selectDiv = memberSelect;

    srDev.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Software Developer';
        selectDiv = srDevSelect;
      }
    });
    jrDev.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Junior Developer';
        selectDiv = jrDevSelect;
      }
    });
    intern.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Intern';
        selectDiv = internSelect;
      }
    });
    return { selectDiv, memberDesignation };
  };

  const designationDiv = (memberId) => {
    let memberDesignation = 'Member';

    srDev.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Software Developer';
      }
    });
    jrDev.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Junior Developer';
      }
    });
    intern.forEach((dev) => {
      if (memberId === dev) {
        memberDesignation = 'Intern';
      }
    });

    return { memberDesignation };
  };

  return (
    <div className='team'>
      {loading && <Spinkit />}
      {openResponse && (
        <ResponseModal
          message={message}
          setOpen={() => setOpenResponse(false)}
        />
      )}
      {openAddMember && (
        <AddMember
          closeAddMember={() => {
            setOpenAddMember(false);
          }}
        />
      )}
      {openConsentModal && (
        <ConsentModal
          message={`Are you sure you want to remove ${selectedMember.username} from the team?`}
          answerNo={() => {
            setOpenConsentModal(false);
          }}
          answerYes={removeMemberClicked}
        />
      )}
      {openLeaveConsentModal && (
        <ConsentModal
          message={`Are you sure you want to leave the team?`}
          answerNo={() => {
            setOpenLeaveConsentModal(false);
          }}
          answerYes={removeMyselfClicked}
        />
      )}
      <div className='team__navbar'>
        <BigDropDown />
        {user.user._id === admin._id && (
          <Button onClick={() => setOpenAddMember(true)}>Add Member</Button>
        )}
      </div>
      <div className='team__content'>
        <div className='team__contentLeft'>
          <div className='team__projectOwner'>
            <div className='team__header'>Team Lead</div>
            <div
              className='team__projectOwnerName'
              onClick={() => {
                let completed = 0;
                let total = 0;
                tasks.forEach((task, j) => {
                  if (admin._id === task.assignedTo) {
                    total = total + 1;
                    if (task.status === 'completed') {
                      completed = completed + 1;
                    }
                  }
                });

                setSlideOn('team__slideOff');
                setTimeout(() => {
                  setSlideOn('team__slideOn');
                  setSelectedMember({
                    name: admin.name,
                    image: admin.image,
                    username: admin.username,
                    email: admin.email,
                    completed: completed || ' -',
                    total: total || '-',
                    role: 'Team Lead',
                    id: admin._id,
                  });
                }, 300);
              }}>
              <Avatar
                style={{ height: '5vh', width: '5vh' }}
                src={`http://localhost:5000/${admin.image}`}
              />
              <div className='team__memberName'>{admin.name}</div>
            </div>
          </div>
          <div className='team__collaborators slide__downC1'>
            <div className='team__header'>Collaborators</div>
            <div className='team__collaboratorsContent'>
              <Scrollable>
                <div className='team__members'>
                  {members.map((member) => (
                    <div
                      className='team__member drop__downteamList'
                      key={member._id}
                      onClick={() => {
                        let completed = 0;
                        let total = 0;
                        tasks.forEach((task, j) => {
                          if (member._id === task.assignedTo) {
                            total = total + 1;
                            if (task.status === 'completed') {
                              completed = completed + 1;
                            }
                          }
                        });

                        setSlideOn('team__slideOff');
                        setTimeout(() => {
                          setSlideOn('team__slideOn');
                          setSelectedMember({
                            name: member.name,
                            image: member.image,
                            username: member.username,
                            email: member.email,
                            completed: completed || ' -',
                            total: total || '-',
                            role:
                              designationDiv(member._id).memberDesignation ||
                              'Member',
                            id: member._id,
                          });
                        }, 300);
                      }}>
                      <div className='team__profileGroup'>
                        <Avatar
                          className={classes.purple}
                          src={`http://localhost:5000/${member.image}`}
                        />
                        <div className='team__memberName'>{`${member.name}`}</div>
                      </div>
                      <div className='team__functions'>
                        {user.user._id === admin._id ? (
                          switchSelect(member._id).selectDiv
                        ) : (
                          <div className='team__role'>
                            {designationDiv(member._id).memberDesignation}
                          </div>
                        )}
                        {user.user._id === admin._id ? (
                          <ClearIcon
                            onClick={() => {
                              setMemberToBeRemovedName(member.name);
                              setMemberToBeRemovedId(member._id);
                              setOpenConsentModal(true);
                            }}
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Scrollable>
            </div>
          </div>
        </div>
        <div className={`team__contentRight slide__downC3 ${slideOn}`}>
          {selectedMember ? (
            <div className={`team__selectedMember ${slideOn}`}>
              <Avatar
                style={{ width: '9.4vw', height: '19.7vh' }}
                src={`http://localhost:5000/${selectedMember.image}`}
              />
              <div className='team__selectedName'>{selectedMember.name}</div>
              <div className='team__selectedInfo'>
                <div className='team__selectedTitle'>Team Info</div>
                <div className='team__selectedData'>
                  Role: {selectedMember.role}
                </div>
                <div className='team__selectedData'>
                  Task Completed: {selectedMember.completed}/
                  {selectedMember.total}
                </div>
                <div className='team__selectedTitle'>Personal Information</div>
                <div className='team__selectedData'>
                  Username: {selectedMember.username}
                </div>
                <div className='team__selectedData'>
                  Email: {selectedMember.email}
                </div>
              </div>
              {user.user._id === selectedMember.id &&
                user.user._id !== admin._id && (
                  <div
                    className='team__selectedButton'
                    onClick={() => {
                      setMemberToBeRemovedName(selectedMember.name);
                      setMemberToBeRemovedId(selectedMember.id);
                      setOpenLeaveConsentModal(true);
                    }}>
                    Leave
                  </div>
                )}
              {user.user._id === admin._id && selectedMember.id !== admin._id && (
                <div
                  className='team__selectedButton'
                  onClick={() => {
                    setMemberToBeRemovedName(selectedMember.name);
                    setMemberToBeRemovedId(selectedMember.id);
                    setOpenConsentModal(true);
                  }}>
                  Remove
                </div>
              )}
            </div>
          ) : (
            <div className='team__noProfile'>No Profile Selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
