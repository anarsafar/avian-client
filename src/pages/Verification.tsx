import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import emailLogo from '@assets/layout/icons8-email-94.png';
import arrowIcon from '@assets/layout/arrow.svg';

import OTPInput from '@/components/OTPInput';
import confirmation from '@/api/confirmation';
import { ErrorResponse } from '@/interfaces/response.interface';
import useCustomToast from '@/components/CustomToast';
import CountDown from '@/components/auth/CountDown';
import { EmailValidateInterface } from '@/schemas/confirmaton.schema';

function Verificaton(): JSX.Element {
  const [OTP, setOTP] = useState<string>('');
  const [isError, setError] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const toast = useCustomToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const getUserEmail = queryClient.getQueryData(['user-email']) as
      | string
      | undefined;
    const userEmailSession = sessionStorage.getItem('user-email');

    if (getUserEmail) {
      setUserEmail(getUserEmail);
    } else if (userEmailSession) {
      queryClient.setQueryData(['user-email'], userEmailSession);

      setUserEmail(userEmailSession);
    }
  }, [queryClient]);

  const { data: confirmationTimestamp, refetch: refetchExpirationTime } =
    useQuery({
      queryKey: ['confirmation-time-stamp', userEmail],
      queryFn: () => confirmation.getExpiration({ email: userEmail }),
      enabled: userEmail.length > 0,
      refetchOnWindowFocus: false,
      retry: false,
    });

  const mutationVerify = useMutation({
    mutationFn: (data: string) =>
      confirmation.confirmUser({
        confirmationCode: data,
        confirmationType: 'email',
      }),
    mutationKey: ['confirmation-email'],
    onSuccess: (successData) => {
      toast(false, 'Confirmation success', successData);
      navigate('/auth/signin');
    },
    onError: (error: ErrorResponse) => {
      setError(true);
      setTimeout(() => setError(false), 3000);
      toast(true, 'Confirmation Error', error);
    },
  });

  const mutationResend = useMutation({
    mutationFn: (email: EmailValidateInterface) =>
      confirmation.resendEmail(email),
    mutationKey: ['resend-email'],
    onSuccess: (successData) => {
      refetchExpirationTime();
      toast(false, 'Resend success', successData);
    },
    onError: (error: ErrorResponse) => toast(true, 'Resend Error', error),
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
            onClick={() => navigate('/auth/signup')}
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
            We have sent a code to {userEmail || 'your email'}
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
            isDisabled={confirmationTimestamp && OTP.length < 6}
            padding={{ base: '1.8rem 5rem', sm: '2rem 5rem' }}
            onClick={() => mutationVerify.mutate(OTP)}
            isLoading={mutationVerify.isPending}
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
                userEmail && mutationResend.mutate({ email: userEmail })
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
