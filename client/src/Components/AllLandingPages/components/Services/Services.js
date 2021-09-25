import React from 'react';

import Icon1 from '../../assests/banner3.png';
import Icon2 from '../../assests/nafiz.jpg';
import Icon3 from '../../assests/nafiz.jpg';

import './Services.css';

const Services = () => {
  return (
    <div className='ServicesContainer' id='services'>
      <div className='ServicesH1'>Our Services</div>
      <div className='ServicesWrapper'>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon1} />
          <h2 className='ServicesH2'>Reduce expenses</h2>
          <p className='ServicesP'>
            We help reduce your fess and increase your over all revenue
          </p>
        </div>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon2} />
          <h2 className='ServicesH2'>Virtual Offices</h2>
          <p className='ServicesP'>
            You can access our platform online anywhere in the world
          </p>
        </div>
        <div className='ServicesCard'>
          <img className='ServicesIcon' src={Icon3} />
          <h2 className='ServicesH2'>Premium Benefits</h2>
          <p className='ServicesP'>
            Unlock our special membership card that return 5% cash back
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
