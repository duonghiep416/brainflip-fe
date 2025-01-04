'use client';

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import _ from 'lodash';
import { produce } from 'immer';
import { faker } from '@faker-js/faker';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';

import SecondaryHeader from '@/components/SecondaryHeader/SecondaryHeader';
import TermListItem from './TermListItem/TermListItem';
import SaveBtn from '@/app/(private)/flashcards/components/SaveBtn/SaveBtn';
import BackBtn from '@/app/(private)/flashcards/components/BackBtn/BackBtn';
import {
  useAddFlashcardsMutation,
  useGetFlashcardQuery,
  useRemoveFlashcardsMutation,
  useUpdateFlashcardsMutation,
} from '@/features/flashcard/flashcardApiSlice';
import { FlashcardSet } from '@/features/flashcardSet/types';
import { HEIGHT_ACTION_ON_SCROLL } from '@/configs/site.config';
import { toast } from 'sonner';
import { useCreateFlashcardsMutation } from '@/features/flashcardSet/flashcardSetApiSlice';

// ------------------ INTERFACE ------------------
export interface TermListProps {
  type?: 'view' | 'edit' | 'add';
  setInfo?: FlashcardSet;
  isValidMetadata?: () => boolean;
  metadata?: {
    title: string;
    description: string;
  };
}

export interface TermListRefMethods {
  saveData: () => void;
}

// ------------------ COMPONENT ------------------
const TermList = forwardRef<TermListRefMethods, TermListProps>(
  ({ type = 'view', setInfo, isValidMetadata, metadata }, ref) => {
    // ------------------ HOOKS/VARs ------------------
    const { flashcardSetId } = useParams<{ flashcardSetId: string }>();
    const { data } = useGetFlashcardQuery(flashcardSetId);
    const [addFlashcards] = useAddFlashcardsMutation();
    const [createFlashcards] = useCreateFlashcardsMutation();
    const [removeFlashcards] = useRemoveFlashcardsMutation();
    const [removeFlashcardIds, setRemoveFlashcardIds] = useState<string[]>([]);
    const [updateFlashcards] = useUpdateFlashcardsMutation();
    // ------------------ STATE ------------------
    // Lấy dữ liệu ban đầu
    const initialData = useMemo(
      () => (data?.data ? [...data.data] : []),
      [data],
    );
    const [localData, setLocalData] = useState(initialData);

    // State theo dõi submit
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ------------------ CALLBACK/HELPERS ------------------
    // Debounce cập nhật localData
    const debouncedHandleChangeFlashcard = useMemo(() => {
      return _.debounce((index: number, key: string, value: any) => {
        setLocalData(prev =>
          produce(prev, draft => {
            draft[index][key] = value;
            draft[index].isEdit = true;
          }),
        );
      }, 500);
    }, []);

    // Thêm / xóa flashcard
    const handleActionFlashcard = useCallback(
      (action: 'add' | 'delete' | 'edit', order: number) => {
        setLocalData(prev =>
          produce(prev, draft => {
            if (action === 'add') {
              const newElement = {
                id: faker.string.uuid(),
                term: '',
                definition: '',
                order: order + 1,
                isNew: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
              // Chèn phần tử mới và chỉ cập nhật order của các mục sau đó
              draft.splice(order, 0, newElement);
              for (let i = order + 1; i <= draft.length; i++) {
                draft[i - 1].order = i;
              }
            } else if (action === 'delete') {
              if (!draft[order]) return; // Ensure the order exists in draft
              const flashcardId = draft[order].id; // Store the ID before splicing
              if (draft[order].isNew) {
                draft.splice(order, 1); // Chỉ xóa mục đó
              } else {
                setRemoveFlashcardIds(prev => {
                  if (!prev.includes(flashcardId)) {
                    return [...prev, flashcardId];
                  }
                  return prev; // không thêm nữa
                });
                draft.splice(order, 1); // Xóa mục sau khi lưu ID
              }
              // Giảm order của các mục sau đó
              for (let i = order; i < draft.length; i++) {
                draft[i].order = i + 1;
              }
            }
            console.log('draft', Array.from(draft));
          }),
        );
      },
      [],
    );

    const handleSubmitData = useCallback(async () => {
      if (isValidMetadata && isValidMetadata()) {
        const newData = localData.filter(flashcard => flashcard.isNew);
        const editData = localData.filter(
          flashcard => flashcard.isEdit && !flashcard.isNew,
        );
        try {
          // Sửa flashcard set có sẵn
          if (type === 'edit') {
            await addFlashcards({
              id: flashcardSetId,
              body: { ...metadata, flashcards: newData },
            });
            if (editData.length) {
              await updateFlashcards({
                id: flashcardSetId,
                body: { ...metadata, flashcards: editData },
              });
            }
            if (removeFlashcardIds.length) {
              await removeFlashcards({
                id: flashcardSetId,
                body: { ids: removeFlashcardIds },
              });
            }
          }

          // Tạo flashcard set mới
          if (type === 'add') {
            await createFlashcards({ ...metadata, flashcards: newData });
          }

          // Change new, edit, delete to false
          setLocalData(prev =>
            produce(prev, draft => {
              draft.forEach(flashcard => {
                if (flashcard.isNew || flashcard.isEdit) {
                  flashcard.isNew = false;
                  flashcard.isEdit = false;
                }
              });
            }),
          );

          toast.success('Flashcards saved successfully');
        } catch (error) {
          console.error('Failed to add flashcards:', error);
          toast.error('Failed to save flashcards');
        }
      }
      setIsSubmitting(false);
    }, [isValidMetadata, localData, metadata, flashcardSetId, addFlashcards]);

    const handleSaveData = useCallback(() => {
      // Nếu đang focus -> blur
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // Flush thay đổi debounce
      debouncedHandleChangeFlashcard.flush();
      // Kích hoạt submit
      setIsSubmitting(true);
    }, [debouncedHandleChangeFlashcard]);

    const handleSaveLocalData = useCallback(() => {
      // Nếu đang focus -> blur
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // Flush thay đổi debounce
      debouncedHandleChangeFlashcard.flush();
    }, [debouncedHandleChangeFlashcard]);

    // ------------------ EXPOSE METHODS ------------------
    useImperativeHandle(ref, () => ({
      saveData: handleSaveData,
    }));

    // ------------------ EFFECTS ------------------
    // Cập nhật localData nếu cache thay đổi
    useEffect(() => {
      if (data?.data && type !== 'add') {
        setLocalData([...data.data]);
      }
    }, [data, type]);

    // Cleanup debounce
    useEffect(() => {
      return () => {
        debouncedHandleChangeFlashcard.cancel();
      };
    }, [debouncedHandleChangeFlashcard]);

    // Submit data if isSubmitting
    useEffect(() => {
      if (isSubmitting) {
        handleSubmitData();
      }
    }, [isSubmitting, handleSubmitData]);

    // Xử lý scroll
    useEffect(() => {
      const headerElement = document.getElementById('header-secondary-portal');
      const handleScroll = () => {
        if (headerElement) {
          if (window.scrollY > HEIGHT_ACTION_ON_SCROLL) {
            headerElement.classList.add('show');
          } else {
            headerElement.classList.remove('show');
          }
        }
      };
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }, []);

    // ------------------ RENDER ------------------
    return (
      <>
        <SecondaryHeader
          startContent={
            <div className="flex-center-vertical">
              <BackBtn />
              {setInfo && (
                <h1 className="text-xl font-bold text-center mx-5">
                  {setInfo.title}
                </h1>
              )}
            </div>
          }
          endContent={
            type !== 'view' && <SaveBtn handleSaveData={handleSaveData} />
          }
        />

        <div className="flex flex-col gap-4 mt-20">
          {localData.map((flashcard, index) => (
            <TermListItem
              key={flashcard.id}
              flashcard={flashcard}
              order={index + 1}
              type={type}
              handleChangeFlashcard={(i, k, v) => {
                debouncedHandleChangeFlashcard(i, k, v);
              }}
              handleActionFlashcard={handleActionFlashcard}
              handleSaveLocalData={handleSaveLocalData}
            />
          ))}
        </div>

        {type !== 'view' && (
          <div className="flex justify-center">
            <Button
              radius="full"
              color="primary"
              className="font-bold my-10 justify-center"
              size="md"
              onPress={() => handleActionFlashcard('add', localData.length)}
            >
              + Add Term
            </Button>
          </div>
        )}
      </>
    );
  },
);

export default TermList;
