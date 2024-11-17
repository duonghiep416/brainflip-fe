'use client';

import clsx from 'clsx';
import styles from './LoginPage.module.scss';
import Image from 'next/image';
import { Tab, Tabs } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { SocialButton } from '@/components/SocialButton/SocialButton';
import { SiFacebook } from 'react-icons/si';
import { FaApple } from 'react-icons/fa';
import TextDivider from '@/components/TextDivider/TextDivider';
import { FormAuth } from '@/app/login/components/FormAuth/FormAuth';
import { useState } from 'react';
export const LoginPage = () => {
  const [tabSelected, setTabSelected] = useState<'login' | 'signup'>('login');
  const handleTabChange = (key: 'login' | 'signup') => {
    setTabSelected(key);
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={clsx(styles.item_content, styles.item_main)}>
          <div className={styles.item_main_header}>
            <div className={styles.item_main_header_logo}>
              <Image
                src="/logo.svg"
                alt="BrainFlip"
                width={130}
                height={42}
                priority
                className="h-auto"
              />
            </div>
            <div className={styles.item_main_header_tabs}>
              <Tabs
                aria-label="Tabs auth"
                radius="full"
                selectedKey={tabSelected}
                onSelectionChange={key =>
                  setTabSelected(key as 'login' | 'signup')
                }
              >
                <Tab key="login" title={<p>Log In</p>} />
                <Tab key="signup" title={<p>Sign Up</p>} />
              </Tabs>
            </div>
          </div>
          <div className={styles.item_main_content}>
            <p
              className={clsx(
                styles.item_main_title,
                'text-neutral-800 dark:text-neutral-200',
              )}
            >
              {tabSelected === 'login'
                ? 'Hi there!'
                : 'Join the BrainFlip side'}
            </p>
            <p
              className={clsx(
                styles.item_main_description,
                'text-neutral-600 dark:text-neutral-400',
              )}
            >
              Welcome to BrainFlip. The best all-in-one AI tool for studying.
            </p>
            <div className={styles.item_main_social}>
              <SocialButton
                icon={<FcGoogle fontSize={27} />}
                title="Continue with Google"
                onClick={() => {}}
              />
              <SocialButton
                icon={<SiFacebook fontSize={27} />}
                title="Continue with Facebook"
                onClick={() => {}}
              />
              <SocialButton
                icon={<FaApple fontSize={27} />}
                title="Continue with Apple"
                onClick={() => {}}
              />
            </div>
            <TextDivider />
            <FormAuth
              formType={tabSelected}
              handleTabChange={handleTabChange}
            />
          </div>
        </div>
      </div>
      <div className={clsx(styles.item, styles.item_sub)}>
        <div className={styles.item_content}>
          <div className={styles.item_content_title}>
            <h1>Login</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
