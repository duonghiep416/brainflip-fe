import Image from 'next/image';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';
import { PiListBold } from 'react-icons/pi';

export const Header = () => {
  return (
    <header className={clsx(styles.header, 'dark:bg-neutral-dark-md')}>
      <div className={clsx(styles.side)}>
        <PiListBold className={clsx(styles.navIconMobile)} />
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
      <div className={clsx(styles.side)}>
        <ThemeSwitch />
      </div>
    </header>
  );
};
