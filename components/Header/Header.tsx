import Image from 'next/image';
import styles from './Header.module.scss';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.side)}>
        <Image
          src="/logo-mobile.png"
          width={42}
          height={42}
          alt="Brain Flip Logo"
          className="max-h-9"
        />
        <ul className={clsx(styles.nav)}>
          <li className={clsx(styles.navItem)}>
            <a href="" className={clsx(styles.navLink)}>
              Home
            </a>
          </li>
          <li className={clsx(styles.navItem)}>
            <a href="" className={clsx(styles.navLink)}>
              Explore
            </a>
          </li>
          <li className={clsx(styles.navItem)}>
            <a href="" className={clsx(styles.navLink)}>
              Exams
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
