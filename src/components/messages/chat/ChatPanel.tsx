import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, Image, Input } from '@chakra-ui/react';

import sendIcon from '@assets/layout/sendIcon.svg';

interface PropTypes {
  textColor: string;
  placeholderColor: string;
  inputColor: string;
  logoColor: string;
}

function ChatPanel({
  textColor,
  placeholderColor,
  inputColor,
  logoColor,
}: PropTypes) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="1.5rem"
      p="1.6rem"
    >
      <Button variant="unstyled">
        <AttachmentIcon fontSize="1.5rem" color={logoColor} />
      </Button>
      <FormControl>
        <Input
          type="text"
          p="1.8rem"
          border="none"
          placeholder="Write your message here"
          fontFamily="openSans"
          fontSize="1.2rem"
          fontWeight="400"
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          bg={inputColor}
          color={textColor}
          focusBorderColor={logoColor}
          _placeholder={{
            fontFamily: 'openSans',
            fontSize: '1.2rem',
            color: placeholderColor,
            fontWeight: '400',
            lineHeight: '1.6rem',
            letterSpacing: '0.16px',
          }}
        />
      </FormControl>
      <Button
        variant="unstyled"
        bg="violet-2"
        borderRadius="50%"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        p="1rem"
        h="3.2rem"
        _hover={{
          bg: 'violet-3',
        }}
      >
        <Image src={sendIcon} w="100%" />
      </Button>
    </Flex>
  );
}

export default ChatPanel;
