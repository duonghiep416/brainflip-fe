import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import styles from './AddPopover.module.scss';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import { TbCardsFilled } from 'react-icons/tb';

const AddPopover = () => {
  return (
    <Popover
      classNames={{
        content: 'p-0',
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly radius="full" variant="bordered" size="sm">
          <IoAdd />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-56 py-5">
          <ul>
            <li>
              <Link
                href="/flashcards/new"
                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-neutral-dark-md font-bold"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 bg-primary text-white rounded-full text-lg">
                    <TbCardsFilled />
                  </div>
                  Flashcard
                </div>
                <MdArrowForward />
              </Link>
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddPopover;
