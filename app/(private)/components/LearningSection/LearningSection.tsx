'use client';

import { StudyCard } from '@/app/(private)/components/LearningSection/StudyCard/StudyCard';
import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

export const LearningSection = () => {
  const { data } = useGetFlashcardSetQuery({});

  const flashcardSets = data ? data.data : [];

  return (
    <>
      <Card
        radius="lg"
        shadow="sm"
        className="dark:bg-neutral-dark-md grow md:basis-0"
        aria-label="Learning section"
      >
        <CardBody className="gap-3 items-center" aria-label="Learning section">
          <Tabs
            aria-label="Tabs auth"
            radius="full"
            classNames={{
              tabList: 'dark:bg-main-dark',
            }}
            aria-labelledby="tabs"
          >
            <Tab
              key="login"
              title={<p>Studying</p>}
              className="dark:bg-main-dark"
              aria-label="Studying"
            />
            <Tab
              key="signup"
              title={<p>Recent</p>}
              className="dark:bg-main-dark"
              aria-label="Recent"
            />
          </Tabs>
          <div className="w-full flex gap-3 items-center max-h-56 overflow-y-auto flex-wrap bg-transparent pb-3">
            {flashcardSets.map(flashcardSet => {
              return (
                <StudyCard flashcardSet={flashcardSet} key={flashcardSet.id} />
              );
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
