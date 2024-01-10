/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import api, { ErrorResponse, RequestType } from '@/api';
import usePersist, { StorageType } from '@/hooks/store/usePersist';
import ContactCard from './ContactCard';
import { SkeletonLoading } from '@/components/loading';
import { ContactInterface } from '@/utils/contact.interface';
import groupContactsByFirstLetter from '@/utils/groupContacts';
import useLogout from '@/hooks/auth/useLogout';

function Contacts({ contactName }: { contactName: string }): JSX.Element {
  const { getPersistedData, persistData } = usePersist();
  const { logoutHandler } = useLogout();
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
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

  const { mutate: getNewAccessToken } = useMutation({
    mutationFn: (token?: string | undefined) =>
      api<{ accessToken: string }, null>(
        null,
        'refresh',
        RequestType.Post,
        token
      ),
    mutationKey: ['get-new-access-token'],
    onSuccess: (newAccessToken) => {
      persistData<{ accessToken: string }>(
        newAccessToken,
        'access-token',
        StorageType.Local
      );
      refetch();
    },
    onError: (accessError: ErrorResponse) => {
      console.error('Error from refresh route ', accessError);
      logoutHandler();
    },
    retry: false,
    networkMode: 'always',
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = <SkeletonLoading />;
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
          onClick={() => getNewAccessToken(accessToken?.accessToken)}
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
    const filteredContacts = contacts?.contacts.filter((contact) =>
      contact.user.userInfo.name
        .toLowerCase()
        .includes(contactName.toLowerCase().trim())
    );

    const groupedContacts = groupContactsByFirstLetter(filteredContacts || []);
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

  return content;
}

export default Contacts;
