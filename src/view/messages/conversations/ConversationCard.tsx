/* eslint-disable no-nested-ternary */
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { ConversationInterface } from '@/utils/conversation.interface';
import { ContactInterface } from '@/utils/contact.interface';

import useUser from '@/hooks/store/useUser';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import useActiveContact from '@/hooks/store/useActiveContact';
import useContacts from '@/hooks/contact/useContacts';
import useMobileChatView from '@/hooks/store/useMobileChatView';

function ConversationCard({
  conversation,
}: {
  conversation: ConversationInterface;
}): JSX.Element {
  const { mobileChatOpen } = useMobileChatView();

  const text = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const darkerText = useColorModeValue('rgba(0, 0, 0, 0.70)', '#eee');
  const hover = useColorModeValue('hover-light', 'accent-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');

  const { user } = useUser();
  const { contacts } = useContacts();

  const { setActiveConversation } = useActiveConversation();
  const { activeContact, setActiveContact } = useActiveContact();

  const [isLessThan800] = useMediaQuery('(max-width: 800px)');

  const cardUser = conversation.conversation.participants.find(
    (participant) => participant._id !== user?._id
  );

  const handleConversation = () => {
    setActiveConversation(conversation);
    const newActiveContact = contacts?.contacts.find(
      (contact) => contact.user._id === cardUser?._id
    );

    if (newActiveContact) {
      setActiveContact(newActiveContact);
    } else {
      const newActiceContact = { user: cardUser } as ContactInterface;
      setActiveContact(newActiceContact);
    }
    if (isLessThan800) {
      mobileChatOpen();
    }
  };

  function getHourAndMinute(timestamp: string) {
    const date = new Date(timestamp);

    const timeFormat = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    return timeFormat.format(date);
  }

  return (
    <Flex
      as="button"
      fontFamily="openSans"
      gap="1rem"
      p="1.6rem 1.7rem"
      lineHeight="1.8rem"
      letterSpacing="0.16px"
      borderRadius="0.9rem"
      onClick={handleConversation}
      bg={
        isLessThan800
          ? bgTheme
          : activeContact?.user._id === cardUser?._id
          ? hover
          : bgTheme
      }
      _hover={{
        bg: hover,
      }}
    >
      <Avatar
        bg="gray.500"
        src={cardUser?.userInfo.avatar}
        w="3.3rem"
        h="3.3rem"
      >
        <AvatarBadge
          borderColor="papayawhip"
          border="2px solid"
          bg={cardUser?.online ? 'green.500' : 'red.500'}
          boxSize="1.25em"
        />
      </Avatar>
      <Stack
        direction="column"
        textAlign="left"
        maxW="15rem"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Flex alignItems="center" gap="0.5rem">
          <Text
            fontSize="1.3rem"
            fontWeight="600"
            color={darkerText}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {cardUser?.userInfo.name}
          </Text>
          {conversation.muted && (
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                viewBox="0 -960 960 960"
                width="16"
                fill={darkerText}
              >
                <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
              </svg>
            </Box>
          )}
        </Flex>
        <Text
          fontSize="1.1rem"
          fontWeight="400"
          color={text}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {conversation.conversation.cardData.lastMessageSender === user?._id &&
            'You: '}
          {conversation.conversation.cardData.lastMessageContent}
        </Text>
      </Stack>
      <Stack direction="column" textAlign="right" ms="auto">
        <Text fontSize="1.1rem" fontWeight="400" color={text}>
          {getHourAndMinute(
            String(conversation.conversation.cardData.lastMessageDate)
          )}
        </Text>
        {conversation.unread > 0 && (
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
              {conversation.unread}
            </Text>
          </Flex>
        )}
      </Stack>
    </Flex>
  );
}

export default ConversationCard;
