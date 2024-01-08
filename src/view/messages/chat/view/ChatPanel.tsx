import { AttachmentIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { Button, Flex, FormControl, Image, Textarea } from '@chakra-ui/react';
import sendIcon from '@assets/common/sendIcon.svg';
import useSocket from '@/hooks/store/useSocket';

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
  const [textMessage, setTextMessage] = useState<string>('');
  const { socket } = useSocket();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    const trimmedMsg = textMessage.trim();
    socket.emit('private message', trimmedMsg);
    setTextMessage('');
    if (textareaRef.current) {
      textareaRef.current.rows = 1;
    }
  };

  const updateRows = () => {
    if (textareaRef.current) {
      const textareaRows = Math.min(
        3,
        Math.ceil((textareaRef.current.scrollHeight - 40) / 16 + 1)
      );
      textareaRef.current.rows = textareaRows;
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextMessage(event.target.value);
    updateRows();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

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
        <Textarea
          ref={textareaRef}
          value={textMessage}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          p="1.2rem"
          rows={1}
          resize="none"
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
        isDisabled={textMessage.trim().length === 0}
        onClick={sendMessage}
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
