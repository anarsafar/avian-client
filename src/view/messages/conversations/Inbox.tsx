/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import { Fragment, ReactNode } from 'react';
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import useConversation from '@/hooks/conversations/useConversation';
import useToken from '@/hooks/auth/useToken';

import ConversationCard from './ConversationCard';
import { ConversationsSkeleton } from '@/components/loading';

function Inbox({ contactName }: { contactName: string }) {
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const { conversations, isError, isLoading, refetchConversations } =
    useConversation();
  const { getNewAccessToken } = useToken(() => refetchConversations());

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
          onClick={() => getNewAccessToken()}
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
        You don't have any messages
      </Text>
    );
  } else {
    const filteredConvsersations = conversations?.conversations
      .filter((conversation) =>
        conversation.participants.find((participant) =>
          participant.userInfo.name
            .toLowerCase()
            .includes(contactName.toLowerCase().trim())
        )
      )
      .reverse();
    if (filteredConvsersations?.length === 0) {
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
          Conversation not found
        </Text>
      );
    } else {
      content = (
        <Flex gap=".5rem" direction="column">
          {filteredConvsersations?.map((conversation, index) => (
            <Fragment key={index}>
              <ConversationCard conversation={conversation} />
            </Fragment>
          ))}
        </Flex>
      );
    }
  }

  return content;
}

export default Inbox;
