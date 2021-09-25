import React from 'react';
import { Link as LinkS } from 'react-scroll';
import '../Button.css';
import './InfoSection.css';

const InfoSection = (props) => {
  return (
    <div
      className={`InfoContainer ${props.lightBg ? 'lightBg' : ''}`}
      id={props.id}>
      <div className='InfoWrapper'>
        <div className={`InfoRow ${props.imgStart ? 'imgStart' : ''}`}>
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
