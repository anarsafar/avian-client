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
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import logo from '@assets/logos/bird gradient.svg';
import google from '@assets/social/icons8-google.svg';
import facebook from '@assets/social/icons8-facebook.svg';
import github from '@assets/social/icons8-github.svg';

import SocialButton from '@/components/auth/SocialButton';
import CustomInput from '@/components/auth/CustomInput';
import useCustomToast from '@/components/common/CustomToast';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import { SignupInterface, SignupValidate } from '@/schemas/auth.schemas';
import { ConfirmationBaseInterface } from '@/schemas/confirmaton.schema';

import usePersist, { StorageType } from '@/hooks/common/usePersist';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupInterface>({
    resolver: zodResolver(SignupValidate),
  });

  const navigate = useNavigate();
  const toast = useCustomToast();
  const { persistData } = usePersist();
  const text = useColorModeValue('gray-4', 'text-dark');

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: (data: SignupInterface) =>
      api<SuccessResponse, SignupInterface>(
        data,
        'auth/signup',
        RequestType.Post
      ),
    mutationKey: ['signup'],
    onSuccess: (response, variables) => {
      persistData<ConfirmationBaseInterface>(
        {
          email: variables.email,
          confirmationType: 'email',
        },
        'verification-data',
        StorageType.Session
      );
      navigate('/verify');
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
            color={text}
            fontSize="1.6rem"
            fontFamily="openSans"
            fontWeight="600"
            marginBottom="1rem"
          >
            Get started with Avian
          </Heading>
          <Heading
            as="h2"
            color={text}
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
              color={text}
              lineHeight="1.6rem"
              fontWeight={600}
              letterSpacing="0.16px"
              marginBottom="0.8rem"
            >
              Email
            </FormLabel>
            <CustomInput<SignupInterface>
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
              Name
            </FormLabel>
            <CustomInput<SignupInterface>
              type="text"
              id="name"
              placeholder="enter your name"
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
              {errors.name?.message?.toString()}
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
            <CustomInput<SignupInterface>
              type="password"
              id="password"
              placeholder="enter your password"
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
              {errors.password?.message?.toString()}
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
              Confirm Password
            </FormLabel>
            <CustomInput<SignupInterface>
              type="password"
              id="confirmPassword"
              placeholder="confirm your password"
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
              {errors.confirmPassword?.message?.toString()}
            </Text>
            <Button
              isLoading={isPending}
              loadingText="Submitting"
              onClick={handleSubmit((data) => signUp(data))}
              marginTop="1.4rem"
              type="submit"
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
