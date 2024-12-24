import styles from './ProgressStatusItem.module.scss';
import clsx from 'clsx';
import { CircularProgress } from '@nextui-org/react';

export interface ProgressStatusItemProps {
  level?: 'new' | 'learning' | 'almost done' | 'mastered';
  type?: 'flashcard' | 'flashcard-set';
}

const colorClasses = {
  new: 'stroke-red-300 dark:stroke-red-200 text-red-300 dark:text-red-200',
  learning:
    'stroke-violet-300 dark:stroke-violet-200 text-violet-300 dark:text-violet-200',
  'almost done':
    'stroke-blue-300 dark:stroke-blue-200 text-blue-300 dark:text-blue-200',
  mastered:
    'stroke-green-300 dark:stroke-green-200 text-green-300 dark:text-green-200',
};

const ProgressStatusItem = ({
  level = 'almost done',
  type = 'flashcard',
}: ProgressStatusItemProps) => {
  const variants = {
    new: {
      key: 'new',
      text: 'New',
      progress: 5,
      color: 'red',
    },
    learning: {
      key: 'learning',
      text: 'Learning',
      progress: 50,
      color: 'violet',
    },
    'almost done': {
      key: 'almostDone',
      text: 'Almost Done',
      progress: 75,
      color: 'blue',
    },
    mastered: {
      key: 'mastered',
      text: 'Mastered',
      progress: 100,
      color: 'green',
    },
  };

  return (
    <div
      className={clsx(
        styles.progressStatusItemContainer,
        styles[variants[level].key],
      )}
    >
      <CircularProgress
        value={variants[level].progress}
        classNames={{
          svg: 'w-6 h-6',
          track: 'stroke-white dark:stroke-white/20',
          base: 'border-white dark:border-white/20',
          indicator: clsx(colorClasses[level]),
        }}
        strokeWidth={5}
      />
      <div className={clsx(colorClasses[level])}>{variants[level].text}</div>
    </div>
  );
};

export default ProgressStatusItem;
