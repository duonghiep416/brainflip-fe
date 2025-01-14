'use client';

import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as ModalNextUI,
  useDisclosure,
} from '@nextui-org/react';

import React from 'react';

interface ModalFormProps {
  nodeTrigger?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  isCloseBtn?: boolean;
  onSubmit?: () => void;
  actionButtonText?: string;
  [key: string]: any;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  nodeTrigger,
  header,
  children,
  isCloseBtn,
  onSubmit,
  actionButtonText,
  ...props
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAction = (onClose: () => void) => {
    onSubmit && onSubmit();
    onClose();
  };

  return (
    <>
      {nodeTrigger &&
        React.isValidElement(nodeTrigger) &&
        React.cloneElement(nodeTrigger as React.ReactElement, {
          onPress: onOpen,
        })}
      <ModalNextUI
        isOpen={isOpen || !nodeTrigger}
        onOpenChange={onOpenChange}
        {...props}
      >
        <ModalContent>
          {onClose => (
            <>
              {header && <ModalHeader>{header}</ModalHeader>}
              {children && <ModalBody>{children}</ModalBody>}
              <ModalFooter>
                {isCloseBtn && (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
                {actionButtonText && (
                  <Button color="primary" onPress={() => handleAction(onClose)}>
                    {actionButtonText}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalNextUI>
    </>
  );
};
