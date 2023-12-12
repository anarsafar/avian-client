import { Button, Image, useColorModeValue } from '@chakra-ui/react';
import { BACKEND_URL } from '@/api';

interface SocialButtonProps {
  icon: string;
  isDisabled: boolean;
  type: 'google' | 'facebook' | 'github';
}

function SocialButton({
  icon,
  isDisabled,
  type,
}: SocialButtonProps): JSX.Element {
  const border = useColorModeValue('#eee', 'accent-dark');
  const bg = useColorModeValue('white', 'accent-dark');

  return (
    <Button
      isDisabled={isDisabled}
      as="a"
      cursor="pointer"
      href={`${BACKEND_URL}/api/v1/auth/${type}`}
      height="4.6rem"
      width="4.9rem"
      borderRadius="full"
      border="1px solid"
      borderColor={border}
      backgroundColor={bg}
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
