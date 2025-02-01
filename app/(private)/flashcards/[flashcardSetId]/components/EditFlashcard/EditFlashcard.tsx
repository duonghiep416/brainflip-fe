import React, { FormEvent, useEffect } from 'react';
import { ModalForm } from '@/components/Modal/ModalForm';
import { Button, Input, Textarea } from '@nextui-org/react';
import { IoPencil } from 'react-icons/io5';
import _, { throttle } from 'lodash';
import { useUpdateFlashcardMutation } from '@/features/flashcard/flashcardApiSlice';

// Tạo type cho props (nếu bạn dùng TypeScript)
interface EditFlashcardProps {
  flashcardId: string | number; // id của flashcard
  defaultTerm?: string; // giá trị mặc định cho term
  defaultDefinition?: string; // giá trị mặc định cho definition
}

function createThrottleSubmit() {
  return _.throttle(
    (handleSubmit: (e: FormEvent) => void, e: FormEvent) => {
      handleSubmit(e);
    },
    1000,
    { leading: true, trailing: false },
  );
}

const EditFlashcard: React.FC<EditFlashcardProps> = ({
  flashcardId,
  defaultTerm = '',
  defaultDefinition = '',
}) => {
  const [term, setTerm] = React.useState(defaultTerm);
  const [definition, setDefinition] = React.useState(defaultDefinition);
  const [errors, setErrors] = React.useState({ term: '', definition: '' });
  const [updateFlashcards] = useUpdateFlashcardMutation();

  const cleanupFunction = () => {
    setTerm(defaultTerm);
    setDefinition(defaultDefinition);
    setErrors({ term: '', definition: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = { term: '', definition: '' };
    if (!term.trim()) {
      newErrors.term = 'Terminology is required';
    }
    if (!definition.trim()) {
      newErrors.definition = 'Definition is required';
    }
    setErrors(newErrors);

    // Nếu không có lỗi => gọi hành động "lưu"
    if (!newErrors.term && !newErrors.definition) {
      const response = await updateFlashcards({
        id: flashcardId,
        body: { term, definition },
      });
      console.log('Saved flashcard:', response);
    }

    cleanupFunction();
  };

  const throttledSubmit = React.useRef(createThrottleSubmit());

  // Thay đổi giá trị term và xóa lỗi (nếu có) khi user nhập
  const handleTermChange = (value: string) => {
    setTerm(value);
    if (errors.term && value.trim()) {
      setErrors(prev => ({ ...prev, term: '' }));
    }
  };

  // Tương tự với definition
  const handleDefinitionChange = (value: string) => {
    setDefinition(value);
    if (errors.definition && value.trim()) {
      setErrors(prev => ({ ...prev, definition: '' }));
    }
  };

  return (
    <ModalForm
      icon={<IoPencil className="leading-none" />}
      header={`Edit Flashcard`}
      isActionDisabled
      cleanupFunction={cleanupFunction}
    >
      {(onClose: () => void) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            throttledSubmit.current(handleSubmit, e);
            onClose();
          }}
        >
          <Input
            label="Terminology"
            name="term"
            value={term}
            onValueChange={handleTermChange}
            isInvalid={!!errors.term}
            errorMessage={errors.term}
            variant="bordered"
            className="mb-4"
          />

          <Textarea
            label="Definition"
            name="definition"
            value={definition}
            onValueChange={handleDefinitionChange}
            isInvalid={!!errors.definition}
            errorMessage={errors.definition}
            variant="bordered"
            className="mb-4"
            minRows={2}
          />

          <Button color="success" type="submit">
            Save
          </Button>
        </form>
      )}
    </ModalForm>
  );
};

export default EditFlashcard;
