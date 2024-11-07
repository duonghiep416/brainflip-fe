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
  nodeTrigger: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  isCloseBtn?: boolean;
  onSubmit: () => void;
  actionButtonText?: string;
  [key: string]: any;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  nodeTrigger,
  header,
  children,
  isCloseBtn,
  onSubmit,
  actionButtonText = 'Action',
  ...props
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAction = (onClose: () => void) => {
    onSubmit();
    onClose();
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        {nodeTrigger}
      </div>
      <ModalNextUI isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
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
                <Button color="primary" onPress={() => handleAction(onClose)}>
                  {actionButtonText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </ModalNextUI>
    </>
  );
};
