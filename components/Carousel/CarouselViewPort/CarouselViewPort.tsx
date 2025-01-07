import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from '../Carousel.module.scss';
import CarouselSlide from '@/components/Carousel/CarouselSlide/CarouselSlide';
import { EmblaViewportRefType } from 'embla-carousel-react';

const CarouselViewport = ({
  flashcards,
  emblaRef,
  emblaApi,
}: {
  flashcards: any[];
  emblaRef: EmblaViewportRefType;
  emblaApi: any;
}) => {
  const [flippedCards, setFlippedCards] = useState<{ [id: number]: boolean }>(
    {},
  );

  const handleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFlippedCards = useCallback(() => {
    setFlippedCards({});
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      resetFlippedCards();
    });
  }, [emblaApi, resetFlippedCards]);

  return (
    <div className={clsx(styles.carousel__viewport)} ref={emblaRef}>
      <div className={clsx(styles.carousel__container)}>
        {flashcards.map((flashcard, index) => (
          <CarouselSlide
            key={flashcard.id}
            flashcard={flashcard}
            isFlipped={flippedCards[index]}
            onFlip={() => handleFlip(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselViewport;
