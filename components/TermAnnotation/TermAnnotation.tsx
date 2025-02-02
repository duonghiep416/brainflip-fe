import { Flashcard } from '@/features/flashcard/types';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { CiStickyNote } from 'react-icons/ci';

const TermAnnotation = ({ flashcard }: { flashcard: Flashcard }) => {
  return (
    <Button
      isIconOnly
      variant="bordered"
      radius="full"
      size="sm"
      aria-label="Mark flashcard"
    >
      <CiStickyNote size={20} />
    </Button>
  );
};

export default TermAnnotation;
