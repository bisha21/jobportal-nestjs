'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'; // adjust import path

type TCarouselWrapperProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  opts?: Parameters<typeof Carousel>[0]['opts'];
  plugins?: Parameters<typeof Carousel>[0]['plugins'];
  className?: string;
  withControls?: boolean;
  onApiReady?: (api: CarouselApi) => void;
};

export default function CarouselWrapper<T>({
  items,
  renderItem,
  opts,
  plugins,
  className,
  withControls = true,
  onApiReady,
}: TCarouselWrapperProps<T>) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        ...opts,
      }}
      plugins={[
        Autoplay({ delay: 2500, stopOnInteraction: false }),
        ...(plugins || []),
      ]}
      setApi={onApiReady}
      className={className}
    >
      <CarouselContent>
        {items.map((item, idx) => (
          <CarouselItem key={idx} className="basis-1/3">
            {renderItem(item, idx)}
          </CarouselItem>
        ))}
      </CarouselContent>

      {withControls && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
