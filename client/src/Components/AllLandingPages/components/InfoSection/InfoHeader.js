import React, { useRef, useEffect } from 'react';
import './InfoHeader.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InfoHeader = () => {
  const ref = useRef(null);
  /*gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = ref.current;
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        toggleActions: 'restart pause reverse pause',
      },
      x: 400,
      rotation: 360,
      duration: 2,
    });
  }, []);*/

  return (
    <div className='info-header' ref={ref} id='about'>
      <div className='info-header-title1'>Work Together, Grow Together</div>
      <div className='info-header-subtitle'>
        We help our customers to tell about themselves, to grow and stand out in
      </div>
      <div className='info-header-subtitle'>
        an increasingly competitive digital world, through creative projects
      </div>
      <div className='info-header-subtitle'>
        are able to attract and involve, creating strategic value.
      </div>
      <div className='info-header-subtitle'>
        Make plans and do project together
      </div>
      <div className='info-header-subtitle'>
        without thinking about the distance
      </div>
    </div>
  );
};

export default InfoHeader;
