import React from 'react';
import ReactDOM from 'react-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Scrollable from '../../Components/Scrollable/Scrollable';
import image from './Untitled1.jpg';

import './Profile.css';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: '3vh',
  },
}));

const Profile = (props) => {
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  const classes = useStyles();
  const slide = props.openProfile ? 'slide__in' : 'slide__out';
  return ReactDOM.createPortal(
    <div className='profile'>
      <div className={`profile__container ${slide}`}>
        <div className='profile__closeButton' onClick={props.closeProfile}>
          <DoubleArrowIcon />
        </div>
        <div className='profile__imageSection'>
          <Avatar className={classes.purple} src={image} />

          <div className='profile__circle'>
            <div className='profile__addPictureButton slide__in'>
              <AddAPhotoIcon />
            </div>
          </div>
        </div>
        <div className='profile__fullName'>Ibtid Rahman</div>
        <div className='profile__info'>
          <Scrollable>
            <div className='profile__infoTitle'>Personal Info</div>
            <div className='profile__infoData'>Username: ibtid43</div>
            <div className='profile__infoData'>Email: ibtid011@gmail.com</div>
            <div className='profile__infoTitle'>Project(s)</div>
            <div className='profile__infoData'>TeamUp</div>
            <div className='profile__infoData'>Horek-Rokom</div>
            <div className='profile__infoData'>DodgeLegends</div>
            <div className='profile__infoTitle'>Tags</div>
            <div className='profile__tagContainer'>
              <div className='profile__tag'>Front End</div>
              <div className='profile__tag'>UI/UX</div>
              <div className='profile__tag'>Prototype</div>
              <div className='profile__tag'>IA</div>
              <div className='profile__tag'>Wireframing</div>
            </div>
          </Scrollable>
        </div>
        <div className='logoutButton'>Logout</div>
      </div>
    </div>,
    document.getElementById('profile')
  );
};

export default Profile;
