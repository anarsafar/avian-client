import { Button, Image } from '@chakra-ui/react';

interface SocialButtonProps {
  icon: string;
  isDisabled: boolean;
}

function SocialButton({ icon, isDisabled }: SocialButtonProps): JSX.Element {
  return (
    <Button
      isDisabled={isDisabled}
      height="4.6rem"
      width="4.9rem"
      borderRadius="full"
      border="1px solid #eee"
      backgroundColor="#fff"
      _hover={{
        background: 'violet-2',
        '& > p': {
          color: 'white',
        },
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={icon} width="16px" height="16px" borderRadius="50%" />
    </Button>
  );
}

export default SocialButton;
