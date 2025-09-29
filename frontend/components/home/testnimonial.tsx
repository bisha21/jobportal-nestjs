'use client';

import testimonials from '@/data/testimonial.json';
import Image from 'next/image';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import PageHeader from '../reusable/pageheader';
import CarouselWrapper from '../reusable/carousel';

export default function TestimonialsCarousel() {
  const getSocialIcon = (platform: string) => {
    if (platform === 'twitter') return <Twitter />;
    if (platform === 'instagram') return <Instagram />;
    if (platform === 'facebook') return <Facebook />;
    return null;
  };

  const renderTestimonial = (t: (typeof testimonials)[0], index: number) => (
    <div
      key={index}
      className="p-8 bg-card border border-border shadow-lg rounded-3xl shadow-gray-600/10"
    >
      <div className="flex gap-4 items-start">
        <Image
          className="w-12 h-12 rounded-full"
          src={t.avatar}
          alt={t.name}
          width={200}
          height={200}
          loading="lazy"
        />
        <div className="flex-1 flex justify-between items-start">
          <div>
            <h6 className="text-lg font-medium text-foreground">{t.name}</h6>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>
          <a
            href={t.social.url}
            className="text-primary hover:text-primary/80 ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getSocialIcon(t.social.platform)}
          </a>
        </div>
      </div>
      <p className="mt-8 text-muted-foreground">{t.review}</p>
    </div>
  );

  return (
    <section className="pb-12 mx-auto md:pb-20 max-w-7xl">
      <div className="py-4 text-center md:py-8">
        <PageHeader>Testimonials</PageHeader>
      </div>

      <CarouselWrapper
        items={testimonials}
        renderItem={renderTestimonial}
        opts={{ align: 'center', loop: true }}
        plugins={[]}
        className="gap-8 space-y-8"
      />
    </section>
  );
}
