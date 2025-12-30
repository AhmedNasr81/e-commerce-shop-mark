"use client"
import React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel"

export default function ProductSlider({ images, altContent }: { images: string[], altContent: string }) {

  return (
    <Carousel 
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 2000 })]}
    >

      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <Image 
              src={img} 
              alt={altContent} 
              width={308} 
              height={300} 
              className="rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>


    </Carousel>
  );
}
