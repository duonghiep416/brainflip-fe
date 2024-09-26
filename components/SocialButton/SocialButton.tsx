import { Button } from '@nextui-org/react';

interface SocialButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

export const SocialButton = ({ icon, title, onClick }: SocialButtonProps) => {
  return (
    <Button
      className="w-full h-14"
      startContent={icon}
      variant="bordered"
      radius="full"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
