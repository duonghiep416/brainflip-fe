// app/flashcards/[flashcardSetId]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { endpoints } from '@/configs/endpoints';
import { SERVER_URL } from '@/configs/site.config';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { FcHome } from 'react-icons/fc';
import styles from './page.module.scss';
import TermList from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';

interface FlashcardsPageProps {
  params: { flashcardSetId: string };
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
}

async function fetchFlashcardSet(flashcardSetId: string): Promise<ProjectData> {
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
    <div className={styles.container}>
      <div className="py-6">
        <Button
          as={Link}
          href="/"
          size="md"
          radius="full"
          className={styles.homeButton}
          startContent={<FcHome className={styles.homeIcon} />}
        >
          <span className="font-bold">Home</span>
        </Button>
      </div>
      <h1 className={styles.title}>{flashcard.title}</h1>
      <h2 className={styles.description}>{flashcard.description}</h2>
      <TermList />
    </div>
  );
}
