import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as BrowserLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import google from '@assets/social-icons/icons8-google.svg';
import facebook from '@assets/social-icons/icons8-facebook.svg';
import github from '@assets/social-icons/icons8-github.svg';

import SocialButton from '@/components/auth/SocialButton';
import CustomInput from '@/components/auth/CustomInput';

import useCustomToast from '@/hooks/custom/useCustomToast';
import usePersist, { StorageType } from '@/hooks/store/usePersist';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import { SignupInterface, SignupValidate } from '@/schemas/user/auth.schemas';
import { ConfirmationBaseInterface } from '@/schemas/user/confirmaton.schema';

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
  const errorColor = useColorModeValue('red.300', 'red.400');
  const [isSocialPending, setSocialPending] = useState<boolean>(false);

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
      toast('error', 'Error during sign up', error);
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
          <Box>
            <svg
              width="40"
              height="40"
              viewBox="0 0 69 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.79"
                d="M14.8976 17.9823C14.639 16.2432 14.2743 14.2884 14.0871 13.6383C13.46 11.46 12.4779 9.89251 10.696 8.22559C9.56206 7.16485 9.59881 7.1552 12.2116 7.82767C17.0774 9.08004 19.9608 11.1111 22.2275 14.8828C22.5954 15.4949 22.7205 15.8195 22.6037 15.8584C22.5073 15.8905 21.5817 16.4834 20.5467 17.1759C18.8947 18.2813 18.1933 18.8143 15.8765 20.7247L15.3678 21.1442L14.8976 17.9823Z"
                fill="url(#paint0_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M22.5435 14.5251C21.1023 12.0888 19.0679 10.1894 16.5662 8.94486C14.7941 8.06325 13.9405 7.7791 11.3762 7.21714C6.54471 6.15832 5.08235 5.90062 1.49603 5.47603L0 5.29892L0.712412 5.0791C1.27112 4.90668 2.19317 4.85792 4.9868 4.85302L8.54878 4.84678L9.33242 4.25109C11.1261 2.88757 13.5847 2.06842 15.8834 2.06842C18.0472 2.06842 19.5898 2.64412 20.8462 3.9205C21.7413 4.82979 22.3604 6.01808 23.2962 8.62248C24.227 11.2133 24.8434 12.5192 25.4916 13.2736L25.9988 13.8639L25.6765 14.0751C25.4992 14.1913 24.8422 14.5437 24.2165 14.8583L23.0789 15.4303L22.5435 14.5251Z"
                fill="url(#paint1_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M29.3508 12.3638C29.5912 12.115 33.6178 9.80097 36.4748 8.26991C48.9621 1.57803 59.0502 -1.11899 65.8318 0.421475C67.1405 0.718744 69.0481 1.37897 68.9991 1.51768C68.9777 1.57821 67.3893 2.84814 65.4694 4.33978L61.9787 7.05185L60.1264 6.94669C56.6465 6.74908 50.0391 6.83542 48.0869 7.104C43.4533 7.74147 36.045 9.76748 31.203 11.7214C29.1393 12.5542 29.1809 12.5398 29.3508 12.3638Z"
                fill="url(#paint2_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M35.2138 53.8833C32.8672 46.9757 30.8513 42.0813 29.6826 40.4539C29.3681 40.016 28.9446 39.6595 28.4248 39.3951C27.2783 38.8119 25.7987 37.7295 24.5401 36.5531C23.1585 35.2618 21.2397 32.9906 21.3972 32.8331C21.6204 32.6098 23.6445 32.3838 24.5759 32.4781C29.3146 32.9579 33.2179 36.399 34.976 41.6467C35.7166 43.8573 35.846 45.0206 35.8986 49.9416C35.925 52.41 36.0172 54.9375 36.1034 55.5581C36.1897 56.1787 36.2444 56.7022 36.2251 56.7214C36.2057 56.7405 35.7506 55.4635 35.2138 53.8833Z"
                fill="url(#paint3_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M35.9326 43.815C35.8695 43.384 35.5942 42.3605 35.3209 41.5406C33.8473 37.1202 30.9053 33.9349 27.0712 32.6088C26.0421 32.2528 25.7374 32.2139 23.9366 32.2087C22.6936 32.2051 21.7619 32.2692 21.4642 32.3787C21.0293 32.5387 20.963 32.526 20.7245 32.2362C20.0563 31.4245 20.059 31.4027 20.9948 30.0364C22.2258 28.2392 22.296 28.1869 23.7192 28.0086C26.4873 27.6617 29.2656 27.8373 32.7989 28.5823L34.2774 28.8941L34.8297 30.0498C36.1017 32.7112 36.4836 36.4873 36.1355 42.9601C36.0525 44.5045 36.0408 44.5536 35.9326 43.815Z"
                fill="url(#paint4_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M32.2716 28.1259C29.4057 27.5148 27.4246 27.3604 24.9921 27.5585C23.8806 27.649 22.9453 27.6971 22.9136 27.6655C22.882 27.6338 23.3117 27.2148 23.8686 26.7343C26.8672 24.147 30.0705 22.7713 34.7105 22.0778C36.4721 21.8145 43.1043 21.6226 42.8864 21.8412C42.6942 22.034 34.2474 28.5742 34.2182 28.5528C34.2055 28.5436 33.3296 28.3514 32.2716 28.1259Z"
                fill="url(#paint5_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M19.0022 29.7445C18.5609 29.0591 17.959 28.0604 17.6648 27.5249L17.1298 26.5515L17.9686 25.6968C23.3501 20.2134 31.2741 16.8094 41.2975 15.6749C43.5917 15.4153 49.9037 15.1617 50.692 15.2974L51.2312 15.3903L47.3438 18.4131L43.4563 21.4359L40.4534 21.4408C38.8018 21.4434 36.7501 21.514 35.894 21.5976C31.4643 22.0299 27.6825 23.3479 24.8749 25.4378C23.4899 26.4687 21.411 28.6631 20.5883 29.9624C20.2357 30.5194 19.9151 30.9785 19.8759 30.9828C19.8368 30.987 19.4436 30.4297 19.0022 29.7444V29.7445Z"
                fill="url(#paint6_linear_46_40)"
              />
              <path
                opacity="0.79"
                d="M16.5943 25.4757C16.0988 24.3766 15.8828 23.7173 15.6708 22.6567L15.4713 21.6594L16.0707 21.1052C18.5999 18.7667 22.1915 16.374 26.1505 14.3902C32.6638 11.1264 42.0973 8.19897 48.7142 7.38827C50.6956 7.14549 57.7089 7.09586 60.2502 7.30662L61.5137 7.4114L56.7125 11.129L51.9112 14.8466L48.1825 14.937C41.0217 15.1104 36.0651 15.8309 31.203 17.4052C26.0971 19.0585 21.7989 21.5462 18.2107 24.9249L16.9016 26.1575L16.5943 25.4757Z"
                fill="url(#paint7_linear_46_40)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_46_40"
                  x1="0.299187"
                  y1="0.15053"
                  x2="61.137"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_46_40"
                  x1="0.299098"
                  y1="0.150516"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_46_40"
                  x1="0.299083"
                  y1="0.150508"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_46_40"
                  x1="0.299127"
                  y1="0.150472"
                  x2="61.1369"
                  y2="48.2806"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_46_40"
                  x1="0.299124"
                  y1="0.150526"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_46_40"
                  x1="0.299084"
                  y1="0.150521"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_46_40"
                  x1="0.299116"
                  y1="0.150519"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_46_40"
                  x1="0.299087"
                  y1="0.150492"
                  x2="61.1369"
                  y2="48.2807"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C96F2" />
                  <stop offset="1" stopColor="#162DD5" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
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
              isAuth
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color={errorColor}
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
              isAuth
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color={errorColor}
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
              isAuth
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color={errorColor}
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
              isAuth
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color={errorColor}
              height="1.4rem"
              position="relative"
              top="3px"
              textAlign="right"
            >
              {errors.confirmPassword?.message?.toString()}
            </Text>
            <Button
              isLoading={isPending || isSocialPending}
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
            <SocialButton
              icon={google}
              type="google"
              isDisabled={isPending || isSocialPending}
              changePending={setSocialPending}
            />
            <SocialButton
              icon={facebook}
              type="facebook"
              isDisabled={isPending || isSocialPending}
              changePending={setSocialPending}
            />
            <SocialButton
              icon={github}
              type="github"
              isDisabled={isPending || isSocialPending}
              changePending={setSocialPending}
            />
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
