import { Card } from '@nextui-org/react';
import styles from './FlashcardUpdateItem.module.scss';
import clsx from 'clsx';
const FlashcardUpdateItem = () => {
  return (
    <div className={clsx(styles.container, 'dark:bg-neutral-dark-md')}>
      <div className={clsx(styles.header)}>
        <p className={clsx(styles.title)}>1</p>
      </div>
      <div className={clsx(styles.content)}></div>
    </div>
  );
};

export default FlashcardUpdateItem;
