import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* Background decorative elements */}
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>
      <div className={styles.bgOrb3}></div>

      <div className={styles.content}>
        <div className={styles.errorCodeWrapper}>
          <h1 className={styles.errorCode}>404</h1>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </div>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved to
          another location.
        </p>

        <Link href="/" className={styles.button}>
          Return Home
        </Link>
      </div>

      {/* Decorative pattern */}
      <div className={styles.footer} />
    </div>
  );
}
