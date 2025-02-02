import { useUpdateFlashcardBookmarkMutation } from '@/features/flashcard/flashcardApiSlice';
import { Flashcard } from '@/features/flashcard/types';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { toast } from 'sonner';

const TermMarking = ({ flashcard }: { flashcard: Flashcard }) => {
  const [isMarked, setIsMarked] = useState(flashcard.isBookmarked);

  const [updateFlashcardBookmark] = useUpdateFlashcardBookmarkMutation();

  const handleMarkFlashcard = async () => {
    setIsMarked(prev => !prev);
    try {
      await updateFlashcardBookmark({ id: flashcard.id }).unwrap();
    } catch (error) {
      console.error('Error in handleMarkFlashcard:', error);
      toast.error(
        'Failed to mark flashcard. Please try again or try again later.',
      );
      setIsMarked(prev => !prev);
    }
  };

  return (
    <Button
      isIconOnly
      variant="bordered"
      radius="full"
      size="sm"
      aria-label="Mark flashcard"
      onPress={handleMarkFlashcard}
      className={clsx(isMarked ? 'text-amber-300 border-amber-300' : '')}
    >
      <CiStar size={20} />
    </Button>
  );
};

export default TermMarking;
