import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Avatar } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Scrollable from '../../Components/Scrollable/Scrollable';
import { isAuthenticated } from '../../API/auth-helper';
import { update } from '../../API/user';
import { signout } from '../../API/auth';
import { useHistory } from 'react-router-dom';
import Spinkit from '../Spinkit/Spinkit';
import ResponseModal from '../ResponseModal/ResponseModal';

import './Profile.css';

const Profile = (props) => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const jwt = isAuthenticated();
  const image = `http://localhost:5000/${user.user.image}`;
  const [previewUrl, setPreviewUrl] = useState(image);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const tags =
    user.user.tags.length !== 0
      ? [
          user.user.tags[0].word,
          user.user.tags[1].word,
          user.user.tags[2].word,
          user.user.tags[3].word,
          user.user.tags[4].word,
          user.user.tags[5].word,
          user.user.tags[6].word,
        ]
      : [];

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleImage = async (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }

    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    update({ userId: user.user._id }, { t: jwt.token }, formData).then(
      (response) => {
        console.log(response);
        if (response.success) {
          user.user.image = response.user.image;
          sessionStorage.setItem('jwt', JSON.stringify(user));
        }
      }
    );
  };

  const slide = props.openProfile ? 'slide__in' : 'slide__out';

  useEffect(() => {
    console.log(user);
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const logout = () => {
    setLoading(true);
    signout().then((response) => {
      if (response.success) {
        history.push('/signin');
        sessionStorage.removeItem('jwt');
        setLoading(false);
      } else {
        setMessage('Failed to Logout');
        setOpen(true);
        setLoading(false);
      }
    });
  };

  return ReactDOM.createPortal(
    <div className='profile'>
      {loading && <Spinkit />}
      {open && (
        <ResponseModal setOpen={() => setOpen(false)} message={message} />
      )}
      <div className={`profile__container ${slide}`}>
        <div className='profile__closeButton' onClick={props.closeProfile}>
          <DoubleArrowIcon />
        </div>
        <div className='profile__imageSection'>
          <input
            style={{ display: 'none' }}
            ref={filePickerRef}
            type='file'
            className='newProduct__input'
            id='image'
            name='image'
            placeholder='Choose the image'
            accept='.jpg,.png,.jpeg'
            onChange={handleImage}
          />
          <Avatar
            style={{ width: '9.4vw', height: '19.7vh' }}
            src={previewUrl}
          />
          <div className='profile__circle' onClick={pickImageHandler}>
            <div className='profile__addPictureButton'>
              <AddAPhotoIcon style={{ width: '2.75vw', height: '5.5vh' }} />
            </div>
          </div>
        </div>
        <div className='profile__fullName'>{`${user.user.name}`}</div>
        <div className='profile__info'>
          <Scrollable>
            <div className='profile__infoTitle'>Personal Info</div>
            <div className='profile__infoData'>
              Username: {user.user.username}
            </div>
            <div className='profile__infoData'>Email: {user.user.email}</div>
            <div className='profile__infoTitle'>Project(s)</div>
            {user.user.projects.length !== 0 &&
              user.user.projects.map((project) => (
                <div className='profile__infoData'>{project.name}</div>
              ))}
            <div className='profile__infoTitle'>Recent Tags</div>
            <div className='profile__tagContainer'>
              {user.user.tags &&
                tags.map((tag) => <div className='profile__tag'>{tag}</div>)}
              {tags.length === 0 && (
                <div className='profile__infoData'>No Recent Tags</div>
              )}
            </div>
          </Scrollable>
        </div>
        <div className='logoutButton' onClick={logout}>
          Logout
        </div>
      </div>
    </div>,
    document.getElementById('profile')
  );
};

export default Profile;
