/* eslint-disable no-underscore-dangle */
import { AttachmentIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Image, Textarea } from '@chakra-ui/react';

import sendIcon from '@assets/common/sendIcon.svg';
import { useSocket } from '@/context/socket.context';

import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';
import useAddMessage from '@/hooks/messages/add-message';

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
  let timerId: NodeJS.Timeout;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [textMessage, setTextMessage] = useState<string>('');

  const socket = useSocket();
  const { user } = useUser();

  const { activeConversation } = useActiveConversation();
  const { activeContact } = useActiveContact();

  const { addMessage } = useAddMessage();

  const generateRoomIdentifier = (
    senderId: string | undefined,
    recipientId: string | undefined
  ): string => {
    const sortedUserIds = [senderId, recipientId].sort();
    return `${sortedUserIds[0]}-${sortedUserIds[1]}`;
  };

  const roomId = generateRoomIdentifier(activeContact?.user._id, user?._id);

  const handleStopTyping = () => {
    socket?.emit('stop typing', user?._id, roomId);
  };

  const handleTyping = () => {
    clearTimeout(timerId);
    socket?.emit('typing', user?._id, roomId);
    timerId = setTimeout(() => {
      handleStopTyping();
    }, 2000);
  };

  const sendMessage = () => {
    const trimmedMsg = textMessage.trim();
    const messageContent = {
      message: {
        messageBody: trimmedMsg.replace(/\n/g, '<br/>'),
        timeStamp: new Date(),
      },
      chatId: activeConversation?._id,
      senderId: user?._id,
      recipientId: activeContact?.user._id,
    };

    if (socket?.disconnected) {
      addMessage(messageContent);
    }

    socket?.emit('private message', messageContent);
    handleStopTyping();

    setTextMessage('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countLineBreaks = (inputString: string): number => {
    const matches = inputString.match(/\r|\n/g);
    return matches ? matches.length : 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      //  create more lines on textarea using enter key or shift + enter key

      if (
        e.key === 'Enter' &&
        textareaRef.current.offsetHeight < 140 &&
        (textMessage.trim().length === 0 || e.shiftKey)
      ) {
        textareaRef.current.style.height = `${
          textareaRef.current.offsetHeight + 20
        }px`;
      }

      //   delete added lines when deleting message
      const { selectionStart, selectionEnd } = textareaRef.current;
      const linesToDelete =
        textMessage.slice(selectionStart, selectionEnd) ||
        textMessage.slice(-1);

      const lineBreaks = countLineBreaks(linesToDelete);

      if (e.key === 'Backspace') {
        if (lineBreaks && lineBreaks <= 5) {
          textareaRef.current.style.height = `${
            textareaRef.current.offsetHeight - 20 * lineBreaks
          }px`;
        } else if (lineBreaks && lineBreaks > 5) {
          textareaRef.current.style.height = `auto`;
        }
      }

      // send message on enter click
      if (textMessage.trim().length !== 0 && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      } else {
        handleTyping();
      }
    }
  };

  const handlePaste = () => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, 0);
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
        bottom="1.5rem"
        left="5.5rem"
        width="calc(100% - 12rem)"
        minH="4rem"
        maxH="14rem"
        ref={textareaRef}
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
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
      <Button
        bg="violet-2"
        borderRadius="50%"
        p="1.8rem 1rem"
        isDisabled={textMessage.trim().length === 0}
        onClick={sendMessage}
        _hover={{
          bg: 'violet-3',
        }}
      >
        <Image src={sendIcon} w="100%" ps="3px" />
      </Button>
    </Flex>
  );
}

export default ChatPanel;
