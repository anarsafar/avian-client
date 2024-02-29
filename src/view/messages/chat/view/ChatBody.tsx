/* eslint-disable jsx-a11y/media-has-caption */
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

import useMessages from '@hooks/store/useMessages';
import { ArrowDownIcon } from '@chakra-ui/icons';
import notificationSound from '@assets/sound/notification.mp3';
import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';
import useInfiniteMessages from '@/hooks/messages';

import { MessageI } from '@/schemas/message';
import { useSocket } from '@/context/socket.context';
import formatDateLabel from '@/utils/formatDate';
import ObserverMessage from '../../ObservedMessage';
import useContacts from '@/hooks/contact/useContacts';

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const updateRef = useRef<boolean>(true);

  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(true);

  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const socket = useSocket();
  const { user } = useUser();
  const { contacts } = useContacts();
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

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const smoothScrollTo = (targetPosition: number, duration = 500) => {
    const startPosition = scrollRef.current?.getScrollTop() || 0;
    const distance = targetPosition - startPosition;
    let startTime: number = 0;

    const animationLoop = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOut(progress); // See easing function below

      scrollRef.current?.scrollTop(startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animationLoop);
      }
    };

    requestAnimationFrame(animationLoop);
  };

  const handleScroll = () => {
    smoothScrollTo(scrollRef.current?.getScrollHeight() || 0);
  };

  const displayScrollBottom = () => {
    const { top, scrollTop } = scrollRef.current?.getValues() || {};
    if (top) {
      setShowScrollToBottomButton(top < 1);
    }

    const isAtTop = scrollTop && scrollTop < 180;
    if (isAtTop && hasNextPage && !isFetchingNextPage) {
      updateRef.current = false;
      fetchNextPage();
    }
  };

  useEffect(() => {
    socket?.on('notification', (senderId: string, recipientId: string) => {
      const contact = contacts?.contacts.find(
        (person) => person.user._id === senderId
      );
      if (
        recipientId === user?._id &&
        user.notification &&
        contact?.notification
      ) {
        audioRef.current?.play();
      }
    });

    return () => {
      socket?.off('notification');
    };
  }, [contacts?.contacts, socket, user?._id, user?.notification]);

  useEffect(() => {
    if (updateRef.current) {
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!activeConversation) {
      clearMessages();
    }
  }, [activeConversation, clearMessages]);

  useEffect(() => {
    const conversationId = activeConversation?._id || '';
    if (socket) {
      socket.auth.room = conversationId;
    }
    updateRef.current = true;

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
    const handlePrivateMessage = (message: MessageI) => {
      if (socket) {
        socket.auth.serverOffset = message.timestamp;
      }
      updateRef.current = true;
      setMessages(message);
      refetchMessages();
    };

    socket?.on('private message', handlePrivateMessage);
    socket?.on('update-messages', (userId: string) => {
      if (userId === user?._id) {
        refetchMessages();
      }
    });

    return () => {
      socket?.off('private message', handlePrivateMessage);
      socket?.off('update-messages');
      clearMessages();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleIntersect = (message: MessageI) => {
    socket?.emit(
      'mark-as-read',
      message._id,
      user?._id,
      activeConversation?._id
    );
  };

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
          <Box display={isCurrentUser ? 'block' : 'none'}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1542_2319)">
                <path
                  d="M7.81383 0.594604C7.74394 0.594604 7.65384 0.611451 7.61438 0.633373C7.57484 0.654546 6.58781 2.10559 5.42038 3.85769C5.0531 4.40895 4.77776 4.82146 4.47442 5.27617C4.65747 5.45773 4.82343 5.62191 4.97886 5.77484C5.24634 5.37722 5.53494 4.94514 5.8367 4.49285C7.57686 1.88472 8.11144 1.05763 8.12268 0.957758C8.14198 0.772262 7.99134 0.594604 7.81383 0.594604ZM0.362363 4.29624C0.234206 4.29566 0.0895315 4.39237 0.0341281 4.52476C-0.0112138 4.63287 -0.0112116 4.66622 0.0331561 4.76875C0.0625721 4.83658 0.747069 5.54836 1.63266 6.43124C3.04388 7.8382 3.19248 7.97466 3.3019 7.97466C3.36804 7.97466 3.45404 7.95778 3.49359 7.93586C3.5157 7.92462 3.86703 7.417 4.38147 6.65874C4.23945 6.51821 4.0728 6.35316 3.88186 6.16298C3.56692 6.63476 3.28584 7.05546 3.28253 7.0596C3.27503 7.06897 2.64808 6.45736 1.89021 5.70113C1.01488 4.82766 0.476879 4.31698 0.415611 4.30199C0.398748 4.29824 0.380537 4.29624 0.362363 4.29624Z"
                  fill={message.isRead ? '#4CAF50' : 'gray'}
                />
                <path
                  d="M3.50897 5.83627C2.62337 4.95338 1.9386 4.24189 1.90916 4.17397C1.86476 4.07148 1.86475 4.03793 1.91013 3.92978C1.97346 3.77839 2.15325 3.67365 2.2919 3.70752C2.35317 3.72251 2.89102 4.23259 3.76634 5.10607C4.52421 5.86231 5.15086 6.47365 5.15887 6.46462C5.16637 6.45525 6.12864 5.01464 7.29606 3.26252C8.4635 1.51039 9.45101 0.0595487 9.49053 0.0383948C9.53006 0.0172221 9.61944 -3.05176e-05 9.68938 -3.05176e-05C9.86681 -3.05176e-05 10.0177 0.177238 9.99836 0.362808C9.98712 0.462676 9.45318 1.28991 7.71302 3.89805C6.46357 5.77074 5.40896 7.32024 5.36945 7.3414C5.32992 7.36257 5.24354 7.37979 5.17747 7.37979C5.06805 7.37979 4.92019 7.24324 3.50897 5.83627Z"
                  fill={message.isRead ? '#4CAF50' : 'gray'}
                />
              </g>
              <defs>
                <clipPath id="clip0_1542_2319">
                  <rect width="10" height="9.51846" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Box>
          <Text
            order={isCurrentUser ? '0' : '1'}
            fontSize="1rem"
            fontWeight={300}
            lineHeight="1.8rem"
          >
            {dateFormatter.format(new Date(message.timestamp))}
          </Text>
          <ObserverMessage
            onIntersect={() => handleIntersect(message)}
            isCurrentUser={isCurrentUser}
            isFirstMessageFromUser={isFirstMessageFromUser}
            textTheme={textTheme}
            hoverTheme={hoverTheme}
            message={message}
          />
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
      <VisuallyHidden>
        <audio ref={audioRef} src={notificationSound} />
      </VisuallyHidden>
      <Box flexGrow="1" p="1.6rem 2.4rem 1.6rem 2.4rem" h="auto" me="1rem">
        <Flex direction="column" gap="0.8rem">
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
          {messages.length > 20 && showScrollToBottomButton && (
            <Button
              variant="unstyled"
              bg={dateColor}
              borderRadius="50%"
              w="3rem"
              h="3rem"
              left="50%"
              position="sticky"
              bottom="0"
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
