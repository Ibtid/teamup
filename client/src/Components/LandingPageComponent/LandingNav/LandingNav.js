import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import { Avatar } from '@material-ui/core';
import Profile from '../../../Modals/Profile/Profile';
import { useHistory } from 'react-router-dom';

import './LandingNav.css';

const LandingNav = () => {
  const user = JSON.parse(sessionStorage.getItem('jwt'));
  const [openProfile, setOpenProfile] = useState(false);
  let history = useHistory();

  return (
    <div className='landingNav'>
      {openProfile && (
        <Profile
          openProfile={openProfile}
          closeProfile={() => {
            setOpenProfile(!setOpenProfile);
          }}
        />
      )}
      <div className='landingNav__container'>
        <div className='landingNav__leftSide'>
          <div className='landingNav__logo'>teamup.</div>
          <div className='landingNav__Menu'>
            <LinkS
              to='features'
              activeClass='landingNav__active'
              smooth={true}
              duration={4000}
              spy={true}
              offset={215}
              exact='true'
              className='landingNav__MenuItem'>
              Features
            </LinkS>
            <LinkS
              to='reviews'
              smooth={true}
              duration={2000}
              spy={true}
              offset={180}
              activeClass='landingNav__active'
              exact='true'
              className='landingNav__MenuItem '>
              Reviews
            </LinkS>

            <LinkS
              to='footer'
              smooth={true}
              activeClass='landingNav__active'
              duration={1000}
              spy={true}
              offset={0}
              exact='true'
              className='landingNav__MenuItem'>
              Contact Us
            </LinkS>
          </div>
        </div>
        <div className='landingNav__rightSide'>
          <div
            className='landingNav__filledButton'
            onClick={() => {
              if (user) {
                history.push('/project');
              } else {
                history.push('/signin');
              }
            }}>
            Open App
          </div>

          <div className='landingNav__line'></div>

          {user ? (
            <div
              className='landingNav__outlineButton paddingRightNav'
              onClick={() => {
                setOpenProfile(true);
              }}>
              <Avatar
                style={{ height: '2vw', width: '2vw' }}
                src={`http://localhost:5000/${user.user.image}`}
              />
              <div className='project__name'>
                {user ? user.user.username : 'Nafiz Imtiaz'}
              </div>
            </div>
          ) : (
            <Link to='/signin' className='landingNav__outlineButton'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
