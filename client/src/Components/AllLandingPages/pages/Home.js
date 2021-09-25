import React from 'react';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/Hero/HeroSection';
import {
  homeObjHero,
  homeObjOne,
  homeObjThree,
  homeObjTwo,
  homeObjFour,
  homeObjFive,
} from '../components/InfoSection/Data';
import InfoSection from '../components/InfoSection/InfoSection';
import Navbar from '../components/Navbar/Navbar';
import Services from '../components/Services/Services';
import InfoHeader from '../components/InfoSection/InfoHeader';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <InfoHeader />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjFour} />
      <InfoSection {...homeObjFive} />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
