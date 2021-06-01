import React, { useState } from 'react';
import image from './signin_image.svg';
import { Link } from 'react-router-dom';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import './Signin.css';
import { useHistory } from 'react-router-dom';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import { signin } from '../../API/auth';
import { authenticate } from '../../API/auth-helper';
import { useStateValue } from '../../StateProvider/StateProvider';

const Signin = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const [values, setValues] = useState({
    password: '',
    email: '',
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    setLoading(true);
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((response) => {
      console.log(response);
      if (response.success) {
        authenticate(response);
        dispatch({
          type: 'SIGN_IN',
          user: response.user,
        });
        setLoading(false);
        history.push('/project');
      } else {
        setMessage(response.message);
        setOpen(true);
        setLoading(false);
      }
    });

    /*history.push('/project');*/
  };
  return (
    <div className='signin'>
      {loading && <Spinkit />}
      {open && (
        <ResponseModal setOpen={() => setOpen(false)} message={message} />
      )}
      <div className='signin__navbar'>teamup.</div>
      <div className='signin__content'>
        <div className='signin__contentLeft'>
          <div className='signin__bigTextContainer'>
            <div className='signin__bigText'>
              Let's make the world productive,
            </div>
            <div className='signin__bigText'>together.</div>
          </div>
          <div className='signin__imageContainer'>
            <img className='signin__image' src={image} alt='' />
          </div>
        </div>
        <div className='signin__contentRight'>
          <div className='signin__form'>
            <div className='signin__header'>Welcome!</div>
            <div className='signin__inputdiv'>
              <div className='signin__label'>Email</div>
              <input
                className='signin__input'
                id='email'
                type='text'
                placeholder='Enter Email'
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
                placeholder='Enter Password'
                value={values.password}
                onChange={handleChange('password')}></input>
            </div>
            <div className='signin__buttondiv'>
              <button className='signin__button' onClick={clickSubmit}>
                Sign In
              </button>
            </div>
            <div className='signin__switchState'>
              <div>Don't have an account?</div>
              <Link to='/signup' className='signin__orange'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
