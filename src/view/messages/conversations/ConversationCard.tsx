/* eslint-disable no-underscore-dangle */
import { Avatar, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { ConversationInterface } from '@/utils/conversation.interface';
import { ContactInterface } from '@/utils/contact.interface';

import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';

function ConversationCard({
  conversation,
}: {
  conversation: ConversationInterface;
}): JSX.Element {
  const text = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const darkerText = useColorModeValue('rgba(0, 0, 0, 0.70)', '#eee');
  const hover = useColorModeValue('hover-light', 'accent-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');

  const { user } = useUser();

  const { setActiveConversation } = useActiveConversation();
  const { activeContact } = useActiveContact();
  const { setActiveContact, clearActiveContact } = useActiveContact();

  const queryClient = useQueryClient();

  const [data] = queryClient.getQueriesData({
    queryKey: ['contacts'],
  });

  const contacts = (data ? data[1] : { conversations: [] }) as {
    contacts: ContactInterface[];
  };

  const cardUser = conversation.participants.find(
    (participant) => participant._id !== user?._id
  );

  const handleConversation = () => {
    setActiveConversation(conversation);
    const newActiveContact = contacts?.contacts.find((contact) =>
      conversation.participants.find((usr) => usr._id === contact.user._id)
    );

    if (newActiveContact) {
      setActiveContact(newActiveContact);
    } else {
      clearActiveContact();
    }
  };

  return (
    <Flex
      as="button"
      fontFamily="openSans"
      gap="8px"
      p="1.6rem 1.7rem"
      lineHeight="1.8rem"
      letterSpacing="0.16px"
      borderRadius="0.9rem"
      onClick={handleConversation}
      bg={activeContact?.user._id === cardUser?._id ? hover : bgTheme}
      _hover={{
        bg: hover,
      }}
    >
      <Avatar
        bg="gray.500"
        src={cardUser?.userInfo.avatar}
        w="3.3rem"
        h="3.3rem"
      />
      <Stack
        direction="column"
        textAlign="left"
        maxW="15rem"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Text
          fontSize="1.3rem"
          fontWeight="600"
          color={darkerText}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {cardUser?.userInfo.name}
        </Text>
        <Text
          fontSize="1.1rem"
          fontWeight="400"
          color={text}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          Hello there Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Tenetur atque molestias quos nihil eos ipsam facilis ab animi
          molestiae neque corrupti fugit quae odit, aspernatur quod, architecto
          mollitia eveniet officia.
        </Text>
      </Stack>
      <Stack direction="column" textAlign="right" ms="auto">
        <Text fontSize="1.1rem" fontWeight="400" color={text}>
          4:00 pm
        </Text>
        <Flex
          alignSelf="flex-end"
          bg="violet-2"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          w="1rem"
          h="1rem"
          p="0.8rem"
        >
          <Text color="#fff" fontSize="8px" fontWeight="600">
            4
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default ConversationCard;
