'use client';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';
import { Navbar } from '@/components/Navbar/Navbar';
import ProfilePopover from '@/components/ProfilePopover/ProfilePopover';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import AddPopover from '@/components/AddPopover/AddPopover';
export const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const portalTarget = document.getElementById('header-portal');

  useEffect(() => {
    setIsClient(true);
    portalTarget?.style.setProperty('visibility', 'visible');
    portalTarget?.style.setProperty('opacity', '1');
  }, []);

  if (!isClient) return null;

  if (!portalTarget) return null;
  return ReactDOM.createPortal(
    <header className={clsx(styles.header, 'dark:bg-neutral-dark-md')}>
      <Navbar />
      <div className={clsx(styles.side)}>
        <AddPopover />
        <ThemeSwitch />
        <ProfilePopover />
      </div>
    </header>,
    portalTarget,
  );
};
