/* eslint-disable react/no-array-index-key */
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, ReactNode } from 'react';

import api, { RequestType } from '@/api';
import usePersist, { StorageType } from '@/hooks/store/usePersist';
import useToken from '@/hooks/auth/useToken';
import { NotificationI } from '@/schemas/notification';
import NotificationCard from './NotificationCard';

function Notification() {
  const { getPersistedData } = usePersist();
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  const {
    data: notifications,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notifications', accessToken, accessToken?.accessToken],
    queryFn: () =>
      api<{ notifications: NotificationI[] }, null>(
        null,
        'notifications',
        RequestType.Get,
        accessToken?.accessToken
      ),
    refetchOnWindowFocus: false,
    retry: false,
    networkMode: 'always',
  });

  const { getNewAccessToken } = useToken(() => {
    refetch();
  });
  const sortedNotifications = notifications?.notifications.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  let content: ReactNode;

  if (isLoading) {
    content = <h1>loading...</h1>;
  } else if (isError) {
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
        onClick={() => getNewAccessToken()}
      >
        Try again
      </Button>
    </Flex>;
  } else if (notifications?.notifications.length === 0) {
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
    content = (
      <Flex gap="1.5rem" direction="column" p="0 1.7rem">
        <Text
          fontFamily="openSans"
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          fontSize="1.2rem"
          fontWeight="400"
          color={textTheme}
        >
          Last 30 days activity
        </Text>
        {sortedNotifications?.map((notification, index) => (
          <Fragment key={index}>
            <NotificationCard notification={notification} />
          </Fragment>
        ))}
      </Flex>
    );
  }

  return <Box>{content}</Box>;
}

export default Notification;
