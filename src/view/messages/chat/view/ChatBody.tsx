/* eslint-disable react/no-array-index-key */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useInView } from 'react-intersection-observer';

import useMessages from '@hooks/store/useMessages';
import { ArrowDownIcon } from '@chakra-ui/icons';
import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';
import useInfiniteMessages from '@/hooks/messages';

import { MessageI } from '@/schemas/message';
import { useSocket } from '@/context/socket.context';
import formatDateLabel from '@/utils/formatDate';

function ChatBody({ dateColor }: { dateColor: string }) {
  let lastDisplayedDate = '';
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Baku',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  const scrollRef = useRef<Scrollbars | null>(null);
  const { ref, inView } = useInView();

  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);

  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const socket = useSocket();
  const { user } = useUser();
  const { clearMessages, setMessages, messages } = useMessages();

  const { activeConversation } = useActiveConversation();
  const { activeContact } = useActiveContact();

  const {
    messages: data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetchMessages,
  } = useInfiniteMessages(activeConversation?._id);

  const handleScroll = () => scrollRef.current?.scrollToBottom();

  const displayScrollBottom = () => {
    const { top } = scrollRef.current?.getValues() || {};
    if (top) {
      setShowScrollToBottomButton(top < 1);
    }
  };

  useEffect(() => {
    displayScrollBottom();
    handleScroll();
  }, [messages]);

  useEffect(() => {
    const messagesFromDb = data?.pages
      .map((page) => page.messages.flat())
      .flat();

    if (messagesFromDb) {
      setMessages(messagesFromDb);
    }
  }, [data, setMessages]);

  useEffect(() => {
    const conversationId = activeConversation?._id || '';
    if (socket) {
      socket.auth.room = conversationId;
    }
    socket?.emit(
      'join-private-chat',
      conversationId,
      user?._id,
      activeContact?.user._id
    );
  }, [
    activeContact?.user._id,
    activeConversation?._id,
    clearMessages,
    socket,
    user?._id,
  ]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const handlePrivateMessage = (message: MessageI) => {
      if (socket) {
        socket.auth.serverOffset = message.timestamp;
      }
      setMessages(message);
      refetchMessages();
    };

    socket?.on('private message', handlePrivateMessage);

    return () => {
      socket?.off('private message', handlePrivateMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const renderMessages = messages.map((message, index) => {
    const isCurrentUser = message.sender === user?._id;
    const isFirstMessageFromUser =
      index === 0 || messages[index - 1].sender !== message.sender;
    const messageDateLabel = formatDateLabel(String(message.timestamp));

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
              bg={dateColor}
              minW="10rem"
              textAlign="center"
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
            {dateFormatter.format(new Date(message.timestamp))}
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
            whiteSpace="pre-wrap"
          >
            {message.content.replace(/<br\s*\/?>/g, '\n')}
          </Box>
        </Flex>
      </Fragment>
    );
  });

  return (
    <Scrollbars
      style={{
        height: 'calc(100vh - 14rem)',
      }}
      autoHide
      ref={scrollRef}
      onScroll={displayScrollBottom}
    >
      <Box flexGrow="1" p="1.6rem 2.4rem 1.6rem 2.4rem" h="auto" me="1rem">
        <Flex direction="column" gap="0.8rem">
          <VisuallyHidden ref={ref} h="2rem">
            fetch new data
          </VisuallyHidden>
          {isFetchingNextPage && (
            <Flex justify="center" align="center" my="1rem">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          )}
          {renderMessages}
          {showScrollToBottomButton && messages.length > 20 && (
            <Button
              variant="unstyled"
              bg={dateColor}
              borderRadius="50%"
              w="3rem"
              h="3rem"
              left="50%"
              position="sticky"
              bottom={0}
              onClick={handleScroll}
            >
              <ArrowDownIcon fontSize="1.6rem" color={textTheme} />
            </Button>
          )}
        </Flex>
      </Box>
    </Scrollbars>
  );
}

export default ChatBody;
