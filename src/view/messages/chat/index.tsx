/* eslint-disable no-underscore-dangle */
import { Flex, useColorModeValue } from '@chakra-ui/react';

import ChatHeader from './view/ChatHeader';
import ChatPanel from './view/ChatPanel';
import NoChatSelected from './NoChatSelected';
import ChatBody from './view/ChatBody';
import useActiveContact from '@/hooks/store/useActiveContact';

function ChatView() {
  const inputColor = useColorModeValue('input-light', 'input-dark');
  const logoColor = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholderColor = useColorModeValue('gray-4', 'text-darker');
  const darkerTextColor = useColorModeValue('rgba(0, 0, 0, 0.70)', '#eee');
  const textColor = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const { activeContact } = useActiveContact();

  const contactChatView = (
    <Flex direction="column">
      <ChatHeader darkerTextColor={darkerTextColor} logoColor={logoColor} />
      <ChatBody />
      <ChatPanel
        textColor={textColor}
        placeholderColor={placeholderColor}
        inputColor={inputColor}
        logoColor={logoColor}
      />
    </Flex>
  );

  if (activeContact) {
    return contactChatView;
  }

  return <NoChatSelected />;
}

export default ChatView;
