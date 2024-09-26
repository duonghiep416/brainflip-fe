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
export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={clsx(styles.item_content, styles.item_main)}>
          <div className={styles.item_main_header}>
            <div className={styles.item_main_header_logo}>
              <Image src="/logo.svg" alt="BrainFlip" width={130} height={42} />
            </div>
            <div className={styles.item_main_header_tabs}>
              <Tabs aria-label="Tabs auth" radius="full">
                <Tab
                  key="login"
                  title={<p className="text-neutral-800 font-medium">Log In</p>}
                />
                <Tab
                  key="signup"
                  title={
                    <p className="text-neutral-800 font-medium">Sign Up</p>
                  }
                />
              </Tabs>
            </div>
          </div>
          <div className={styles.item_main_content}>
            <p className={styles.item_main_title}>Hi there!</p>
            <p className={styles.item_main_description}>
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
            <FormAuth />
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
