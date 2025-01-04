import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { Button } from '@nextui-org/react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = Omit<React.ComponentProps<typeof Button>, 'ref'>;

export const PrevButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props;

  return (
    <Button
      {...restProps}
      isIconOnly
      radius="full"
      variant="bordered"
      aria-label="Previous"
    >
      <IoChevronBack size={24} /> {/* React Icon */}
      {children}
    </Button>
  );
};

export const NextButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props;

  return (
    <Button
      {...restProps}
      isIconOnly
      radius="full"
      variant="bordered"
      aria-label="Next"
    >
      <IoChevronForward size={24} /> {/* React Icon */}
      {children}
    </Button>
  );
};
