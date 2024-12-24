'use client';
import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import styles from './AddUpdateFlashcardSetForm.module.scss';
import clsx from 'clsx';
import FlashcardUpdateItem from '@/app/(private)/flashcards/components/FlashcardUpdateItem/FlashcardUpdateItem';
import TermList from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';
import { usePathname } from 'next/navigation';
const AddUpdateFlashcardSetForm = () => {
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
        />
      </Form>
    </>
  );
};

export default AddUpdateFlashcardSetForm;
