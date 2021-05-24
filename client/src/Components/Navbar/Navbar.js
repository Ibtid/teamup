import React from 'react';
import Button from '../Button/Button';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Navbar.css';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    fontSize: '3vh',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className='navbar'>
      <div className='navbar__logo'>teamup.</div>
      <div className='navbar__right'>
        <Button>+ New Project</Button>
        <div className='navbar__icon'>
          <NotificationsIcon />
        </div>
        <div className='navbar__profile'>
          <Avatar className={classes.purple}>N</Avatar>
          <div className='project__name'>Nafiz</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
