'use client';

import { StudyCard } from '@/app/(private)/components/LearningSection/StudyCard/StudyCard';
import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import styles from './Profile.module.scss';
import clsx from 'clsx';

export const ProfileSection = () => {
  const { data } = useGetFlashcardSetQuery();

  const flashcardSets = data ? data.data : [];

  console.log('flashcardSetData', flashcardSets);
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
        <div className="bg-orange-300 h-28"></div>
      </Card>
    </>
  );
};
