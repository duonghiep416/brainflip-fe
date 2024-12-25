import BackBtn from '@/app/(private)/flashcards/components/BackBtn/BackBtn';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FcHome } from 'react-icons/fc';

export default function FlashcardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:p-6">
      <div className="py-6 flex gap-3 items-center">
        <BackBtn />
        <Button
          as={Link}
          href="/"
          size="md"
          radius="full"
          startContent={<FcHome className="mr-2 text-lg" />}
        >
          <span className="font-bold">Home</span>
        </Button>
      </div>
      {children}
    </div>
  );
}
