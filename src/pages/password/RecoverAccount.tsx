import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import arrowIcon from '@assets/layout/arrow.svg';
import UserIcon from '@assets/layout/icons8-account-94.png';

function RecoverAccount() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Recover your account</title>
        <meta
          name="description"
          content="A recover page for resetting password"
        />
      </Helmet>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        background="linear-gradient(180deg, #C1CAFF 0%, #5C6BC0 100%)"
        height="100vh"
        padding="2.5rem"
      >
        <Flex
          direction="column"
          alignItems="center"
          position="relative"
          borderRadius="1rem"
          padding={{ base: '2rem', sm: '3rem' }}
          backdropFilter="blur(21.5px)"
          background="linear-gradient(89deg, rgba(242, 242, 242, 0.54) 0.78%, rgba(229, 229, 229, 0.28) 99.34%)"
          zIndex={2}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="unstyled"
            position="absolute"
            top="-4rem"
            left="-1rem"
          >
            <Image src={arrowIcon} />
          </Button>
          <Box w="10rem">
            <Image src={UserIcon} />
          </Box>
          <Heading
            as="h1"
            fontFamily="fredoka"
            fontSize={{ base: '2.5rem', sm: '4rem' }}
            color="#fff"
            fontWeight="500"
            mt="2rem"
            mb="1rem"
          >
            Recover your account
          </Heading>
          <Heading
            as="h2"
            fontFamily="fredoka"
            fontSize={{ base: '1.5rem', sm: '1.5rem' }}
            color="#fff"
            fontWeight="300"
            mb="4rem"
            textAlign="center"
          >
            Enter your email to get verification code
          </Heading>
          <Input
            width={{ base: '25rem', sm: '32rem' }}
            type="email"
            placeholder="Email"
            padding="2rem"
            backgroundColor="#fff"
            border="none"
            borderRadius="0.5rem"
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight="400"
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            color="gray-4"
            mb="2rem"
            _placeholder={{
              fontFamily: 'openSans',
              fontWeight: '400',
              lineHeight: '1.6rem',
              letterSpacing: '0.16px',
              fontSize: '1.2rem',
              color: 'gray-4',
            }}
          />
          <Button
            padding="2rem 5rem"
            backgroundColor="violet-2"
            color="white"
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight={400}
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            borderRadius="8px"
            _hover={{
              background: 'violet-1',
            }}
          >
            Send
          </Button>
          <Text
            fontFamily="openSans"
            fontWeight={400}
            fontSize="1.2rem"
            letterSpacing="0.16px"
            color="#fff"
            mt="1.5rem"
          >
            Didn't recieve code?{' '}
            <Link href="value" as="button" color="violet-3">
              Resend Code
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default RecoverAccount;
