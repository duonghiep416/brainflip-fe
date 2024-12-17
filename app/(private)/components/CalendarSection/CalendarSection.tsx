'use client';

import { StudyCard } from '@/app/(private)/components/LearningSection/StudyCard/StudyCard';
import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { Calendar, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import styles from './CalendarSection.module.scss';

export const CalendarSection = () => {
  const { data, isLoading, isError } = useGetFlashcardSetQuery();

  const flashcardSets = data ? data.data : [];

  console.log('flashcardSetData', flashcardSets);
  return (
    <Calendar
      showMonthAndYearPickers
      aria-label="Date (Show Month and Year Picker)"
      className={clsx(styles.calendarSection)}
    />
  );
};
