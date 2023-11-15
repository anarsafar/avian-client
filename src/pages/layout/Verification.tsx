/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import emailLogo from '@assets/layout/email.svg';
import arrowIcon from '@assets/layout/arrow.svg';
import OTPInput from '@/components/layout/OTPInput';

function Verificaton(): JSX.Element {
  const handleOTPChange = (otp: string) => otp;
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Verification</title>
        <meta
          name="description"
          content="A verification page for signing up and resetting password"
        />
      </Helmet>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        background="linear-gradient(180deg, #C1CAFF 0%, #5C6BC0 100%)"
        height="100vh"
        padding="1rem"
      >
        <Flex direction="column" alignItems="center" position="absolute">
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
            <Image src={emailLogo} />
          </Box>
          <Heading
            as="h1"
            fontFamily="fredoka"
            fontSize={{ base: '2.5rem', sm: '3.5rem' }}
            color="#fff"
            fontWeight="500"
            mt="2rem"
            mb="0.5rem"
          >
            Verify your email
          </Heading>
          <Heading
            as="h2"
            fontFamily="fredoka"
            fontSize={{ base: '1.5rem', sm: '2rem' }}
            color="#fff"
            fontWeight="300"
            mb="2rem"
          >
            We have sent a code to email@.com
          </Heading>
          <OTPInput length={6} onChange={handleOTPChange} />
          <Text fontFamily="openSans" fontSize="1.2rem" color="#fff" my="2rem">
            Code expires in 3:12
          </Text>

          <Button
            padding="2rem"
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
            Verify
          </Button>
          <Text
            fontFamily="openSans"
            fontWeight={400}
            lineHeight="1.2rem"
            letterSpacing="0.16px"
            color="#fff"
            mt="1rem"
          >
            Didn't recieve code?{' '}
            <Link href="value" as="button" color="gray-3">
              Resend Code
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Verificaton;
