import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import ChatHeader from './view/ChatHeader';
import ChatPanel from './view/ChatPanel';
import NoChatSelected from './NoChatSelected';
import useActiveConversation from '@/hooks/store/useActiveConversation';

function ChatView() {
  const inputColor = useColorModeValue('input-light', 'input-dark');
  const logoColor = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholderColor = useColorModeValue('gray-5', 'text-darker');
  const darkerTextColor = useColorModeValue('rgba(0, 0, 0, 0.70)', '#eee');
  const textColor = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const { activeConversation } = useActiveConversation();

  const contactChatView = (
    <Flex direction="column" h="100%">
      <ChatHeader darkerTextColor={darkerTextColor} logoColor={logoColor} />
      <Box flexGrow="1">Messages</Box>
      <ChatPanel
        textColor={textColor}
        placeholderColor={placeholderColor}
        inputColor={inputColor}
        logoColor={logoColor}
      />
    </Flex>
  );

  return activeConversation ? contactChatView : <NoChatSelected />;
}

export default ChatView;
