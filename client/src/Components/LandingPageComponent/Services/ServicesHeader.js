import React, { useEffect, useRef } from 'react';
import './ServicesHeader.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <div className='servicesHeader'>
      <div className='servicesHeader__sticky' ref={stickyRef}>
        <div className='servicesHeader__top'>
          Ways to ease up with{' '}
          <span className='servicesHeader__logo'>teamup.</span>
        </div>
        <div className='servicesHeader__nav'>
          <div className='servicesHeader__navItem1'>Backlog</div>
          <div className='servicesHeader__navItem1'>Kanban</div>
          <div className='servicesHeader__navItem1'>Collab</div>
          <div className='servicesHeader__navItem2'>Insights</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeader;
