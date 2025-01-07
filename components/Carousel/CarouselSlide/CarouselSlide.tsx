import React from 'react';
import clsx from 'clsx';
import styles from '../Carousel.module.scss';

const CarouselSlide = ({
  flashcard,
  isFlipped,
  onFlip,
}: {
  flashcard: { term: string; definition: string };
  isFlipped: boolean;
  onFlip: () => void;
}) => {
  return (
    <div className={clsx(styles.carousel__slide)} onClick={onFlip}>
      <div
        className={clsx(
          styles.carousel__slideContent,
          isFlipped && styles.carousel__flipped,
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
  );
};

export default CarouselSlide;
