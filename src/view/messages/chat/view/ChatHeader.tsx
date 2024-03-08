/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, InfoOutlineIcon, SearchIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

import { useSocket } from '@/context/socket.context';
import SearchMessage from '@/components/searchMessage';

import formatLastSeen from '@/utils/formatLastSeen';
import { ContactInterface } from '@/utils/contact.interface';

import useActiveContact from '@/hooks/store/useActiveContact';
import useConversation from '@/hooks/conversations/useConversation';
import useContactInfo from '@/hooks/contact/useContactInfo';
import useConfiramtion from '@/hooks/custom/useConfirmation';
import useActiveConversation from '@/hooks/store/useActiveConversation';

interface PropTypes {
  darkerTextColor: string;
  logoColor: string;
}

function ChatHeader({ darkerTextColor, logoColor }: PropTypes) {
  const socket = useSocket();
  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const [typing, setTyping] = useState<boolean>(false);

  const { activeContact } = useActiveContact();
  const { activeConversation } = useActiveConversation();

  const { deleteConversation, isConversationDeleting } = useConversation();
  const { modal: confirmModal, onOpen } = useConfiramtion();
  const { isOpen, onOpen: openSearchMessage, onClose } = useDisclosure();

  const { infoOnOpen, modal } = useContactInfo({
    contact: activeContact as ContactInterface,
  });

  useEffect(() => {
    socket?.on('typing', (userId: string) => {
      if (activeContact?.user._id === userId) {
        setTyping(true);
      }
    });
    socket?.on('stop typing', (userId: string) => {
      if (activeContact?.user._id === userId) {
        setTyping(false);
      }
    });
  }, [activeContact?.user._id, socket]);

  return (
    <Flex
      fontFamily="openSans"
      lineHeight="1.8rem"
      letterSpacing="0.16px"
      p="1.6rem 2.4rem"
      alignItems="center"
      gap="1.2rem"
    >
      <Button variant="unstyled" h="auto" onClick={infoOnOpen}>
        <Flex alignItems="center" gap="1.2rem">
          <Avatar
            src={activeContact?.user.userInfo.avatar}
            bg="gray.500"
            loading="eager"
            w="3.3rem"
            h="3.3rem"
          />
          <Box>
            <Text
              textAlign="left"
              fontSize="1.3rem"
              fontWeight="600"
              color={darkerTextColor}
              maxW="17rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {activeContact?.user.userInfo.name}
            </Text>
            <Text
              textAlign="left"
              fontSize="1.1rem"
              fontWeight="300"
              color={darkerTextColor}
              maxW="17rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {typing
                ? 'typing...'
                : activeContact?.user.online
                ? 'Online'
                : formatLastSeen(activeContact?.user.lastSeen as string)}
            </Text>
          </Box>
        </Flex>
      </Button>
      <SearchMessage isOpen={isOpen} onClose={onClose} />
      <Flex direction="row" alignItems="center" ms="auto" gap="1.2rem">
        <Button
          variant="unstyled"
          onClick={openSearchMessage}
          _hover={{ bg: hoverTheme }}
          borderRadius="50%"
          w="3rem"
          h="3rem"
        >
          <SearchIcon color={logoColor} fontSize="1.8rem" />
        </Button>

        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill={logoColor}
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </MenuButton>
          <MenuList w="18rem">
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              color={textTheme}
              fontWeight={400}
              onClick={infoOnOpen}
            >
              <InfoOutlineIcon />
              <Text ms="1rem">Contact Information</Text>
            </MenuItem>
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              fontWeight={400}
              onClick={onOpen}
              isDisabled={!activeConversation}
            >
              <DeleteIcon color="red-3" />
              <Text ms="1rem" color="red-3">
                Delete Conversation
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {modal}
      {confirmModal({
        action: () =>
          deleteConversation(activeConversation?.conversation._id as string),
        isLoading: isConversationDeleting,
        modalHeader: 'Delete Conversation',
      })}
    </Flex>
  );
}

export default ChatHeader;
