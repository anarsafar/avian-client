/* eslint-disable no-nested-ternary */
import { RepeatIcon, SmallAddIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { NotificationI } from '@/schemas/notification';
import formatDateLabel from '@/utils/formatDate';

function NotificationCard({ notification }: { notification: NotificationI }) {
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const darkerText = useColorModeValue('rgba(0, 0, 0, 0.70)', '#eee');

  const API_KEY = import.meta.env.VITE_GEOLOCATION_KEY;
  const query = `latitude=${notification.location?.latitude}&longitude=${notification.location?.longitude}`;
  const API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode';
  const requestURL = `${API_URL}?${query}&localityLanguage=en&key=${API_KEY}`;

  const fetchGeoLocation = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data: locationInfo, isError: locationError } = useQuery({
    queryKey: ['geo-data', requestURL],
    queryFn: () => fetchGeoLocation(requestURL),
    refetchOnWindowFocus: false,
    retry: false,
    networkMode: 'always',
    enabled: !!notification.location,
  });

  const displayLocation =
    notification.location && !locationError
      ? `near to ${locationInfo?.city} ${locationInfo?.countryName}`
      : '';

  return (
    <Flex
      fontFamily="openSans"
      lineHeight="1.8rem"
      letterSpacing="0.16px"
      gap="1rem"
    >
      <Flex
        w="3.3rem"
        h="3rem"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        bg={
          notification.type === 'reset'
            ? '#ADDFFF'
            : notification.type === 'login'
            ? '#FFFFAD'
            : 'C8E6C9'
        }
      >
        {notification.type === 'reset' ? (
          <RepeatIcon fontSize="1.2rem" color="#004680" />
        ) : notification.type === 'login' ? (
          <UnlockIcon fontSize="1.2rem" color="#807600" />
        ) : (
          <SmallAddIcon fontSize="1.2rem" color="#1B5E20" />
        )}
      </Flex>
      <Box>
        <Text
          as="h1"
          fontSize="1.3rem"
          fontWeight={600}
          textTransform="capitalize"
          color={darkerText}
        >
          {notification.type === 'login' ? 'Recent Login' : 'Reset Password'}
        </Text>
        <Text fontSize="1.1rem" fontWeight="400" color={textTheme} maxW="27rem">
          {notification.type === 'login'
            ? `There was a recent login to you account ${formatDateLabel(
                String(notification.timestamp)
              )} from ${notification.browserInfo} ${displayLocation}`
            : 'Your password has been restored successfully'}
        </Text>
      </Box>
    </Flex>
  );
}

export default NotificationCard;
