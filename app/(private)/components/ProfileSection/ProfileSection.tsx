'use client';

import { Card } from '@nextui-org/react';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { useGetMeQuery } from '@/features/user/userApiSlice';
import Image from 'next/image';
import moment from 'moment';
import { formatDate } from '@/utils/dateTime';

export const ProfileSection = () => {
  const { data: profileData } = useGetMeQuery();

  if (!profileData) return null;

  return (
    <>
      <Card
        radius="lg"
        shadow="sm"
        className={clsx(
          styles.profileSection,
          'dark:bg-neutral-dark-md grow basis-0',
        )}
      >
        <div className={clsx(styles.coverImgContainer)}>
          <div className={clsx(styles.avatarContainer)}>
            <Image
              src="https://images.unsplash.com/photo-1734015169493-845b53c1cbc2?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              className={clsx(styles.avatar, 'object-cover')}
              alt="avatar"
            />
          </div>
        </div>
        <div className={clsx(styles.infoContainer)}>
          <h2 className={clsx(styles.name)}>{profileData.name}</h2>
          <p className={clsx(styles.metadata)}>
            {`${profileData?.username} | Joined ${formatDate(
              profileData.created_at,
            )}`}
          </p>
        </div>
      </Card>
    </>
  );
};
