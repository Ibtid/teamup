import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import './Footer.css';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <footer className='FooterContainer'>
      <div className='FooterWrap'>
        <div className='FooterLinksContainer'>
          <div className='FooterLinksWrapper'>
            <div className='FooterLinkItems'>
              <h1 className='FooterLinkTitle'>About Us</h1>
              <Link className='FooterLink' to='/'>
                How it works
              </Link>
              <Link className='FooterLink' to='/'>
                Testimonials
              </Link>
              <Link className='FooterLink' to='/'>
                Careers
              </Link>
              <Link className='FooterLink' to='/'>
                Investors
              </Link>
            </div>
            <div className='FooterLinkItems'>
              <h1 className='FooterLinkTitle'>Contact Us</h1>
              <Link className='FooterLink' to='/'>
                Contact
              </Link>
              <Link className='FooterLink' to='/'>
                Support
              </Link>
              <Link className='FooterLink' to='/'>
                Destination
              </Link>
              <Link className='FooterLink' to='/'>
                Sponsorship
              </Link>
            </div>
          </div>
          <div className='FooterLinksWrapper'>
            <div className='FooterLinkItems'>
              <h1 className='FooterLinkTitle'>Videos</h1>
              <Link className='FooterLink' to='/'>
                Submit Video
              </Link>
              <Link className='FooterLink' to='/'>
                Ambassadors
              </Link>
              <Link className='FooterLink' to='/'>
                Agency
              </Link>
              <Link className='FooterLink' to='/'>
                Influencer
              </Link>
            </div>
            <div className='FooterLinkItems'>
              <h1 className='FooterLinkTitle'>Social Media</h1>
              <Link className='FooterLink' to='/'>
                Instagram
              </Link>
              <Link className='FooterLink' to='/'>
                Facebook
              </Link>
              <Link className='FooterLink' to='/'>
                Youtube
              </Link>
              <Link className='FooterLink' to='/'>
                Twitter
              </Link>
            </div>
          </div>
        </div>
        <section className='SocialMedia'>
          <div className='SocialMediaWrap'>
            <Link className='SocialLogo' to='/' onClick={toggleHome}>
              teamup.
            </Link>
            <small className='WebsiteRights'>
              teamup © {new Date().getFullYear()}. All rights reserved.
            </small>
            <div className='SocialIcons'>
              <a
                className='SocialIconLink'
                href='/'
                target='_blank'
                aria-label='Facebook'>
                <FaFacebook />
              </a>
              <a
                className='SocialIconLink'
                href='/'
                target='_blank'
                aria-label='Instagram'>
                <FaInstagram />
              </a>
              <a
                className='SocialIconLink'
                href='/'
                target='_blank'
                aria-label='Youtube'>
                <FaYoutube />
              </a>
              <a
                className='SocialIconLink'
                href='/'
                target='_blank'
                aria-label='Twitter'>
                <FaTwitter />
              </a>
              <a
                className='SocialIconLink'
                href='/'
                target='_blank'
                aria-label='Linkedin'>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
