/* eslint-disable no-underscore-dangle */
import { DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import useContact from '@/hooks/common/useContact';

interface ContactInterface {
  contact: {
    user: {
      _id: string;
      authInfo: {
        providerId?: string;
        email?: string;
      };
      userInfo: {
        name: string;
        avatar: string;
      };
      lastSeen: string;
      online: boolean;
    };
    isBlocked: boolean;
  };
  textTheme: string;
}

function ContactCard({ contact, textTheme }: ContactInterface): JSX.Element {
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPending, deleteOrBlockContact } = useContact(contact.user._id);

  return (
    <Button
      p="1.7rem 0.8rem 1.6rem 1.8rem"
      borderRadius="0.9rem"
      variant="unstyled"
      height="auto"
      _hover={{
        bg: hoverTheme,
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text
          fontWeight={600}
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          color={textTheme}
        >
          {contact.user.userInfo.name}
        </Text>
        <Menu>
          <MenuButton as={Button} variant="unstyled">
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
            >
              <EditIcon />
              <Text ms="1rem">Start Converation</Text>
            </MenuItem>
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              color={textTheme}
              fontWeight={400}
            >
              <InfoOutlineIcon />
              <Text ms="1rem">Contact Information</Text>
            </MenuItem>
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              fontWeight={400}
              onClick={onOpen}
            >
              <DeleteIcon color="red-3" />
              <Text ms="1rem" color="red-3">
                Delete Contact
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent py="1rem" bg={bg}>
          <ModalHeader
            color={textTheme}
            fontSize="1.6rem"
            fontFamily="openSans"
            borderRadius="1.9rem"
            fontWeight={600}
          >
            Delete contact
          </ModalHeader>
          <ModalCloseButton
            fontSize="1rem"
            mt="1.5rem"
            mr="1rem"
            color={textTheme}
            borderRadius="50%"
            border="1px solid"
            p="1.2rem"
            borderColor={textTheme}
          />
          <ModalBody
            fontSize="1.3rem"
            fontFamily="openSans"
            color={textTheme}
            fontWeight={400}
          >
            Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="unstyled"
              mr={3}
              onClick={onClose}
              h="auto"
              bg="violet-2"
              p="0.7rem 1rem"
              lineHeight="1.8rem"
              fontFamily="openSans"
              fontSize="1.2rem"
              color="white"
              _hover={{
                bg: 'violet-3',
              }}
            >
              Close
            </Button>
            <Button
              bg="#FF7961"
              p="1.6rem"
              lineHeight="1.8rem"
              fontFamily="openSans"
              fontSize="1.2rem"
              color="white"
              _hover={{
                bg: '#FF5F44',
              }}
              isLoading={isPending}
              loadingText="deleting..."
              onClick={async () => {
                await deleteOrBlockContact({ action: 'delete' });
                onClose();
              }}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  );
}

export default ContactCard;
