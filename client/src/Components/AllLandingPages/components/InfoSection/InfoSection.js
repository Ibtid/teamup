import React, { useRef, useEffect } from 'react';
import { Link as LinkS } from 'react-scroll';
import '../Button.css';
import './InfoSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InfoSection = (props) => {
  let column1Ref = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const element = column1Ref.current;
    gsap.fromTo(
      element,
      {
        opacity: 1,
        scale: 1,
        x: -1200,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: '0px 30%',
          end: '0px -5%',
          scrub: true,
          markers: false,
          pin: true,
        },
      }
    );
  }, []);

  return (
    <div
      className={`InfoContainer ${props.lightBg ? 'lightBg' : ''}`}
      id={props.id}>
      <div className='InfoWrapper' ref={column1Ref}>
        <div
          className={`InfoRow ${props.imgStart ? 'imgStart' : ''}`}
          id='services'>
          <div className='Column1'>
            <div className='TextWrapper'>
              {/*<p className='TopLine'>{props.topline}</p>*/}
              <h1 className={`Heading ${props.lightText ? 'lightText' : ''}`}>
                {props.headline}
              </h1>
              <p className={`Subtitle ${props.darkText ? 'darkText' : ''}`}>
                {props.description}
              </p>
              {/*<div className="BtnWrap">
                                <LinkS
                                className={`Button ${props.lightBg?"":"primary"}`}
                                to="home"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                >
                                    {props.buttonLabel}
                                </LinkS>
    </div>*/}
            </div>
          </div>
          <div className='Column2'>
            <div className='ImgWrap'>
              <img className='Img' src={props.img} alt={props.alt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
