'use client';

import SecondaryHeader from '@/components/SecondaryHeader/SecondaryHeader';
import TermListItem from './TermListItem/TermListItem';
import {
  useGetFlashcardQuery,
  flashcardApiSlice,
} from '@/features/flashcard/flashcardApiSlice';
import { AppDispatch } from '@/store';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HEIGHT_SHOW_2ND_HEADER } from '@/configs/site.config';
import { IoCloudUploadOutline } from 'react-icons/io5';
import BackBtn from '@/app/(private)/flashcards/components/BackBtn/BackBtn';
import { FlashcardSet } from '@/features/flashcardSet/types';
import { faker } from '@faker-js/faker';

export interface TermCardPropsI {
  type?: 'view' | 'edit' | 'add';
  setInfo?: FlashcardSet;
}

const TermList = ({ type = 'view', setInfo }: TermCardPropsI) => {
  const { flashcardSetId } = useParams<{ flashcardSetId: string }>();

  const { data } = useGetFlashcardQuery(flashcardSetId);
  const dispatch = useDispatch<AppDispatch>();

  // Sử dụng dữ liệu từ cache làm mặc định nếu có, nếu không thì mảng rỗng
  const [localData, setLocalData] = useState<any[]>(
    data?.data ? [...data.data] : [],
  );

  useEffect(() => {
    // Cập nhật dữ liệu cục bộ khi dữ liệu từ cache thay đổi
    if (data?.data && type !== 'add') {
      setLocalData([...data.data]);
    }
  }, [data, type]);

  const handleActionFlashcard = (
    action: 'add' | 'delete' = 'add',
    order: number,
  ) => {
    // Thao tác trên state cục bộ
    setLocalData(prev => {
      if (action === 'add') {
        const newElement = {
          id: faker.string.uuid(), // Tạo UUID cho id
          term: '', // Term rỗng
          definition: '', // Definition rỗng
          order: null, // Tạm thời chưa cần cập nhật thứ tự
          isNew: true, // Đánh dấu là phần tử mới
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (order === -1) {
          return [...prev, newElement]; // Thêm vào cuối mảng
        } else {
          const newData = [...prev];
          newData.splice(order, 0, newElement); // Chèn vào vị trí chỉ định
          return newData;
        }
      } else if (action === 'delete') {
        const newData = [...prev];
        newData.splice(order, 1); // Xóa phần tử tại vị trí chỉ định
        return newData;
      }
      return prev;
    });
  };

  //Xử lý scroll khi cuộn hiện header
  useEffect(() => {
    const headerElement = document.getElementById('header-secondary-portal');
    const handleScroll = () => {
      if (headerElement) {
        if (window.scrollY > HEIGHT_SHOW_2ND_HEADER) {
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
          type !== 'view' && (
            <Button color="primary">
              <IoCloudUploadOutline size={18} />
              Save
            </Button>
          )
        }
      />
      <div className="flex flex-col gap-4 mt-20">
        {localData.map((flashcard, index) => (
          <TermListItem
            key={flashcard.id}
            flashcard={flashcard}
            order={index + 1}
            type={type}
            handleActionFlashcard={handleActionFlashcard}
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
            onPress={() => handleActionFlashcard('add', -1)}
          >
            + Add Term
          </Button>
        </div>
      )}
    </>
  );
};

export default TermList;
