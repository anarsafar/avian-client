import {
  Flex,
  Heading,
  Skeleton,
  Spinner,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

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

export function SkeletonLoading() {
  return (
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
}
