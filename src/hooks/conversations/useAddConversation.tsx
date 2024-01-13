/* eslint-disable react/jsx-key */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import useContacts from '@hooks/contact/useContacts';
import Scrollbars from 'react-custom-scrollbars';
import SearchInput from '@/components/common/SearchInput';
import { AddContactSkeleton } from '@/components/loading';
import formatLastSeen from '@/utils/formatLastSeen';

const useAddConversation = () => {
  const { isOpen, onOpen: addConversationOpen, onClose } = useDisclosure();
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const inputTheme = useColorModeValue('input-light', 'input-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const [searchContact, setSearchContact] = useState<string>('');
  const { contacts, isError, isLoading, getNewAccessToken, accessToken } =
    useContacts();

  let contactsUI: ReactNode;

  if (isLoading) {
    contactsUI = <AddContactSkeleton />;
  } else if (isError) {
    contactsUI = (
      <Flex direction="column" alignItems="center">
        <Text
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          p="1rem 1.8rem"
          color={textTheme}
          fontWeight={600}
        >
          Can't get contacts
        </Text>
        <Button
          variant="unstyled"
          bg="#FF7961"
          padding="1rem 2rem"
          h="auto"
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          color="white"
          _hover={{
            bg: '#FF5F44',
          }}
          onClick={() => getNewAccessToken(accessToken?.accessToken)}
        >
          Try again
        </Button>
      </Flex>
    );
  } else if (contacts?.contacts.length === 0) {
    contactsUI = (
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
    const filteredContacts = contacts?.contacts.filter((contact) =>
      contact.user.userInfo.name
        .toLowerCase()
        .includes(searchContact.toLowerCase().trim())
    );

    contactsUI = filteredContacts?.sort().map((contact) => (
      <Flex
        gap="1rem"
        as="button"
        textAlign="left"
        p="1.1rem"
        w="100%"
        borderRadius="0.8rem"
        _hover={{ bg: hoverTheme }}
      >
        <Avatar
          name={contact.user.userInfo.name}
          src={contact.user.userInfo.avatar}
          w="3.3rem"
          h="3.3rem"
        />
        <Box
          fontFamily="openSans"
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          color={textTheme}
        >
          <Text fontSize="1.2rem" fontWeight="600">
            {contact.user.userInfo.name}
          </Text>
          <Text mt="0.4rem" color={textTheme} fontWeight={400} fontSize="1rem">
            {formatLastSeen(contact.user.lastSeen)}
          </Text>
        </Box>
      </Flex>
    ));
  }

  const addConversationModal = (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bgTheme}>
        <ModalHeader
          fontSize="1.8rem"
          fontWeight={400}
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          color={textTheme}
          p="0"
          mt="1.6rem"
          ms="1.6rem"
        >
          Compose
        </ModalHeader>
        <Flex
          as="button"
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          onClick={onClose}
          border="1px solid"
          borderColor={iconTheme}
          borderRadius="50%"
          w="2rem"
          h="2rem"
          p="4px"
          position="absolute"
          right="1.6rem"
          top="1.6rem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 9L9 3M3 3L9 9"
              stroke={iconTheme}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Flex>
        <ModalBody p="1.6rem 0.5rem">
          <Tabs variant="unstyled" isFitted isLazy>
            <TabList
              borderRadius="0.8rem"
              bg={inputTheme}
              p="0.4rem"
              mx="1.1rem"
            >
              <Tab
                fontFamily="openSans"
                fontSize="1.2rem"
                fontWeight="600"
                lineHeight="1.6rem"
                letterSpacing="0.16px"
                borderRadius="0.8rem"
                p="1.1rem 2.2rem"
                _selected={{ color: 'white', bg: 'violet-2' }}
              >
                Contact
              </Tab>
              <Tab
                fontFamily="openSans"
                fontSize="1.2rem"
                fontWeight="600"
                lineHeight="1.6rem"
                letterSpacing="0.16px"
                borderRadius="0.8rem"
                p="1.1rem 2.2rem"
                _selected={{ color: 'white', bg: 'violet-2' }}
              >
                Group
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0" mt="1.6rem">
                <Box px="1.1rem">
                  <SearchInput
                    value={searchContact}
                    onChange={setSearchContact}
                  />
                </Box>

                <Scrollbars
                  style={{
                    maxHeight: '17.6rem',
                    height: contacts
                      ? `${contacts.contacts.length * 58}px`
                      : 'auto',
                    marginTop: '1.2rem',
                  }}
                  autoHide
                >
                  <Box>{contactsUI}</Box>
                </Scrollbars>
              </TabPanel>
              <TabPanel p="0">
                <Text
                  textAlign="center"
                  fontFamily="openSans"
                  fontSize="1.2rem"
                  fontWeight="600"
                  lineHeight="1.6rem"
                  letterSpacing="0.16px"
                  borderRadius="0.8rem"
                  mt="2rem"
                >
                  Coming soon
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  return { addConversationModal, addConversationOpen };
};

export default useAddConversation;
