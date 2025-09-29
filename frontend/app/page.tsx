'use client';
// import useModalContext from '@/hooks/usemodal';
import React from 'react';
import HeroSection from '@/components/home/hero';
import TopCompanies from '@/components/home/topcompany';
import JobCategories from '@/components/home/jobcategory';
import Testimonials from '@/components/home/testnimonial';

function Home() {
  return (
    <>
      <HeroSection />
      <TopCompanies />
      <JobCategories/>
      <Testimonials/>
    </>
  );
}

export default Home;
