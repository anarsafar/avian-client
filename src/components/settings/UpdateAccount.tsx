import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  SlideFade,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import CustomInput from '@/components/auth/CustomInput';
import {
  UpdateUserInterface,
  UpdateUserValidate,
} from '@/schemas/user/update.schema';
import { UserInterface } from '@/schemas/user/user.schema';

import usePersist, { StorageType } from '@/hooks/common/usePersist';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import useCustomToast from '@/hooks/custom/useCustomToast';

interface PropTypes {
  isOpen: boolean;
  handleSetttingPreferences: (
    type: 'account' | 'notifications' | 'darkMode'
  ) => void;
}

function UpdateAccount({ isOpen, handleSetttingPreferences }: PropTypes) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserInterface>({
    resolver: zodResolver(UpdateUserValidate),
  });

  const { getPersistedData, persistData } = usePersist();
  const user = getPersistedData<UserInterface>('user', StorageType.Local);
  const token = getPersistedData<{ accessToken: string } | undefined>(
    'access-token',
    StorageType.Local
  );

  const bgTheme = useColorModeValue('bg-light', 'bg-dark');
  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const errorTheme = useColorModeValue('red.300', 'red.400');

  const toast = useCustomToast();

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserInterface) =>
      api<SuccessResponse, UpdateUserInterface>(
        data,
        'user',
        RequestType.Patch,
        token?.accessToken
      ),
    mutationKey: ['update-user'],
    onSuccess: (res, newUserData) => {
      const newUser = { ...user, userInfo: newUserData };
      persistData(newUser, 'user', StorageType.Local);
      toast(false, 'Profile info updated', res);
    },
    onError: (error: ErrorResponse) =>
      toast(true, 'Profile update fail', error),
    retry: false,
    networkMode: 'always',
  });

  useEffect(() => {
    setValue('username', user?.userInfo.username);
    setValue('name', user?.userInfo.name);
  }, [user, setValue]);

  return (
    <SlideFade
      in={isOpen}
      unmountOnExit
      style={{ zIndex: 10, position: 'absolute', top: '6.2rem' }}
      offsetY="0"
      offsetX="1rem"
    >
      <Box bg={bgTheme} w="28rem" h="calc(100vh - 11rem)" p="2.2rem">
        <Flex id="header" justifyContent="space-between" alignItems="center">
          <Text
            as="h1"
            fontFamily="openSans"
            fontSize="1.4rem"
            fontWeight={400}
            lineHeight="1.8rem"
            letterSpacing="0.16px"
            color={textTheme}
          >
            Edit your info
          </Text>
          <Flex
            onClick={() => handleSetttingPreferences('account')}
            justifyContent="center"
            alignItems="center"
            as="button"
            border="1px solid"
            borderColor={iconTheme}
            borderRadius="50%"
            w="2rem"
            h="2rem"
            p="4px"
            cursor="pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 9L9 3M3 3L9 9"
                stroke={iconTheme}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Flex>
        </Flex>
        <FormControl mt="2.2rem">
          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color={textTheme}
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            marginBottom="0.8rem"
          >
            User Name
          </FormLabel>
          <CustomInput<UpdateUserInterface>
            type="text"
            id="username"
            placeholder="enter your username"
            errors={errors}
            register={register}
            isAuth
          />
          <Text
            fontFamily="openSans"
            fontSize="1rem"
            fontWeight="300"
            color={errorTheme}
            height="1.4rem"
            position="relative"
            top="3px"
            textAlign="right"
          >
            {errors.username?.message?.toString()}
          </Text>
          <FormLabel
            fontSize="1.2rem"
            fontFamily="openSans"
            color={textTheme}
            lineHeight="1.6rem"
            fontWeight={600}
            letterSpacing="0.16px"
            mt="1.8rem"
            marginBottom="0.8rem"
          >
            Display Name
          </FormLabel>
          <CustomInput<UpdateUserInterface>
            type="text"
            id="name"
            placeholder="enter your display name"
            errors={errors}
            register={register}
            isAuth
          />
          <Text
            fontFamily="openSans"
            fontSize="1rem"
            fontWeight="300"
            color={errorTheme}
            height="1.4rem"
            position="relative"
            top="3px"
            textAlign="right"
          >
            {errors.name?.message?.toString()}
          </Text>
          <Button
            onClick={handleSubmit((data) => updateUser(data))}
            isLoading={isPending}
            loadingText="Saving..."
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
            update
          </Button>
        </FormControl>
      </Box>
    </SlideFade>
  );
}

export default UpdateAccount;
