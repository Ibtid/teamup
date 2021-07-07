import React, { useState, useEffect } from 'react';
import './CollabBoard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import ArtBoard from '../../Components/ArtBoard/ArtBoard';
import CreateRoom from '../../Components/CreateRoom/CreateRoom';
import Button from '../../Components/Button/Button';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Avatar } from '@material-ui/core';
import { getOnline, getActives } from '../../API/active';
import { useParams } from 'react-router';

const CollabBoard = () => {
  const { projectId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  useEffect(() => {
    let body = {
      projectId,
      image: user.user.image,
    };
    /*getOnline(body).then((response) => {
      console.log(response);
    });*/
    getActives(projectId).then((response) => {
      console.log(response);
    });
    return;
  }, []);
  return (
    <div className='collabboard'>
      <div className='collabboard__navbar'>
        <BigDropDown />
        <Button>Clear Board</Button>
        <AvatarGroup style={{ margin: '0vw 0vw 0vw 2vw' }} max={8}>
          <Avatar
            style={{
              height: '5vh',
              width: '2.5vw',
              border: '0.3vh solid #f2f2f2',
            }}
            alt='Remy Sharp'
            src='http://localhost:5000/uploads/5259b634-ab6e-411d-83d8-2720915a8cf9.jpeg'
          />
          <Avatar
            style={{
              height: '5vh',
              width: '2.5vw',
              border: '0.3vh solid #f2f2f2',
            }}
            alt='Travis Howard'
            src='http://localhost:5000/uploads/11e3277b-b3db-4613-b690-0b5e8271e90b.jpeg'
          />
          <Avatar
            style={{
              height: '5vh',
              width: '2.5vw',
              border: '0.3vh solid #f2f2f2',
            }}
            alt='Cindy Baker'
            src='http://localhost:5000/uploads/134cae90-51a5-4fb8-b305-2b484d43fc78.jpeg'
          />
        </AvatarGroup>
      </div>
      <div className='collabboard__content'>
        <div className='collabboard__left'>
          <ArtBoard />
        </div>
        <div className='collabboard__right'>
          <CreateRoom />
        </div>
      </div>
    </div>
  );
};

export default CollabBoard;
