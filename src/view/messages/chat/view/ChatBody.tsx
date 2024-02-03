/* eslint-disable react/no-array-index-key */
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { useSocket } from '@/context/socket.context';
import formatDateLabel from '@/utils/formatDate';

import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';

interface MessageI {
  message: {
    messageBody: string;
    timeStamp: Date;
  };
  senderId: string;
}

function ChatBody() {
  const [messages, setMessages] = useState<MessageI[]>([]);

  let lastDisplayedDate = '';
  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');
  const scrollRef = useRef<Scrollbars | null>(null);
  const socket = useSocket();
  const { user } = useUser();
  const { activeConversation } = useActiveConversation();
  const { activeContact } = useActiveContact();

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Baku',
  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  useEffect(() => {
    const conversationId = activeConversation?._id || null;

    socket?.emit(
      'join-private-chat',
      conversationId,
      user?._id,
      activeContact?.user._id
    );
    setMessages([]);
  }, [activeContact?.user._id, activeConversation?._id, socket, user?._id]);

  useEffect(() => {
    const handlePrivateMessage = (message: MessageI) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on('private message', handlePrivateMessage);

    return () => {
      socket?.off('private message', handlePrivateMessage);
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollRef.current !== null) {
      scrollRef.current?.scrollToBottom();
    }
  }, [messages]);

  const renderMessages = messages.map((message, index) => {
    const isCurrentUser = message.senderId === user?._id;
    const isFirstMessageFromUser =
      index === 0 || messages[index - 1].senderId !== message.senderId;
    const messageDateLabel = formatDateLabel(String(message.message.timeStamp));

    const showDateLabel = messageDateLabel !== lastDisplayedDate;
    if (showDateLabel) {
      lastDisplayedDate = messageDateLabel;
    }

    return (
      <Fragment key={index}>
        {showDateLabel && (
          <Flex
            alignItems="center"
            justifyContent="center"
            gap="1.2rem"
            position="sticky"
            top="0"
          >
            <Text
              lineHeight="1.6rem"
              letterSpacing="0.18px"
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight={600}
              color={textTheme}
              padding="0.3rem 0.8rem"
              borderRadius="0.5rem"
              bg={hoverTheme}
            >
              {messageDateLabel}
            </Text>
          </Flex>
        )}
        <Flex
          alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}
          justifyContent="space-between"
          alignItems="flex-end"
          gap="0.8rem"
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          fontFamily="openSans"
        >
          {isFirstMessageFromUser && !isCurrentUser && (
            <Avatar
              alignSelf="flex-start"
              src={activeContact?.user.userInfo.avatar}
              bg="gray.500"
              loading="eager"
              w="3.3rem"
              h="3.3rem"
            />
          )}
          <Text
            order={isCurrentUser ? '0' : '1'}
            fontSize="1rem"
            fontWeight={300}
            lineHeight="1.8rem"
          >
            {dateFormatter.format(new Date(message.message.timeStamp))}
          </Text>
          <Box
            maxW="calc(calc(100vw - 36rem) * 0.3)"
            fontSize="1.2rem"
            borderRadius={
              isCurrentUser ? '10px 1px 10px 10px' : '1px 10px 10px 10px'
            }
            fontWeight={400}
            ms={isCurrentUser || isFirstMessageFromUser ? 'auto' : '4.1rem'}
            color={textTheme}
            p="1.2rem"
            bg={hoverTheme}
          >
            {message.message.messageBody}
          </Box>
        </Flex>
      </Fragment>
    );
  });

  return (
    <Scrollbars
      style={{ height: 'calc(100vh - 14rem)' }}
      autoHide
      ref={scrollRef}
    >
      <Box flexGrow="1" p="1.6rem 2.4rem 1.6rem 2.4rem" h="auto" me="1rem">
        <Flex direction="column" gap="0.8rem">
          {renderMessages}
        </Flex>
      </Box>
    </Scrollbars>
  );
}

export default ChatBody;
