'use client';

import { Button, ButtonProps } from '@nextui-org/react';
import Link from 'next/link';

interface AddEditBtnProps extends ButtonProps {
  id: string;
}

const AddEditBtn = ({ id, children, ...buttonProps }: AddEditBtnProps) => {
  return (
    <Button
      as={Link}
      href={`/flashcards/${id}/edit`}
      radius="full"
      color="primary"
      className="font-bold my-10 justify-center"
      size="md"
      {...buttonProps}
    >
      {children ? children : 'Add or Edit Terms'}
    </Button>
  );
};

export default AddEditBtn;
