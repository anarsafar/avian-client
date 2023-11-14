import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';

import logo from '@assets/logos/bird gradient.svg';
import google from '@assets/social/icons8-google.svg';
import facebook from '@assets/social/icons8-facebook.svg';
import github from '@assets/social/icons8-github.svg';

import SocialButton from '@/components/auth/SocialButton';

export default function SignUp() {
  return (
    <Flex
      flexGrow={1.3}
      justifyContent="center"
      alignItems="center"
      flexBasis="0"
    >
      <Box flexBasis={{ base: '28rem', lg: '35rem' }}>
        <Image
          src={logo}
          alt="app logo"
          width="40px"
          height="40px"
          marginBottom="1rem"
        />
        <Heading
          as="h1"
          color="gray-4"
          fontSize="1.6rem"
          fontFamily="openSans"
          fontWeight="600"
          marginBottom="1rem"
        >
          Get started with Avian
        </Heading>
        <Heading
          as="h2"
          color="gray-4"
          fontFamily="openSans"
          fontSize="1.4rem"
          fontWeight="300"
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          marginBottom="2rem"
        >
          Create an account a start messaging now!
        </Heading>
        <FormControl>
          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color="gray-4"
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            marginBottom="0.8rem"
          >
            Email
          </FormLabel>
          <Input
            type="email"
            placeholder="enter your email"
            padding="2rem"
            backgroundColor="#F8F8F9"
            border="none"
            borderRadius="0.5rem"
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight="400"
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            color="gray-4"
            mb="1.4rem"
            _placeholder={{
              fontFamily: 'openSans',
              fontWeight: '400',
              lineHeight: '1.6rem',
              letterSpacing: '0.16px',
              fontSize: '1.2rem',
              color: 'gray-4',
            }}
          />

          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color="gray-4"
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            marginBottom="0.8rem"
          >
            Name
          </FormLabel>
          <Input
            type="text"
            placeholder="enter your name"
            padding="2rem"
            backgroundColor="#F8F8F9"
            border="none"
            borderRadius="0.5rem"
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight="400"
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            color="gray-4"
            mb="1.4rem"
            _placeholder={{
              fontFamily: 'openSans',
              fontWeight: '400',
              lineHeight: '1.6rem',
              letterSpacing: '0.16px',
              fontSize: '1.2rem',
              color: 'gray-4',
            }}
          />
          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color="gray-4"
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            marginBottom="0.8rem"
          >
            Password
          </FormLabel>
          <Input
            type="password"
            placeholder="enter your password"
            padding="2rem"
            backgroundColor="#F8F8F9"
            color="gray-4"
            border="none"
            borderRadius="0.5rem"
            mb="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            fontWeight="400"
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            _placeholder={{
              fontFamily: 'openSans',
              fontSize: '1.2rem',
              color: 'gray-4',
              fontWeight: '400',
              lineHeight: '1.6rem',
              letterSpacing: '0.16px',
            }}
          />
          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color="gray-4"
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            marginBottom="0.8rem"
          >
            Confirm Password
          </FormLabel>
          <Input
            type="password"
            placeholder="confirm your password"
            padding="2rem"
            backgroundColor="#F8F8F9"
            color="gray-4"
            border="none"
            borderRadius="0.5rem"
            mb="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            fontWeight="400"
            lineHeight="1.6rem"
            letterSpacing="0.16px"
            _placeholder={{
              fontFamily: 'openSans',
              fontSize: '1.2rem',
              color: 'gray-4',
              fontWeight: '400',
              lineHeight: '1.6rem',
              letterSpacing: '0.16px',
            }}
          />
        </FormControl>
        <Button
          w="100%"
          padding="2rem"
          backgroundColor="violet-2"
          color="white"
          fontSize="1.2rem"
          fontFamily="openSans"
          fontWeight={400}
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          borderRadius="8px"
          mb="2.4rem"
          _hover={{
            background: 'violet-1',
          }}
        >
          Next
        </Button>

        <Flex alignItems="center" color="gray-3" gap="1rem">
          <Divider orientation="horizontal" borderColor="gray-3" />
          <Text
            fontFamily="openSans"
            fontWeight="400"
            fontSize="1.2rem"
            lineHeight="1.6rem"
            letterSpacing="0.16rem"
          >
            or
          </Text>
          <Divider orientation="horizontal" borderColor="gray-3" />
        </Flex>
        <Flex gap="1rem" mt="2.4rem" mb="1.3rem" justifyContent="center">
          <SocialButton icon={google} />
          <SocialButton icon={facebook} />
          <SocialButton icon={github} />
        </Flex>

        <Text
          fontFamily="openSans"
          color="gray-4"
          fontSize="1.2rem"
          fontWeight="400"
          textAlign="center"
        >
          Already have an account ?
          <Link as={BrowserLink} to="/auth/signin" ms="5px" color="violet-2">
            Sign in
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
