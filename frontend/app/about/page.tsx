import React from 'react';
import { HeroSection } from './_component/Hero';
import { HowItWorks } from './_component/how-it -work';
import { VideoSection } from './_component/video';
import { FAQSection } from './_component/faq';
import { PartnersSection } from './_component/partner';

function About() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <VideoSection/>
      <FAQSection/>
      {/* <PartnersSection/> */}

    </div>
  );
}

export default About;
