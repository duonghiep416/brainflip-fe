import styles from './TextDivider.module.scss';

const TextDivider = ({ text = 'or' }) => {
  return (
    <div className={styles.dividerContainer}>
      <hr className={styles.line} />
      <span className={styles.text}>{text}</span>
      <hr className={styles.line} />
    </div>
  );
};

export default TextDivider;
