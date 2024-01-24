/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSocket } from '@/context/socket.context';
import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';

interface MessageI {
  userId: string;
  messageBody: string;
  timeStamp: string;
}

function ChatBody() {
  const [messages, setMessages] = useState<MessageI[]>([]);
  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');
  const scrollRef = useRef<Scrollbars | null>(null);
  const socket = useSocket();
  const { user } = useUser();
  const { activeConversation } = useActiveConversation();

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Baku',
  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  useEffect(() => {
    const handlePrivateMessage = (message: MessageI) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      //   window.scrollTo(0, document.body.scrollHeight);
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

  const renderMessages = messages.map((message, index) => (
    <Flex
      key={index}
      alignSelf={message.userId === user?._id ? 'flex-end' : 'flex-start'}
      justifyContent="space-between"
      alignItems="flex-end"
      gap="0.8rem"
      lineHeight="1.6rem"
      letterSpacing="0.16px"
      fontFamily="openSans"
    >
      {message.userId !== user?._id && (
        <Avatar
          alignSelf="flex-start"
          name={activeConversation?.user.userInfo.name}
          src={activeConversation?.user.userInfo.avatar}
          loading="eager"
          w="3.3rem"
          h="3.3rem"
        />
      )}
      <Text
        order={message.userId === user?._id ? '0' : '1'}
        fontSize="1rem"
        fontWeight={300}
        lineHeight="1.8rem"
      >
        {dateFormatter.format(new Date(message.timeStamp))}
      </Text>
      <Box
        fontSize="1.2rem"
        borderRadius={
          message.userId === user?._id
            ? '10px 1px 10px 10px'
            : '1px 10px 10px 10px'
        }
        fontWeight={400}
        color={textTheme}
        p="1.2rem"
        bg={hoverTheme}
      >
        {message.messageBody}
      </Box>
    </Flex>
  ));

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
