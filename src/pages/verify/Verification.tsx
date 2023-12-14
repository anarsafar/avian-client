import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import emailLogo from '@assets/layout/icons8-email-94.png';
import arrowIcon from '@assets/layout/arrow.svg';

import OTPInput from '@/components/auth/OTPInput';
import useCustomToast from '@/components/common/CustomToast';
import CountDown from '@/components/auth/CountDown';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import {
  ConfirmationBaseInterface,
  ConfirmationInterface,
} from '@/schemas/confirmaton.schema';

import usePersist, { StorageType } from '@/hooks/common/usePersist';

function Verificaton(): JSX.Element {
  const { getPersistedData } = usePersist();
  const toast = useCustomToast();
  const navigate = useNavigate();

  const [OTP, setOTP] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);
  const [verifyData, setVerifyData] = useState<
    ConfirmationBaseInterface | undefined
  >(() =>
    getPersistedData<ConfirmationBaseInterface>(
      'verification-data',
      StorageType.Session
    )
  );

  useEffect(() => {
    const data = getPersistedData<ConfirmationBaseInterface>(
      'verification-data',
      StorageType.Session
    );
    setVerifyData(data);
  }, [verifyData, getPersistedData]);

  const { data: confirmationTimestamp, refetch: refetchExpirationTime } =
    useQuery({
      queryKey: ['confirmation-time-stamp', verifyData],
      queryFn: () =>
        api<{ confirmationTimestamp: string }, ConfirmationBaseInterface>(
          verifyData as ConfirmationBaseInterface,
          'confirmation/get-expiration',
          RequestType.Post
        ),
      enabled: typeof verifyData !== undefined,
      refetchOnWindowFocus: false,
      retry: false,
      networkMode: 'always',
    });

  const { mutateAsync: verifyEmail, isPending } = useMutation({
    mutationFn: (data: ConfirmationInterface) =>
      api<SuccessResponse, ConfirmationInterface>(
        data,
        'confirmation',
        RequestType.Post
      ),
    mutationKey: ['confirmation-email'],
    onSuccess: (successData) => {
      toast(false, 'Confirmation success', successData);
      if (verifyData?.confirmationType === 'email') {
        navigate('/auth/signin');
      } else {
        navigate('/reset-password');
      }
    },
    onError: (error: ErrorResponse) => {
      setError(true);
      setTimeout(() => setError(false), 3000);
      toast(true, 'Confirmation Error', error);
    },
    networkMode: 'always',
    retry: false,
  });

  const { mutateAsync: resendVerification } = useMutation({
    mutationFn: (data: ConfirmationBaseInterface) =>
      api<SuccessResponse, ConfirmationBaseInterface>(
        data,
        'confirmation/send-verification',
        RequestType.Post
      ),
    mutationKey: ['resend-email'],
    onSuccess: (successData) => {
      refetchExpirationTime();
      toast(false, 'Resend success', successData);
    },
    onError: (error: ErrorResponse) => toast(true, 'Resend Error', error),
    networkMode: 'always',
    retry: false,
  });

  const handleOTPChange = (data: string) => setOTP(data);

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
        padding="0 2rem"
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
            <Image src={emailLogo} alt="email icon" loading="eager" />
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
            textAlign="center"
          >
            We have sent a code to {verifyData?.email || 'your email'}
          </Heading>
          <OTPInput length={6} onChange={handleOTPChange} isError={isError} />

          {confirmationTimestamp && (
            <CountDown
              confirmationTimestamp={
                confirmationTimestamp?.confirmationTimestamp
              }
            />
          )}

          <Button
            mt={!confirmationTimestamp ? '3.8rem' : 'auto'}
            isDisabled={confirmationTimestamp === undefined || OTP.length < 6}
            padding={{ base: '1.8rem 5rem', sm: '2rem 5rem' }}
            onClick={() =>
              verifyEmail({
                confirmationCode: OTP,
                ...(verifyData as ConfirmationBaseInterface),
              })
            }
            isLoading={isPending}
            loadingText="Submitting..."
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
            fontSize="1.2rem"
            letterSpacing="0.16px"
            color="#fff"
            mt="1rem"
          >
            Didn't recieve code?{' '}
            <Button
              variant="unstyled"
              fontFamily="openSans"
              fontWeight={400}
              fontSize="1.2rem"
              letterSpacing="0.16px"
              color="#fff"
              mb="2.4px"
              _hover={{
                color: 'violet-1',
              }}
              onClick={() =>
                verifyData?.email && resendVerification(verifyData)
              }
            >
              Resend Code
            </Button>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Verificaton;
