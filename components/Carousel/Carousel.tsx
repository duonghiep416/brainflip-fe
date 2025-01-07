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
import CarouselContainer from '@/components/Carousel/CarouselContainer/CarouselContainer';

const Carousel = () => {
  const { flashcardSetId } = useParams<{ flashcardSetId: string }>();
  const { data } = useGetFlashcardQuery(flashcardSetId);

  if (!data?.data) {
    return null;
  }

  return (
    <>
      <CarouselContainer
        flashcards={data?.data || []}
        flashcardSetId={flashcardSetId}
      />
    </>
  );
};

export default Carousel;
