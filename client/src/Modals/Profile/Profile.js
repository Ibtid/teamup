import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Scrollable from '../../Components/Scrollable/Scrollable';
import { isAuthenticated } from '../../API/auth-helper';
import { update } from '../../API/user';

import './Profile.css';

const useStyles = makeStyles((theme) => ({
  purple: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const Profile = (props) => {
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const jwt = isAuthenticated();
  const image = `http://localhost:5000/${user.user.image}`;
  const [previewUrl, setPreviewUrl] = useState(image);
  const [file, setFile] = useState();

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

  const classes = useStyles();
  const slide = props.openProfile ? 'slide__in' : 'slide__out';

  useEffect(() => {
    console.log(jwt.token);
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return ReactDOM.createPortal(
    <div className='profile'>
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
          <Avatar className={classes.purple} src={previewUrl} />
          <div className='profile__circle' onClick={pickImageHandler}>
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
