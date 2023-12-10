import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import logo from '@assets/logos/bird gradient.svg';
import google from '@assets/social/icons8-google.svg';
import facebook from '@assets/social/icons8-facebook.svg';
import github from '@assets/social/icons8-github.svg';

import SocialButton from '@/components/auth/SocialButton';
import useCustomToast from '@/components/common/CustomToast';
import CustomInput from '@/components/auth/CustomInput';

import api, { ErrorResponse, RequestType } from '@/api';
import { LoginInterface, LoginValidate } from '@/schemas/auth.schemas';
import usePersist, { StorageType } from '@/hooks/common/usePersist';

interface AccessToken {
  accessToken: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: zodResolver(LoginValidate),
  });

  const navigate = useNavigate();
  const toast = useCustomToast();
  const { persistData } = usePersist();
  const text = useColorModeValue('gray-4', 'text-dark');

  const { mutateAsync: logIn, isPending } = useMutation({
    mutationFn: (data: LoginInterface) =>
      api<AccessToken, LoginInterface>(data, 'auth/login', RequestType.Post),
    mutationKey: ['login'],
    onSuccess: (accessToken) => {
      persistData<AccessToken>(accessToken, 'access-token', StorageType.Local);
      navigate('/');
    },
    onError: (error: ErrorResponse) => {
      toast(true, 'Error during sign up', error);
      reset();
    },
    retry: false,
    networkMode: 'always',
  });

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="Avian login page" />
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
            color={text}
            fontSize="1.6rem"
            fontFamily="openSans"
            fontWeight="600"
            marginBottom="1.4rem"
          >
            Welcome back
          </Heading>
          <Heading
            as="h2"
            color={text}
            fontFamily="openSans"
            fontSize="1.4rem"
            fontWeight="300"
            lineHeight="1.8rem"
            letterSpacing="0.16px"
            marginBottom="2.4rem"
          >
            Sign in to start using messaging!
          </Heading>
          <FormControl>
            <FormLabel
              fontSize="1.2rem"
              fontFamily="openSans"
              color={text}
              lineHeight="1.6rem"
              fontWeight={600}
              letterSpacing="0.16px"
              marginBottom="0.8rem"
            >
              Email
            </FormLabel>
            <CustomInput<LoginInterface>
              type="email"
              id="email"
              placeholder="enter your email"
              errors={errors}
              register={register}
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
              color={text}
              lineHeight="1.6rem"
              fontWeight={600}
              letterSpacing="0.16px"
              marginBottom="0.8rem"
            >
              Password
            </FormLabel>
            <CustomInput<LoginInterface>
              type="password"
              id="password"
              placeholder="enter your password"
              errors={errors}
              register={register}
            />
            <Flex mt="4px">
              <Link
                display="block"
                height="1.4rem"
                fontFamily="openSans"
                fontSize="1rem"
                fontWeight="300"
                as={BrowserLink}
                to="/auth/recover-account"
                color="violet-2"
              >
                Forgot Password?
              </Link>
              <Text
                pt="1px"
                flexGrow="1"
                flexBasis="50%"
                fontFamily="openSans"
                fontSize="1rem"
                fontWeight="300"
                color="red.300"
                lineHeight="1rem"
                height="1.4rem"
                textAlign="right"
              >
                {errors.password?.message?.toString()}
              </Text>
            </Flex>
            <Button
              onClick={handleSubmit((data) => logIn(data))}
              isLoading={isPending}
              loadingText="Signing in..."
              marginTop="1.4rem"
              mb="2.4rem"
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
              _hover={{
                background: 'violet-1',
              }}
            >
              Sign in
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
            <SocialButton icon={google} isDisabled={isPending} />
            <SocialButton icon={facebook} isDisabled={isPending} />
            <SocialButton icon={github} isDisabled={isPending} />
          </Flex>
          <Text
            fontFamily="openSans"
            color={text}
            fontSize="1.2rem"
            fontWeight="400"
            textAlign="center"
          >
            Do you have an account ?
            <Link as={BrowserLink} to="/auth/signup" ms="5px" color="violet-2">
              Sign up
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
