import { useState, useRef, useLayoutEffect } from 'react';
import { Flashcard } from '@/features/flashcard/types';
import { Card, CardBody, Divider, Button, CardHeader } from '@nextui-org/react';
import styles from './TermListItem.module.scss';
import { RiCollapseDiagonalFill, RiExpandDiagonalFill } from 'react-icons/ri';
import clsx from 'clsx';

const TermListItem = ({
  flashcard,
  order,
}: {
  flashcard: Flashcard;
  order: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // hasOverflow cho biết khi collapsed thì nội dung có tràn không
  const [hasOverflow, setHasOverflow] = useState(false);
  const definitionRef = useRef<HTMLParagraphElement>(null);

  // Mỗi khi definition (hoặc order) thay đổi, đo lại ở trạng thái collapsed
  useLayoutEffect(() => {
    const definitionEl = definitionRef.current;
    if (!definitionEl) return;

    // 1) Tạm thêm class 'collapsed' để chắc chắn ta đang đo chiều cao "thu gọn"
    definitionEl.classList.add(styles.collapsed);

    // 2) Dùng requestAnimationFrame để đợi DOM cập nhật xong
    requestAnimationFrame(() => {
      const { scrollHeight, clientHeight } = definitionEl;
      setHasOverflow(scrollHeight > clientHeight);
    });
  }, [flashcard.definition, order]);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
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
          {/* Nếu bị tràn ở trạng thái collapsed thì mới hiển thị nút */}
          {hasOverflow && (
            <Button
              size="sm"
              onPress={toggleExpand}
              className={styles.toggleButton}
              isIconOnly
            >
              {isExpanded ? (
                <RiCollapseDiagonalFill />
              ) : (
                <RiExpandDiagonalFill />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardBody className={clsx(styles.cardBody)}>
        <h3 className={styles.term}>{flashcard.term}</h3>
        <div className={styles.divider} />
        <p
          ref={definitionRef}
          className={clsx(styles.definition, {
            [styles.collapsed]: !isExpanded,
          })}
        >
          {flashcard.definition}
        </p>
      </CardBody>
    </Card>
  );
};

export default TermListItem;
