import React, { useCallback, useEffect, useRef, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import styles from '../Carousel.module.scss';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import FireworksEffect from '@/components/FireworksEffect/FireworksEffect';
import CarouselViewport from '@/components/Carousel/CarouselViewPort/CarouselViewPort';
import CarouselControls from '@/components/Carousel/CarouselControls/CarouselControls';
import { Flashcard } from '@/features/flashcard/types';

const CarouselContainer = ({
  flashcards,
  flashcardSetId,
}: {
  flashcards: Flashcard[];
  flashcardSetId: string;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    AutoScroll({ playOnInit: false }),
  ]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const updateButtonStates = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtonStates();

    emblaApi
      .on('select', () => {
        updateButtonStates();
      })
      .on('reInit', updateButtonStates);
  }, [emblaApi, updateButtonStates]);

  return (
    <>
      <FireworksEffect isVisible={nextBtnDisabled && flashcards.length > 1} />
      {Boolean(flashcards.length) && (
        <div className={styles.carousel}>
          <CarouselViewport
            flashcards={flashcards}
            emblaRef={emblaRef}
            emblaApi={emblaApi}
          />
          <CarouselControls emblaApi={emblaApi} />
        </div>
      )}
    </>
  );
};

export default CarouselContainer;
