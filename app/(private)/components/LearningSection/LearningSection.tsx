'use client';

import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

export const LearningSection = () => {
  const {
    data: flashcardSetData,
    isLoading,
    isError,
  } = useGetFlashcardSetQuery();
  console.log('flashcardSetData', flashcardSetData);
  return (
    <>
      <Card radius="lg" shadow="sm">
        <CardBody>
          <Tabs aria-label="Tabs auth" radius="full">
            <Tab key="login" title={<p>Studying</p>} />
            <Tab key="signup" title={<p>Recent</p>} />
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};
