import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Scrollbars from 'react-custom-scrollbars';
import { useState } from 'react';

import SearchInput from '@components/common/SearchInput';

import useMessages from '@hooks/store/useMessages';
import useActiveContact from '@/hooks/store/useActiveContact';
import useUser from '@/hooks/store/useUser';

interface SearchMessageI {
  isOpen: boolean;
  onClose: () => void;
}

function SearchMessage({ isOpen, onClose }: SearchMessageI) {
  const [searchMessage, setSearchMessage] = useState<string>('');

  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const { messages } = useMessages();
  const { activeContact } = useActiveContact();
  const { user } = useUser();

  const filteredMessages = messages.filter((message) =>
    message.content.toLowerCase().trim().includes(searchMessage.trim())
  );

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Baku',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  const messagesUI = filteredMessages.reverse().map((message) => (
    <Flex
      key={message._id}
      gap="1rem"
      as="button"
      textAlign="left"
      p="1.1rem"
      w="100%"
      borderRadius="0.8rem"
      _hover={{ bg: hoverTheme }}
      justifyContent="space-between"
    >
      <Avatar
        bg="gray.500"
        src={
          user?._id !== message.sender
            ? activeContact?.user.userInfo.avatar
            : user.userInfo.avatar
        }
        w="3.3rem"
        h="3.3rem"
      />
      <Box
        fontFamily="openSans"
        lineHeight="1.6rem"
        letterSpacing="0.16px"
        color={textTheme}
        me="auto"
        maxW="10rem"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Text
          fontSize="1.2rem"
          fontWeight="600"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {user?._id !== message.sender
            ? activeContact?.user.userInfo.name
            : user.userInfo.name}
        </Text>
        <Text
          mt="0.4rem"
          color={textTheme}
          fontWeight={400}
          fontSize="1rem"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {message.content}
        </Text>
      </Box>
      <Text mt="0.4rem" color={textTheme} fontWeight={400} fontSize="1rem">
        {dateFormatter.format(new Date(message.timestamp))}
      </Text>
    </Flex>
  ));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={bgTheme} borderRadius="1rem">
        <ModalHeader
          fontSize="1.8rem"
          fontWeight={400}
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          color={textTheme}
          p="0"
          mt="2.6rem"
          ms="2.6rem"
        >
          Search Message
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
          right="2.6rem"
          top="2.6rem"
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
        <ModalBody p="2.6rem 0.5rem 1.6rem 0.5rem">
          <Box px="2.1rem">
            <SearchInput value={searchMessage} onChange={setSearchMessage} />
          </Box>

          <Scrollbars
            style={{
              maxHeight: '17.6rem',
              height:
                messages && messages.length > 0
                  ? `${messages.length * 58}px`
                  : '4rem',
              marginTop: '1.2rem',
            }}
            autoHide
          >
            <Box mx="1rem">
              {filteredMessages.length === 0 && (
                <Text
                  fontSize="1.2rem"
                  fontWeight={400}
                  lineHeight="1.8rem"
                  letterSpacing="0.16px"
                  color={textTheme}
                  align="center"
                  mt="1.2rem"
                >
                  You don't have any messages
                </Text>
              )}
              {messagesUI}
            </Box>
          </Scrollbars>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SearchMessage;
