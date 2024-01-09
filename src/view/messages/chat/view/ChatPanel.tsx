import { AttachmentIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { Button, Flex, Image, Textarea } from '@chakra-ui/react';
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
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextMessage(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      //  create more lines on empty textarea using enter key
      if (e.key === 'Enter' && textMessage.trim().length === 0) {
        textareaRef.current.style.height = `${
          textareaRef.current.offsetHeight + 20
        }px`;
      }

      if (e.key === 'Enter') {
        if (e.shiftKey) {
          textareaRef.current.style.height = `${
            textareaRef.current.offsetHeight + 20
          }px`;
        } else if (textMessage.trim().length !== 0) {
          e.preventDefault();
          sendMessage();
        }
      }

      const lastChar = textMessage.slice(-1);
      if (e.key === 'Backspace' && lastChar === '\n') {
        textareaRef.current.style.height = `${
          textareaRef.current.offsetHeight - 20
        }px`;
      }
    }
  };

  const updateHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        6 *
          parseInt(window.getComputedStyle(textareaRef.current).lineHeight, 10)
      )}px`;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      const pastedText = e.clipboardData.getData('text/plain');
      if (pastedText.includes('\n')) {
        setTimeout(() => {
          updateHeight();
        }, 0);
      }
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="1.5rem"
      p="1.6rem"
      position="relative"
    >
      <Button variant="unstyled">
        <AttachmentIcon fontSize="1.5rem" color={logoColor} />
      </Button>
      <Textarea
        autoCorrect="off"
        autoComplete="off"
        position="absolute"
        bottom="1.2rem"
        left="5.5rem"
        width="calc(100% - 12rem)"
        minH="4rem"
        ref={textareaRef}
        value={textMessage}
        onChange={handleTextareaChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        p="1.2rem"
        rows={1}
        maxH="14rem"
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
