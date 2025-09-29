'use client';

import Image from 'next/image';
import CarouselWrapper from '../reusable/carousel';
import google from '@/public/google.png';
import amazon from '@/public/amazon.png';
import microsoft from '@/public/microsofy.png';
import netflix from '@/public/netflix.png';
import meta from '@/public/meta.png';
import PageHeader from '../reusable/pageheader';

const topCompanies = [
  { id: 1, name: 'Google', logo: google },
  { id: 2, name: 'Microsoft', logo: microsoft },
  { id: 3, name: 'Amazon', logo: amazon },
  { id: 4, name: 'Netflix', logo: netflix },
  { id: 5, name: 'Meta', logo: meta },
];

export default function TopCompanies() {
  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <PageHeader >Top Companies</PageHeader>
      <CarouselWrapper
        items={topCompanies}
        renderItem={(company) => (
          <div className="bg-white shadow rounded-xl flex flex-col items-center justify-center p-6">
            <Image
              src={company.logo}
              alt={company.name}
              width={80}
              height={80}
              className="object-contain"
            />
            <p className="mt-3 font-semibold">{company.name}</p>
          </div>
        )}
      />
    </section>
  );
}
