// app/flashcards/[flashcardSetId]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { endpoints } from '@/configs/endpoints';
import { SERVER_URL } from '@/configs/site.config';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import styles from './page.module.scss';
import TermList from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';
import { FlashcardSet } from '@/features/flashcardSet/types';
import Carousel from '@/components/Carousel/Carousel';
import AddEditBtn from '@/app/(private)/flashcards/[flashcardSetId]/components/AddEditBtn/AddEditBtn';

interface FlashcardsPageProps {
  params: { flashcardSetId: string };
}
async function fetchFlashcardSet(
  flashcardSetId: string,
): Promise<FlashcardSet> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  const res = await fetch(
    `${SERVER_URL}${endpoints.getFlashcardSet}/${flashcardSetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data (status: ${res.status})`);
  }

  return res.json();
}

// Sử dụng generateMetadata
export async function generateMetadata(
  { params }: FlashcardsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { flashcardSetId } = params;

  try {
    // Fetch dữ liệu flashcard
    const flashcard = await fetchFlashcardSet(flashcardSetId);

    // Extend metadata từ parent (nếu cần)
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: flashcard.title,
      description: flashcard.description,
      openGraph: {
        title: flashcard.title + ' | Brain Flip',
        description: flashcard.description,
        images: ['/default-image.jpg', ...previousImages],
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Flashcard Set',
      description: 'Unable to load flashcard set details.',
    };
  }
}

export default async function FlashcardPage({ params }: FlashcardsPageProps) {
  const flashcard = await fetchFlashcardSet(params.flashcardSetId);

  return (
    <div>
      <h1 className={styles.title}>{flashcard.title}</h1>
      <h2 className={styles.description}>
        {flashcard.description} | {flashcard.metadata.total} flashcards
      </h2>
      <Carousel />
      <TermList type="view" setInfo={flashcard} />
      <div className="flex justify-center">
        <AddEditBtn id={flashcard.id} />
      </div>
    </div>
  );
}
