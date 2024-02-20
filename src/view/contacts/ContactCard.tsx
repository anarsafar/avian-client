import { DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import useContactInfo from '@/hooks/contact/useContactInfo';
import useCustomModal from '@/hooks/custom/useConfirmation';
import useContact from '@/hooks/contact/useContactDeleteOrBlock';
import useActiveContact from '@/hooks/store/useActiveContact';
import useActiveConversation from '@/hooks/store/useActiveConversation';

import { ContactInterface } from '@/utils/contact.interface';
import { ConversationInterface } from '@/utils/conversation.interface';

interface ContactCardInterface {
  textTheme: string;
  contact: ContactInterface;
}

function ContactCard({
  contact,
  textTheme,
}: ContactCardInterface): JSX.Element {
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');

  const { modal: infoModal, infoOnOpen } = useContactInfo({
    contact,
  });
  const { setActiveContact, activeContact } = useActiveContact();
  const { setActiveConversation, clearConversation } = useActiveConversation();

  const queryClient = useQueryClient();

  const [data] = queryClient.getQueriesData({
    queryKey: ['conversations'],
  });

  const conversations = (data ? data[1] : { conversations: [] }) as {
    conversations: ConversationInterface[];
  };

  const { modal: customModal, onOpen: customOpen, onClose } = useCustomModal();
  const { isPending, deleteOrBlockContact, isError } = useContact(
    contact.user._id
  );

  useEffect(() => {
    if (isError) {
      onClose();
    }
  }, [isError, onClose]);

  const startConversation = () => {
    setActiveContact(contact);
    const newActiveConversation = conversations?.conversations.find((chat) => {
      return chat.participants.find((user) => user._id === contact.user._id);
    });
    if (newActiveConversation) {
      setActiveConversation(newActiveConversation);
    } else {
      clearConversation();
    }
  };

  return (
    <Button
      as={Box}
      borderRadius="0.9rem"
      variant="unstyled"
      height="auto"
      cursor="pointer"
      bg={activeContact?.user._id === contact.user._id ? hoverTheme : bgTheme}
      _hover={{
        bg: hoverTheme,
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text
          p="1.7rem 0 1.6rem 1.8rem"
          as="button"
          textAlign="left"
          fontWeight={600}
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          color={textTheme}
          onClick={startConversation}
          flexGrow="1"
        >
          {contact.user.userInfo.name}
        </Text>
        <Menu>
          <MenuButton as={Button} variant="unstyled" me="0.8rem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill={iconTheme}
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
              onClick={startConversation}
            >
              <EditIcon />
              <Text ms="1rem">Start Converation</Text>
            </MenuItem>
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
              onClick={customOpen}
            >
              <DeleteIcon color="red-3" />
              <Text ms="1rem" color="red-3">
                Delete Contact
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {infoModal}
      {customModal({
        isLoading: isPending,
        modalHeader: 'Delete Contact',
        action: () => deleteOrBlockContact({ action: 'delete' }),
      })}
    </Button>
  );
}

export default ContactCard;
