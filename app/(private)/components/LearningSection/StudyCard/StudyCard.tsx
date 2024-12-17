import { FlashcardSet } from '@/features/flashcardSet/types';
import { Button, Card, CardBody, CircularProgress } from '@nextui-org/react';
import styles from './StudyCard.module.scss';
import { FlashcardIcon } from '@/components/Icon/Icon';
import clsx from 'clsx';

export const StudyCard = ({ flashcardSet }: { flashcardSet: FlashcardSet }) => {
  return (
    <Card className="w-full shadow-md" shadow="none">
      <CardBody className={clsx(styles.studyCardBody)}>
        <div className="flex gap-4 items-center">
          <FlashcardIcon />
          <div className={clsx(styles.metadata)}>
            <h2 className={clsx(styles.title)}>{flashcardSet.title}</h2>
            <p className={clsx(styles.description)}>
              {flashcardSet.description}
            </p>
          </div>
        </div>
        <Button
          radius="full"
          size="sm"
          className="font-bold text-xs md:text-sm"
        >
          <CircularProgress
            value={10}
            classNames={{
              svg: 'w-5 h-5',
              track: 'stroke-white dark:stroke-white/20',
            }}
            strokeWidth={4}
          />{' '}
          Resume
        </Button>
      </CardBody>
    </Card>
  );
};
