import React from 'react';

import Icon1 from '../../assests/banner3.png';
import Icon2 from '../../assests/nafiz.jpg';
import Icon3 from '../../assests/Robi.PNG';

import './Services.css';

const Services = () => {
  return (
    <div className='ServicesContainer' id='reviews'>
      <div className='ServicesWrapper'>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon2} />
          <h2 className='ServicesH2'>Nafiz Imtiaz</h2>
          <p className='ServicesP'>
            "It has been amazing to have teamup. It is easy to get used to with
            providing the best tools."
          </p>
        </div>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon3} />
          <h2 className='ServicesH2'>Adnan Rahman Robe</h2>
          <p className='ServicesP'>
            "You can access this. platform online anywhere in the world. Virtual
            Office now looks fun."
          </p>
        </div>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon1} />
          <h2 className='ServicesH2'>Ibtid Rahman</h2>
          <p className='ServicesP'>
            "Teamup has been essential part of our business. I would definitely
            reccomend Teamup."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;