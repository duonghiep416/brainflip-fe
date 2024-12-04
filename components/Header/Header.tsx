import styles from './Header.module.scss';
import clsx from 'clsx';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';
import { Navbar } from '@/components/Navbar/Navbar';

export const Header = () => {
  return (
    <header className={clsx(styles.header, 'dark:bg-neutral-dark-md')}>
      <Navbar />
      <div className={clsx(styles.side)}>
        <ThemeSwitch />
      </div>
    </header>
  );
};
