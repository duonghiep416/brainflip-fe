'use client';

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

export interface TermCardPropsI {
  type?: 'view' | 'edit' | 'add';
}

const TermList = ({ type = 'view' }: TermCardPropsI) => {
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
          id: crypto.randomUUID(), // Tạo UUID cho id
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

  useEffect(() => {
    return () => {
      if (type === 'edit') {
        dispatch(flashcardApiSlice.util.invalidateTags(['Flashcards']));
      }
    };
  }, []);

  return (
    <>
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
