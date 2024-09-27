import clsx from 'clsx';
import styles from './TextDivider.module.scss';

const TextDivider = ({ text = 'or' }) => {
  return (
    <div className={styles.dividerContainer}>
      <hr className={styles.line} />
      <span
        className={clsx(styles.text, 'text-neutral-800 dark:text-neutral-200')}
      >
        {text}
      </span>
      <hr className={styles.line} />
    </div>
  );
};

export default TextDivider;
