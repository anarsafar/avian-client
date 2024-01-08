import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import useSocket from '@/hooks/store/useSocket';

function ChatBody() {
  const [messages, setMessages] = useState<string[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    const handlePrivateMessage = (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    };

    socket.on('private message', handlePrivateMessage);

    return () => {
      socket.off('private message', handlePrivateMessage);
    };
  }, [socket]);

  const renderMessages = messages.map((message, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Text key={index}>{message}</Text>
  ));

  return (
    <Scrollbars style={{ height: 'calc(100vh - 14rem)' }} autoHide>
      <Box flexGrow="1" p="1.6rem 1.4rem 1.6rem 2.4rem" h="auto" me="1rem">
        {renderMessages}
      </Box>
    </Scrollbars>
  );
}

export default ChatBody;
