'use client';

import TermListItem from './TermListItem/TermListItem';
import { useGetFlashcardQuery } from '@/features/flashcard/flashcardApiSlice';
import { useParams } from 'next/navigation';

const TermList = () => {
  const { flashcardSetId } = useParams<{ flashcardSetId: string }>();
  if (!flashcardSetId) {
    return null;
  }
  const { data } = useGetFlashcardQuery(flashcardSetId);
  return (
    <div className="flex flex-col gap-4 mt-20">
      {data?.data.map((flashcard, index) => (
        <TermListItem
          key={flashcard.id}
          flashcard={flashcard}
          order={index + 1}
        />
      ))}
    </div>
  );
};

export default TermList;
