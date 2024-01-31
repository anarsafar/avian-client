/* eslint-disable react/no-array-index-key */
import Sidebar from '@components/common/Sidebar';
import { Fragment, ReactNode } from 'react';
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import useConversation from '@/hooks/conversations/useConversation';
import ConversationCard from './ConversationCard';
import { ConversationsSkeleton } from '@/components/loading';

function Inbox(): JSX.Element {
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const { conversations, isError, isLoading, refetchConversations } =
    useConversation();

  let content: ReactNode;

  if (isLoading) {
    content = <ConversationsSkeleton />;
  } else if (isError) {
    content = (
      <Flex
        p="1.7rem 0.8rem 1.6rem 1.8rem"
        direction="column"
        alignItems="center"
      >
        <Text
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          p="1rem 1.8rem"
          color={textTheme}
          fontWeight={600}
        >
          Can't get conversations
        </Text>
        <Button
          variant="unstyled"
          bg="#FF7961"
          padding="1rem 2.4rem"
          mx="1.7rem"
          h="auto"
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          color="white"
          _hover={{
            bg: '#FF5F44',
          }}
          onClick={() => refetchConversations()}
        >
          Try again
        </Button>
      </Flex>
    );
  } else if (conversations?.conversations.length === 0) {
    content = (
      <Text
        lineHeight="1.8rem"
        fontFamily="openSans"
        fontSize="1.2rem"
        p="1rem 1.8rem"
        color={textTheme}
        fontWeight={600}
        textAlign="center"
      >
        You don't have any contacts
      </Text>
    );
  } else {
    content = conversations?.conversations.map((conversation, index) => (
      <Fragment key={index}>
        <ConversationCard conversation={conversation} />
      </Fragment>
    ));
  }

  return (
    <Sidebar header="Messages" type="conversation">
      {() => content}
    </Sidebar>
  );
}

export default Inbox;
