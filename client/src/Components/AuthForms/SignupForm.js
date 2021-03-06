import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { emailVerification } from '../../API/auth';
import { create } from '../../API/user';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import VerificationCode from '../../Modals/VerificationCode/VerificationCode';

const SignupForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [slideOn, setSlideOn] = useState('team__slideOn');

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    username: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    setLoading(true);
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      username: values.username || undefined,
    };
    emailVerification(user).then((response) => {
      if (response.success) {
        setLoading(false);
        setOpenVerification(true);
      } else {
        setMessage(response.message);
        setOpen(true);
        setLoading(false);
      }
    });
  };
  return (
    <div className={`signin__form ${slideOn}`}>
      {loading && <Spinkit />}
      {openVerification && (
        <VerificationCode
          setOpen={() => setOpenVerification(false)}
          name={values.name}
          email={values.email}
          password={values.password}
          username={values.username}
        />
      )}
      {open && (
        <ResponseModal setOpen={() => setOpen(false)} message={message} />
      )}
      <div className='signin__header'>Welcome!</div>
      <div className='signin__inputdiv'>
        <div className='signin__label'>Username</div>
        <input
          className='signin__input'
          id='username'
          placeholder='e.g alex89'
          type='text'
          value={values.username}
          onChange={handleChange('username')}
        />
      </div>
      <div className='signin__inputdiv'>
        <div className='signin__label'>Full Name</div>
        <input
          className='signin__input'
          id='name'
          placeholder='First and last name'
          type='text'
          value={values.name}
          onChange={handleChange('name')}
        />
      </div>
      <div className='signin__inputdiv'>
        <div className='signin__label'>Email</div>
        <input
          className='signin__input'
          id='email'
          type='text'
          placeholder='.gmail.com'
          value={values.email}
          onChange={handleChange('email')}
        />
      </div>
      <div className='signin__inputdiv'>
        <div className='signin__label'>Password</div>
        <input
          className='signin__input'
          id='password'
          type='password'
          placeholder='At least 6 characters'
          value={values.password}
          onChange={handleChange('password')}
        />
      </div>
      <div className='signin__buttondiv'>
        <button className='signin__button' onClick={clickSubmit}>
          Sign Up
        </button>
      </div>
      <div className='signin__switchState'>
        <div>Already have an account?</div>
        <div
          className='signin__orange'
          onClick={() => {
            setSlideOn('team__slideOff');
            setTimeout(() => {
              history.push('/signin');
            }, 300);
          }}>
          Sign In
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
