import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

import './LandingNav.css';

const LandingNav = () => {
  return (
    <div className='landingNav'>
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
          <Link to='/signin' className='landingNav__outlineButton'>
            Login
          </Link>
          <div className='landingNav__line'></div>
          <div className='landingNav__filledButton'>Open App</div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
