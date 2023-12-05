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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import arrowIcon from '@assets/layout/arrow.svg';
import passwordIcon from '@assets/layout/icons8-password-94.png';

import useCustomToast from '@/components/CustomToast';
import CustomInput from '@/components/auth/CustomInput';

import {
  PasswordValidate,
  PasswordValidateInterface,
} from '@/schemas/reset.schemas';

import { ConfirmationBaseInterface } from '@/schemas/confirmaton.schema';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

import usePersist, { StorageType } from '@/hooks/usePersist';

function ResetPassword() {
  const { getPersistedData } = usePersist();
  const navigate = useNavigate();
  const toast = useCustomToast();

  const [email, setEmail] = useState<string | undefined>(() => {
    const data = getPersistedData<ConfirmationBaseInterface>(
      'verification-data',
      StorageType.Session
    );
    if (data) {
      return data.email;
    }
    return undefined;
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PasswordValidateInterface>({
    resolver: zodResolver(PasswordValidate),
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    const data = getPersistedData<ConfirmationBaseInterface>(
      'verification-data',
      StorageType.Session
    );

    setEmail(data?.email);
    setValue('email', data ? data.email : '');
  }, [email, getPersistedData, setValue]);

  const { mutateAsync: changePassword, isPending } = useMutation({
    mutationFn: (data: PasswordValidateInterface) =>
      api<SuccessResponse, PasswordValidateInterface>(
        data,
        'reset-password',
        RequestType.Patch
      ),
    mutationKey: ['change-password'],
    onSuccess: (successData) => {
      navigate('/auth/signin');
      toast(false, 'Reset success', successData);
    },
    onError: (error: ErrorResponse) => {
      reset();
      toast(true, 'Recover Error', error);
    },
    networkMode: 'always',
    retry: false,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset password" />
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
            <Image src={passwordIcon} />
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
            Reset your password
          </Heading>
          <Heading
            as="h2"
            fontFamily="fredoka"
            fontSize={{ base: '1.5rem', sm: '1.5rem' }}
            color="#fff"
            fontWeight="300"
            mb="4rem"
            textAlign="center"
            w={{ base: 'auto', sm: '30rem' }}
          >
            Your new password must be different from previously used password
          </Heading>
          <FormControl width={{ base: '25rem', sm: '32rem' }}>
            <Flex direction="column" alignItems="center">
              <input {...register('email', { value: email })} type="hidden" />
              <CustomInput<PasswordValidateInterface>
                type="password"
                id="password"
                placeholder="Enter your new password"
                errors={errors}
                register={register}
              />
              <Text
                alignSelf="start"
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
              <CustomInput<PasswordValidateInterface>
                type="password"
                id="confirmPassword"
                placeholder="Confirm your new password"
                mt="0.8rem"
                errors={errors}
                register={register}
              />
              <Text
                fontFamily="openSans"
                fontSize="1rem"
                fontWeight="300"
                alignSelf="start"
                color="red.300"
                height="1.4rem"
                position="relative"
                top="3px"
                textAlign="right"
              >
                {errors.confirmPassword?.message?.toString()}
              </Text>
              <Button
                mt="1.5rem"
                isDisabled={email === undefined}
                isLoading={isPending}
                loadingText="Submitting"
                onClick={handleSubmit((data) => changePassword(data))}
                padding="2rem 5rem"
                backgroundColor="violet-2"
                color="white"
                fontSize="1.2rem"
                fontFamily="openSans"
                fontWeight={400}
                lineHeight="1.6rem"
                letterSpacing="0.16px"
                borderRadius="8px"
                w="15rem"
                _hover={{
                  background: 'violet-1',
                }}
              >
                Change
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
}

export default ResetPassword;
