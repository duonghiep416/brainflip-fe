'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { useGetFlashcardQuery } from '@/features/flashcard/flashcardApiSlice';
import {
  PrevButton,
  NextButton,
} from '@/components/Carousel/CarouselArrowButton/CarouselArrowButton';

import styles from './Carousel.module.scss';
import { Button } from '@nextui-org/react';
import { FaPause, FaPlay } from 'react-icons/fa6';
import Link from 'next/link';

const Carousel = () => {
  const { flashcardSetId } = useParams<{ flashcardSetId: string }>();
  const { data } = useGetFlashcardQuery(flashcardSetId);

  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    AutoScroll({ playOnInit: false }),
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [id: number]: boolean }>(
    {},
  );
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const handleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  const resetFlippedCards = useCallback(() => {
    setFlippedCards({});
  }, []);

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
        resetFlippedCards();
      })
      .on('reInit', updateButtonStates);
  }, [emblaApi, updateButtonStates, resetFlippedCards]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());

    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false));
  }, [emblaApi]);

  return (
    <>
      {nextBtnDisabled && data?.data && data?.data.length > 0 && (
        <Fireworks
          autorun={{ speed: 3, duration: 3000, delay: 300 }}
          globalOptions={{ useWorker: true, resize: true }}
        />
      )}
      <div className={clsx(styles.carousel)}>
        <div className={clsx(styles.carousel__viewport)} ref={emblaRef}>
          <div className={clsx(styles.carousel__container)}>
            {data?.data.length === 0 && (
              <div className={clsx(styles.carousel__slide)}>
                <div className={clsx(styles.carousel__slideContent)}>
                  <div className={clsx(styles.carousel__front)}>
                    <span></span>
                    <div className={clsx(styles.carousel__noCards)}>
                      <p className="">No flashcards found</p>
                      <Button
                        as={Link}
                        href={`/flashcards/${flashcardSetId}/edit`}
                        className="mt-4"
                        variant="bordered"
                        radius="full"
                        size="lg"
                      >
                        Create Flashcard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {data?.data.map((flashcard, index) => (
              <div
                key={flashcard.id}
                className={clsx(styles.carousel__slide)}
                onClick={() => handleFlip(index)}
              >
                <div
                  className={clsx(
                    styles.carousel__slideContent,
                    flippedCards[index] && styles.carousel__flipped,
                  )}
                >
                  <div className={clsx(styles.carousel__front)}>
                    <span>{flashcard.term}</span>
                  </div>
                  <div className={clsx(styles.carousel__back)}>
                    <span>{flashcard.definition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data?.data && data?.data.length > 0 && (
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
            <Button
              className={clsx(styles.carousel__play)}
              onClick={toggleAutoplay}
              type="button"
              isIconOnly
              radius="full"
              variant="flat"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel;
