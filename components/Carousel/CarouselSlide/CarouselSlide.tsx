import React from 'react';
import clsx from 'clsx';
import styles from '../Carousel.module.scss';
import TextToSpeechBtn from '@/components/TextToSpeechBtn/TextToSpeechBtn';
import EditFlashcard from '@/app/(private)/flashcards/[flashcardSetId]/components/EditFlashcard/EditFlashcard';

const CarouselSlide = ({
  flashcard,
  isFlipped,
  onFlip,
}: {
  flashcard: { term: string; definition: string; id: string | number };
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
          <div className="absolute top-1 lg:-top-3 right-3 flex items-center">
            <TextToSpeechBtn sentence={flashcard.term} />
            <EditFlashcard
              flashcardId={flashcard.id}
              defaultTerm={flashcard.term}
              defaultDefinition={flashcard.definition}
            />
          </div>
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
