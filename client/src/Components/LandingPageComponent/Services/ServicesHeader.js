import React, { useEffect, useRef } from 'react';
import './ServicesHeader.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link as LinkScroll } from 'react-scroll';

const ServicesHeader = () => {
  const stickyRef = useRef();
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const element = stickyRef.current;
    gsap.fromTo(
      element,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 1,
        y: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: '0px 9.5%',
          end: '0px -265%',
          scrub: true,
          markers: false,
          pin: true,
        },
      }
    );
  }, []);
  return (
    <div className='servicesHeader' id='features'>
      <div className='servicesHeader__sticky' ref={stickyRef}>
        <div className='servicesHeader__top'>
          Ways to ease up with{' '}
          <span className='servicesHeader__logo'>teamup.</span>
        </div>
        <div className='servicesHeader__nav'>
          <LinkScroll
            to='backlog'
            activeClass='services__active'
            smooth={true}
            duration={500}
            spy={true}
            offset={-166}
            exact='true'
            className='servicesHeader__navItem1'>
            Epics
          </LinkScroll>
          <LinkScroll
            to='kanban'
            activeClass='services__active2'
            smooth={true}
            duration={100}
            spy={true}
            exact='true'
            offset={-166}
            className='servicesHeader__navItem1'>
            Board
          </LinkScroll>
          <LinkScroll
            to='collab'
            activeClass='services__active2'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-166}
            className='servicesHeader__navItem1'>
            Collab
          </LinkScroll>
          <LinkScroll
            to='reports'
            activeClass='services__active3'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-166}
            className='servicesHeader__navItem1 services__hide'>
            Insights
          </LinkScroll>
          <LinkScroll
            to='reports'
            activeClass='services__active3'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-166}
            className='servicesHeader__navItem1'>
            Insights
          </LinkScroll>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeader;
