'use client';
import styles from './AddUpdateFlashcardSetForm.module.scss';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { FlashcardSet } from '@/features/flashcardSet/types';
import { Input, Textarea } from '@nextui-org/react';
import SaveBtn from '@/app/(private)/flashcards/components/SaveBtn/SaveBtn';
import TermList, {
  TermListRefMethods,
} from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';
import { autoScroll } from '@/utils/autoscroll';

const AddUpdateFlashcardSetForm = () => {
  // ------------------ HOOKS/VARs ------------------
  const { flashcardSetId } = useParams();
  const pathname = usePathname();
  const { data } = useGetFlashcardSetQuery({
    flashcardSetId: flashcardSetId as string,
  }) as { data: FlashcardSet | undefined };

  // ------------------ STATE ------------------
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState('');

  // Dùng ref để gọi hàm từ TermList
  const termListRef = useRef<TermListRefMethods>(null);

  // ------------------ DERIVED ------------------
  const isNew = pathname.includes('new');
  const isEdit = pathname.includes('edit');
  const type = isNew ? 'add' : isEdit ? 'edit' : 'view';

  // ------------------ HANDLERS ------------------
  // Khi nhấn SaveBtn bên form này => gọi TermList.saveData()
  const handleSaveData = () => {
    termListRef.current?.saveData();
  };

  const isValidMetadata = (value?: string): boolean => {
    if (value !== undefined && !value) {
      autoScroll(0);
      setError('Title is required');
      return false;
    } else if (value) {
      setError('');
      return true;
    }
    setError('');
    if (!metadata.title.trim()) {
      autoScroll(0);
      setError('Title is required');
      return false;
    }
    return true;
  };

  // ------------------ EFFECTS ------------------
  useEffect(() => {
    if (data) {
      setMetadata({
        title: data.title || '',
        description: data.description || '',
      });
    }
  }, [data]);

  // ------------------ RENDER ------------------
  return (
    <>
      {/* Chỉ hiển thị nút SaveBtn khi type !== 'view' */}
      <div className="mb-5 flex justify-end">
        {type !== 'view' && <SaveBtn handleSaveData={handleSaveData} />}
      </div>

      <Input
        label="Title"
        name="title"
        classNames={{
          label: styles.label,
        }}
        value={metadata.title}
        onChange={e => {
          setMetadata(prev => ({ ...prev, title: e.target.value }));
          isValidMetadata(e.target.value);
        }}
        errorMessage={error}
        isInvalid={Boolean(error)}
        className="mb-4"
      />
      <Textarea
        label="Description"
        name="description"
        classNames={{
          label: styles.label,
        }}
        value={metadata.description}
        onChange={e =>
          setMetadata(prev => ({ ...prev, description: e.target.value }))
        }
      />
      <TermList
        ref={termListRef}
        type={type}
        setInfo={data as FlashcardSet}
        isValidMetadata={isValidMetadata}
        metadata={metadata}
      />
    </>
  );
};

export default AddUpdateFlashcardSetForm;
