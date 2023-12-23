/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import {
  Box,
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Sidebar from '../common/Sidebar';
import api, { RequestType } from '@/api';
import usePersist, { StorageType } from '@/hooks/common/usePersist';
import ContactCard from './ContactCard';

interface ContactInterface {
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
}

function groupContactsByFirstLetter(contacts: ContactInterface[]) {
  return contacts.reduce(
    (acc, contact) => {
      const firstLetter = contact.user.userInfo.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    },
    {} as Record<string, ContactInterface[]>
  );
}

const contactIcon = (
  <Box>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M10.6667 4V6M10.6667 6V8M10.6667 6H12.6667M10.6667 6H8.66669M7.16669 3.25C7.16669 3.54547 7.10849 3.83806 6.99542 4.11104C6.88234 4.38402 6.71661 4.63206 6.50768 4.84099C6.29875 5.04992 6.05071 5.21566 5.77772 5.32873C5.50474 5.4418 5.21216 5.5 4.91669 5.5C4.62121 5.5 4.32863 5.4418 4.05565 5.32873C3.78267 5.21566 3.53463 5.04992 3.3257 4.84099C3.11676 4.63206 2.95103 4.38402 2.83796 4.11104C2.72489 3.83806 2.66669 3.54547 2.66669 3.25C2.66669 2.65326 2.90374 2.08097 3.3257 1.65901C3.74765 1.23705 4.31995 1 4.91669 1C5.51342 1 6.08572 1.23705 6.50768 1.65901C6.92963 2.08097 7.16669 2.65326 7.16669 3.25V3.25ZM0.666687 11.8233V11.75C0.666687 10.6228 1.11445 9.54183 1.91148 8.7448C2.70851 7.94777 3.78952 7.5 4.91669 7.5C6.04386 7.5 7.12486 7.94777 7.92189 8.7448C8.71892 9.54183 9.16669 10.6228 9.16669 11.75V11.8227C7.88367 12.5954 6.41376 13.0025 4.91602 13C3.36202 13 1.90802 12.57 0.666687 11.8227V11.8233Z"
        stroke="#8E99F3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

function Contacts(): JSX.Element {
  const { getPersistedData } = usePersist();
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const { current: accessToken } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const {
    data: contacts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['contacts', accessToken?.accessToken],
    queryFn: () =>
      api<{ contacts: ContactInterface[] }, null>(
        null,
        'contacts',
        RequestType.Get,
        accessToken?.accessToken
      ),
    enabled: typeof accessToken !== undefined,
    retry: false,
    networkMode: 'always',
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <>
        <Stack>
          <Skeleton height="3rem" w="3rem" m="1rem 1.8rem 2rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
        </Stack>
        <Stack>
          <Skeleton height="3rem" w="3rem" m="1rem 1.8rem 2rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
        </Stack>
        <Stack>
          <Skeleton height="3rem" w="3rem" m="1rem 1.8rem 2rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
        </Stack>
        <Stack>
          <Skeleton height="3rem" w="3rem" m="1rem 1.8rem 2rem 1.8rem" />
          <Skeleton height="3rem" m="0.5rem 1.8rem" />
        </Stack>
      </>
    );
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
          Can't get contacts
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
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </Flex>
    );
  } else if (contacts?.contacts.length === 0) {
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
    const groupedContacts = groupContactsByFirstLetter(
      contacts?.contacts || []
    );
    content = (
      <>
        {Object.keys(groupedContacts)
          .sort()
          .map((letter) => (
            <VStack key={letter} align="stretch">
              <Text
                lineHeight="1.8rem"
                fontFamily="openSans"
                fontSize="1.2rem"
                p="1rem 1.8rem"
                color={textTheme}
                fontWeight={600}
              >
                {letter}
              </Text>
              {groupedContacts[letter].map((contact) => (
                <ContactCard
                  key={contact.user._id}
                  contact={contact}
                  textTheme={textTheme}
                />
              ))}
            </VStack>
          ))}
      </>
    );
  }

  return (
    <Sidebar header="Contacts" sidebarIcon={contactIcon} type="contacts">
      {content}
    </Sidebar>
  );
}

export default Contacts;
