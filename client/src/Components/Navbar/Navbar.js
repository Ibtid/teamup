import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Profile from '../../Modals/Profile/Profile';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './Navbar.css';
import AllNotifications from '../../Modals/AllNotifications/AllNotifications';
import { getNotifications } from '../../API/user';
import Pusher from 'pusher-js';

const useStyles = makeStyles((theme) => ({
  purple: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getNotifications(user.user._id).then((response) => {
      if (response.success) {
        setNotifications(response.notifications);
      }
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('notifications');
    channel.bind('notificationUpdate', function (data) {
      getNotifications(user.user._id).then((response) => {
        if (response.success) {
          setNotifications(response.notifications);
        }
      });
    });
  }, []);

  const classes = useStyles();
  return (
    <div className='navbar'>
      {openProfile && (
        <Profile
          openProfile={openProfile}
          closeProfile={() => {
            setOpenProfile(!setOpenProfile);
          }}
        />
      )}
      {openNotifications && notifications.length !== 0 && (
        <AllNotifications notifications={notifications} />
      )}
      <div className='navbar__logo'>teamup.</div>
      <div className='navbar__right'>
        <Button>+ New Project</Button>
        <div
          className='navbar__icon'
          onClick={() => {
            if (isOpen) {
              setOpenNotifications(false);
              setNotifications([]);
              setIsOpen(false);
            } else if (!isOpen && notifications.length) {
              setOpenNotifications(true);
              setIsOpen(true);
            } else {
              setOpenNotifications(false);
              setIsOpen(false);
            }
          }}>
          {notifications.length !== 0 ? (
            <div className='navbar__shakeIcon'>
              <NotificationsIcon
                style={{ fontSize: '2vw' }}
                className='shake'
              />
              <div className='navbar__notificationNumber'>
                {notifications.length}
              </div>
            </div>
          ) : (
            <NotificationsIcon style={{ fontSize: '2vw' }} />
          )}
        </div>
        <div
          className='navbar__profile'
          onClick={() => {
            setOpenProfile(true);
          }}>
          <Avatar
            className={classes.purple}
            src={`http://localhost:5000/${user.user.image}`}
          />
          <div className='project__name'>
            {user ? user.user.username : 'Nafiz Imtiaz'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
