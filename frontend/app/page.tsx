'use client';
import CarouselWrapper from '@/components/reusable/carousel';
import JobTable from '@/components/test-table';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import useModalContext from '@/hooks/usemodal';
import React from 'react';
import logo from '@/public/next.svg'
import Image from 'next/image';

function Home() {
  const cards = [
    { title: 'Card One', description: 'This is the first card.' },
    { title: 'Card Two', description: 'This is the second card.' },
    { title: 'Card Three', description: 'This is the third card.' },
    { title: 'Card Four', description: 'This is the fourth card.' },
  ];
  // const { openModal } = useModalContext();
  return (
    <>
      <section className="text-center">
        <h1 className="flex flex-col justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-2">
          Find Your Dream Job
          <span className="flex gap-2 items-center justify-center sm:gap-6">
            And Get
            <Image src={logo} alt="logo" className="h-14 sm:h-24 lg:h-42" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus, libero!
        </p>
      </section>

      <JobTable />

      <div className="w-full max-w-2xl mx-auto">
        <CarouselWrapper
          items={cards}
          renderItem={(card) => (
            <Card className="p-4 shadow-md">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          )}
          withControls
          opts={{ loop: true }}
        />
      </div>
    </>
  );
}

export default Home;
