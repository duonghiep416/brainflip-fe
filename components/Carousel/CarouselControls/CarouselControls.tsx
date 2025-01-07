import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { FaPause, FaPlay } from 'react-icons/fa6';

import {
  PrevButton,
  NextButton,
} from '@/components/Carousel/CarouselArrowButton/CarouselArrowButton';

import styles from '../Carousel.module.scss';
import { Button } from '@nextui-org/react';
import { EmblaCarouselType } from 'embla-carousel';

const CarouselControls = ({ emblaApi }: { emblaApi: any }) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    autoScroll.isPlaying() ? autoScroll.stop() : autoScroll.play();
  }, [emblaApi]);

  const updateButtonStates = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtonStates();
    onScroll(emblaApi);

    emblaApi
      .on('select', updateButtonStates)
      .on('reInit', () => {
        updateButtonStates();
        onScroll(emblaApi);
      })
      .on('scroll', () => onScroll(emblaApi))
      .on('slideFocus', () => onScroll(emblaApi));
  }, [emblaApi, updateButtonStates, onScroll]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());

    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false));
  }, [emblaApi]);

  return (
    <div className={clsx(styles.carousel__controls)}>
      <div className={clsx(styles.carousel__buttons)}>
        <PrevButton
          onClick={() => emblaApi?.scrollPrev()}
          disabled={prevBtnDisabled}
          className={prevBtnDisabled ? styles.carousel__disabled : ''}
        />
        <NextButton
          onClick={() => emblaApi?.scrollNext()}
          disabled={nextBtnDisabled}
          className={nextBtnDisabled ? styles.carousel__disabled : ''}
        />
      </div>
      <div className="flex-center-vertical gap-3">
        <div className={clsx(styles.carousel__progress)}>
          <div
            className={clsx(styles.carousel__progress__bar, 'dark:bg-white')}
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
        <Button
          className={clsx(styles.carousel__play)}
          onClick={toggleAutoplay}
          type="button"
          variant="bordered"
          radius="full"
          isIconOnly
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
      </div>
    </div>
  );
};

export default CarouselControls;
