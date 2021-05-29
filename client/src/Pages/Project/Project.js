import React, { useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Project.css';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: '3vh',
  },
}));

const Project = () => {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className='project'>
      <div className='project__navbar'>
        <div className='project__logo'>teamup.</div>
        <div className='project__accountInfo'>
          <Avatar className={classes.purple}>N</Avatar>
          <div className='project__name'>{user ? user.user.name : 'Nafiz'}</div>
        </div>
      </div>
      <div className='project__content'>
        <div className='project__contentText'>
          <div>Create projects or collaborate</div>
          <div>with your team</div>
        </div>
        <div className='project__buttondiv'>
          <div className='project__buttondrop'>
            <div className='project__buttondropText'>Choose Project</div>
            <div className='project__icon'>
              <ExpandMoreIcon />
            </div>
          </div>
          <div className='project__smallText'>Or</div>
          <button className='project__button'>Create Project</button>
        </div>
      </div>
    </div>
  );
};

export default Project;
