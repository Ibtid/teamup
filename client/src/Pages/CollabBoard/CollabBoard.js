import React, { useState, useEffect } from 'react';
import './CollabBoard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import ArtBoard from '../../Components/ArtBoard/ArtBoard';
import CreateRoom from '../../Components/CreateRoom/CreateRoom';
import Button from '../../Components/Button/Button';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Avatar } from '@material-ui/core';
import { getOnline, getActives, getOffline } from '../../API/active';
import { useParams } from 'react-router';
import Pusher from 'pusher-js';
import { deleteAllPitchers } from '../../API/pitcher';

const CollabBoard = () => {
  const { projectId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const [activeMembers, setActiveMembers] = useState([]);
  const [cleanSignal, setCleanSignal] = useState(false);

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('actives');
    channel.bind('deleted', function (data) {
      getActives(projectId).then((response) => {
        console.log(response);
        if (response.success) {
          setActiveMembers(response.actives);
        } else {
          console.log(response.message);
        }
      });
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('actives');
    channel.bind('inserted', function (data) {
      console.log('INserted', data);
      setActiveMembers([...activeMembers, data.message]);
      console.log('active members', activeMembers);
      getActives(projectId).then((response) => {
        console.log(response);
        if (response.success) {
          setActiveMembers(response.actives);
        } else {
          console.log(response.message);
        }
      });
    });
  }, []);

  useEffect(() => {
    let body = {
      projectId,
      image: user.user.image,
    };
    getOnline(body).then((response) => {});
    getActives(projectId).then((response) => {
      if (response.success) {
        setActiveMembers(response.actives);
      } else {
      }
    });
    return () => {
      getOffline(body).then((response) => {
        console.log(response);
      });
    };
  }, []);
  const clearBoard = () => {
    deleteAllPitchers(projectId).then((response) => {
      setCleanSignal(!cleanSignal);
    });
  };
  return (
    <div className='collabboard'>
      <div className='collabboard__navbar'>
        <BigDropDown />
        <Button onClick={clearBoard}>Clear Board</Button>
        <AvatarGroup style={{ margin: '0vw 0vw 0vw 2vw' }} max={8}>
          {activeMembers.length !== 0 &&
            activeMembers.map((member) =>
              member.image !== user.user.image ? (
                <Avatar
                  style={{
                    height: '4.7vh',
                    width: '2.35vw',
                  }}
                  alt='Remy Sharp'
                  src={`http://localhost:5000/${member.image}`}
                />
              ) : (
                <div style={{ display: 'none' }}></div>
              )
            )}
          <Avatar
            style={{
              height: '4.7vh',
              width: '2.35vw',
            }}
            alt='Remy Sharp'
            src={`http://localhost:5000/${user.user.image}`}
          />
        </AvatarGroup>
      </div>
      <div className='collabboard__content'>
        <div className='collabboard__left'>
          <ArtBoard cleanSignal={cleanSignal} />
        </div>
        <div className='collabboard__right'>
          <CreateRoom />
        </div>
      </div>
    </div>
  );
};

export default CollabBoard;
