import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import arrowIcon from '@assets/layout/arrow.svg';
import UserIcon from '@assets/layout/icons8-account-94.png';

import useCustomToast from '@/components/CustomToast';
import CustomInput from '@/components/auth/CustomInput';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import { EmailValidate, EmailValidateInterface } from '@/schemas/reset.schemas';
import { ConfirmationBaseInterface } from '@/schemas/confirmaton.schema';

import usePersist, { StorageType } from '@/hooks/usePresist';

function RecoverAccount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailValidateInterface>({
    resolver: zodResolver(EmailValidate),
  });

  const { persistData } = usePersist();
  const navigate = useNavigate();
  const toast = useCustomToast();

  const { mutateAsync: sendVerificationEmail, isPending } = useMutation({
    mutationFn: (formData: EmailValidateInterface) =>
      api<SuccessResponse, ConfirmationBaseInterface>(
        { email: formData.email, confirmationType: 'password' },
        'confirmation/send-verification',
        RequestType.Post
      ),
    mutationKey: ['recover-account'],
    onSuccess: (data, variables) => {
      persistData<ConfirmationBaseInterface>(
        {
          email: variables.email,
          confirmationType: 'password',
        },
        'verification-data',
        StorageType.Session
      );

      navigate('/verify');
    },
    onError: (error: ErrorResponse) => {
      toast(true, 'Recover Error', error);
      reset();
    },
    retry: false,
    networkMode: 'always',
  });

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
          <FormControl width={{ base: '25rem', sm: '32rem' }}>
            <Flex direction="column" alignItems="center">
              <CustomInput<EmailValidateInterface>
                type="email"
                id="email"
                placeholder="enter your email"
                errors={errors}
                register={register}
              />
              <Text
                alignSelf="flex-start"
                my="0.5rem"
                fontFamily="openSans"
                fontSize="1rem"
                fontWeight="300"
                color="red.500"
                lineHeight="1rem"
                height="1.4rem"
              >
                {errors.email?.message?.toString()}
              </Text>
              <Button
                onClick={handleSubmit((data) => sendVerificationEmail(data))}
                isLoading={isPending}
                loadingText="sending..."
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
            </Flex>
          </FormControl>
          <Text
            fontFamily="openSans"
            fontWeight={400}
            fontSize="1.2rem"
            letterSpacing="0.16px"
            color="#fff"
            mt="1.5rem"
          />
        </Flex>
      </Flex>
    </>
  );
}

export default RecoverAccount;
