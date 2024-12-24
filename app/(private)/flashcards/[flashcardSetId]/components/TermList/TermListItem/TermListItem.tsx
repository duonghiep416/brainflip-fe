import { useState, useRef, useLayoutEffect } from 'react';
import { Flashcard } from '@/features/flashcard/types';
import { Card, CardBody, Divider, Button, CardHeader } from '@nextui-org/react';
import styles from './TermListItem.module.scss';
import {
  RiCollapseDiagonalFill,
  RiDeleteBin5Line,
  RiExpandDiagonalFill,
} from 'react-icons/ri';
import clsx from 'clsx';
import ProgressStatusItem from '@/components/ProgressStatusItem/ProgressStatusItem';
import { TermCardPropsI } from '@/app/(private)/flashcards/[flashcardSetId]/components/TermList/TermList';
import { IoAdd } from 'react-icons/io5';
interface TermListItemI extends TermCardPropsI {
  flashcard: Flashcard;
  order: number;
  handleActionFlashcard: (action: 'add' | 'delete', order: number) => void;
}

const TermListItem = ({
  flashcard,
  order,
  type = 'view',
  handleActionFlashcard,
}: TermListItemI) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [hasOverflow, setHasOverflow] = useState(false);
  const definitionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const definitionEl = definitionRef.current;
    if (!definitionEl) return;

    definitionEl.classList.add(styles.collapsed);

    requestAnimationFrame(() => {
      const { scrollHeight, clientHeight } = definitionEl;
      setHasOverflow(scrollHeight > clientHeight);
    });
  }, [flashcard.definition, order]);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="relative">
      <Card
        radius="lg"
        shadow="sm"
        className={clsx(
          styles.card,
          { [styles.collapsed]: !isExpanded },
          'dark:bg-neutral-dark-md',
        )}
      >
        <CardHeader className="px-3 py-0 flex items-center justify-between">
          <span className={styles.order}>{order}</span>
          <div className={styles.cta}>
            {hasOverflow && (
              <Button
                size="sm"
                onPress={toggleExpand}
                className={styles.toggleButton}
                isIconOnly
                variant="bordered"
                radius="full"
              >
                {isExpanded ? (
                  <RiCollapseDiagonalFill />
                ) : (
                  <RiExpandDiagonalFill />
                )}
              </Button>
            )}
            {type === 'view' && <ProgressStatusItem />}
            {type !== 'view' && (
              <Button
                isIconOnly
                radius="full"
                variant="bordered"
                size="sm"
                color="danger"
                onPress={() => handleActionFlashcard('delete', order - 1)}
              >
                <RiDeleteBin5Line size={18} />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardBody className={clsx(styles.cardBody)}>
          <h3
            className={clsx(
              styles.term,
              type !== 'view' && styles.editable,
              type !== 'view' && 'dark:bg-main-dark',
            )}
            spellCheck={false}
            contentEditable={type !== 'view'}
            suppressContentEditableWarning
          >
            {flashcard.term}
          </h3>
          <div className={styles.divider} />
          <p
            ref={definitionRef}
            className={clsx(
              styles.definition,
              {
                [styles.collapsed]: !isExpanded,
              },
              type !== 'view' && styles.editable,
              type !== 'view' && 'dark:bg-main-dark',
            )}
            contentEditable={type !== 'view'}
            spellCheck={false}
            suppressContentEditableWarning
          >
            {flashcard.definition}
          </p>
        </CardBody>
      </Card>
      {type !== 'view' && (
        <div className={clsx(styles.buttonWrapper)}>
          <Button
            isIconOnly
            radius="full"
            variant="bordered"
            size="sm"
            className={clsx(styles.addButton)}
            onPress={() => handleActionFlashcard('add', order - 1)}
          >
            <IoAdd />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TermListItem;
