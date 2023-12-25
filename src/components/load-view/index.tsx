import { Flex, Heading, Spinner, useColorModeValue } from '@chakra-ui/react';

export function RouteLoading() {
  return (
    <Flex justify="center" align="center" w="100vw" h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}

export function Loading() {
  const text = useColorModeValue('gray-4', 'text-dark');

  return (
    <Flex justify="center" align="center" w="100vw" h="100vh" p="1rem">
      <Flex direction="column" alignItems="center">
        <Heading
          textAlign="center"
          as="h1"
          color={text}
          fontSize="1.6rem"
          fontFamily="openSans"
          fontWeight="600"
          marginBottom="1rem"
        >
          Sending verification code
        </Heading>
        <Heading
          textAlign="center"
          as="h1"
          color={text}
          fontSize="1.6rem"
          fontFamily="openSans"
          fontWeight="600"
          marginBottom="1.4rem"
        >
          Please wait...
        </Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </Flex>
  );
}
