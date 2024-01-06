import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

function NoChatSelected() {
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');

  return (
    <Flex
      lineHeight="1.8rem"
      fontFamily="openSans"
      letterSpacing="0.16px"
      color={textTheme}
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Box textAlign="center">
        <Flex justifyContent="center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9H4.07333C4.35187 9.00007 4.62488 9.07769 4.86178 9.22417C5.09869 9.37065 5.29013 9.58019 5.41467 9.82933L5.58533 10.1707C5.70992 10.4199 5.90147 10.6295 6.1385 10.776C6.37554 10.9225 6.64869 11.0001 6.92733 11H9.07267C9.35131 11.0001 9.62446 10.9225 9.8615 10.776C10.0985 10.6295 10.2901 10.4199 10.4147 10.1707L10.5853 9.82933C10.7099 9.58009 10.9015 9.37048 11.1385 9.22399C11.3755 9.07751 11.6487 8.99995 11.9273 9H14.5M1.5 9.22533V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V9.22533C14.5 9.076 14.4773 8.92733 14.4333 8.78467L12.8267 3.55867C12.7323 3.25216 12.5422 2.98397 12.2842 2.79343C12.0263 2.6029 11.714 2.50006 11.3933 2.5H4.60733C4.28663 2.50006 3.97439 2.6029 3.71643 2.79343C3.45847 2.98397 3.26836 3.25216 3.174 3.55867L1.56667 8.78467C1.52262 8.92742 1.50015 9.07594 1.5 9.22533Z"
              stroke={iconTheme}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Flex>
        <Text fontSize="1.4rem" fontWeight={600} mt="1.8rem">
          No Conversations
        </Text>
        <Text fontSize="1.2rem" fontWeight={400} mt="0.8rem">
          click plus icon to add a new one or select from conversation list
        </Text>
      </Box>
    </Flex>
  );
}

export default NoChatSelected;
