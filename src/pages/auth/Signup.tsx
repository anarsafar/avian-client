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
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import logo from '@assets/logos/bird gradient.svg';
import google from '@assets/social/icons8-google.svg';
import facebook from '@assets/social/icons8-facebook.svg';
import github from '@assets/social/icons8-github.svg';

import SocialButton from '@/components/auth/SocialButton';
import { SignupValidate } from '@/schemas/auth.schemas';

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupValidate),
  });

  return (
    <>
      <Helmet>
        <title>Sign up</title>
        <meta name="description" content="Avian signup page" />
      </Helmet>
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
              id="email"
              placeholder="enter your email"
              padding="2rem"
              backgroundColor="#F8F8F9"
              border="1px solid"
              borderColor={errors.email ? 'red.300' : '#fff'}
              borderRadius="0.5rem"
              fontSize="1.2rem"
              fontFamily="openSans"
              fontWeight="400"
              lineHeight="1.6rem"
              letterSpacing="0.16px"
              color="gray-4"
              _placeholder={{
                fontFamily: 'openSans',
                fontWeight: '400',
                lineHeight: '1.6rem',
                letterSpacing: '0.16px',
                fontSize: '1.2rem',
                color: 'gray-4',
              }}
              {...register('email')}
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color="red.300"
              height="1.4rem"
              position="relative"
              top="3px"
              textAlign="right"
            >
              {errors.email?.message?.toString()}
            </Text>
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
              id="name"
              placeholder="enter your name"
              padding="2rem"
              backgroundColor="#F8F8F9"
              border={errors.name ? '1px solid' : 'none'}
              borderColor={errors.name ? 'red.300' : '#fff'}
              borderRadius="0.5rem"
              fontSize="1.2rem"
              fontFamily="openSans"
              fontWeight="400"
              lineHeight="1.6rem"
              letterSpacing="0.16px"
              color="gray-4"
              _placeholder={{
                fontFamily: 'openSans',
                fontWeight: '400',
                lineHeight: '1.6rem',
                letterSpacing: '0.16px',
                fontSize: '1.2rem',
                color: 'gray-4',
              }}
              {...register('name')}
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color="red.300"
              height="1.4rem"
              position="relative"
              top="3px"
              textAlign="right"
            >
              {errors.name?.message?.toString()}
            </Text>
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
              id="password"
              placeholder="enter your password"
              padding="2rem"
              backgroundColor="#F8F8F9"
              color="gray-4"
              border={errors.name ? '1px solid' : 'none'}
              borderColor={errors.name ? 'red.300' : '#fff'}
              borderRadius="0.5rem"
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
              {...register('password')}
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color="red.300"
              height="1.4rem"
              position="relative"
              top="3px"
              textAlign="right"
            >
              {errors.password?.message?.toString()}
            </Text>
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
              id="confirmPassword"
              type="password"
              placeholder="confirm your password"
              padding="2rem"
              backgroundColor="#F8F8F9"
              color="gray-4"
              border={errors.name ? '1px solid' : 'none'}
              borderColor={errors.name ? 'red.300' : '#fff'}
              borderRadius="0.5rem"
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
              {...register('confirmPassword')}
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color="red.300"
              height="1.4rem"
              position="relative"
              top="3px"
              textAlign="right"
            >
              {errors.confirmPassword?.message?.toString()}
            </Text>
            <Button
              marginTop="1.4rem"
              type="submit"
              onClick={handleSubmit((d) => console.log(d))}
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
          </FormControl>

          <Flex alignItems="center" color="gray-3" gap="1rem">
            <Divider
              orientation="horizontal"
              borderColor="gray-3"
              variant="dashed"
            />
            <Text
              fontFamily="openSans"
              fontWeight="400"
              fontSize="1.2rem"
              lineHeight="1.6rem"
              letterSpacing="0.16rem"
            >
              or
            </Text>
            <Divider
              orientation="horizontal"
              borderColor="gray-3"
              variant="dashed"
            />
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
    </>
  );
}
