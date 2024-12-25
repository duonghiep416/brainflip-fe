'use client';
import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import styles from './AddUpdateFlashcardSetForm.module.scss';
import clsx from 'clsx';

import TermList from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';
import { useParams, usePathname } from 'next/navigation';
import { useGetFlashcardSetQuery } from '@/features/flashcardSet/flashcardSetApiSlice';
import { FlashcardSet } from '@/features/flashcardSet/types';

const AddUpdateFlashcardSetForm = () => {
  const { flashcardSetId } = useParams();
  const { data } = useGetFlashcardSetQuery({
    flashcardSetId: flashcardSetId as string,
  });
  const formMethods = useForm<Record<string, any>>();
  const pathname = usePathname();
  return (
    <>
      <Form
        formMethods={formMethods}
        onSubmit={(data: Record<string, any>) => console.log(data)}
      >
        <div className={clsx(styles.inputContainer, 'dark:bg-neutral-dark-md')}>
          <Input
            label="Title"
            name="title"
            labelStyles={clsx(styles.label)}
            className="dark:bg-main-dark"
          />
        </div>
        <div className={clsx(styles.inputContainer, 'dark:bg-neutral-dark-md')}>
          <Input
            label="Description"
            name="description"
            labelStyles={clsx(styles.label)}
            className="dark:bg-main-dark"
          />
        </div>
        <TermList
          type={
            pathname.includes('new')
              ? 'add'
              : pathname.includes('edit')
              ? 'edit'
              : 'view'
          }
          // @ts-ignore
          setInfo={data as FlashcardSet}
        />
      </Form>
    </>
  );
};

export default AddUpdateFlashcardSetForm;
