'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../Header/Header.module.scss';
import clsx from 'clsx';

const SecondaryHeader = ({
  startContent,
  endContent,
}: {
  startContent?: React.ReactNode;
  endContent: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const portalTarget = document.getElementById('header-secondary-portal');

  if (!portalTarget) return null;
  return ReactDOM.createPortal(
    <div className={clsx(styles.header, 'dark:bg-neutral-dark-md')}>
      <div className="flex-center-vertical">{startContent}</div>
      <div className="flex-center-vertical">{endContent}</div>
    </div>,
    portalTarget,
  );
};

export default SecondaryHeader;
