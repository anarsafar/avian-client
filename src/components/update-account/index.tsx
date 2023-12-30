import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  VisuallyHiddenInput,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

import CustomInput from '@/components/auth/CustomInput';
import {
  UpdateUserInterface,
  UpdateUserValidate,
} from '@/schemas/user/update.schema';
import { UserInterface } from '@/schemas/user/user.schema';
import usePersist, { StorageType } from '@/hooks/common/usePersist';
import useCustomToast from '@/hooks/custom/useCustomToast';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

interface UpdateAccountProps {
  onClose: (type: 'account' | 'notifications' | 'darkMode') => void;
}

function UpdateAccount({ onClose }: UpdateAccountProps) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UpdateUserInterface>({
    resolver: zodResolver(UpdateUserValidate),
  });

  const { getPersistedData, persistData } = usePersist();
  const [avatar, setAvatar] = useState<File | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const user = getPersistedData<UserInterface>('user', StorageType.Local);
  const token = getPersistedData<{ accessToken: string } | undefined>(
    'access-token',
    StorageType.Local
  );

  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const errorTheme = useColorModeValue('red.300', 'red.400');

  const toast = useCustomToast();

  const handleAvatar = () => {
    avatarRef?.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setAvatar(file);
      setValue('avatar', file);
      trigger('avatar');
    }
  };

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserInterface) => {
      const formData = new FormData();

      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }
      if (data.name) {
        formData.append('name', data.name);
      }
      if (data.username) {
        formData.append('username', data.username);
      }

      return api<SuccessResponse, FormData>(
        formData,
        'user',
        RequestType.Patch,
        token?.accessToken
      );
    },
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

  const setDefaults = useCallback(() => {
    setValue('username', user?.userInfo.username);
    setValue('name', user?.userInfo.name);
    setValue('avatar', user?.userInfo.avatar);
  }, [setValue, user]);

  const closeMenu = () => {
    onClose('account');
    setDefaults();
  };

  useEffect(() => {
    setDefaults();
  }, [setDefaults]);

  return (
    <Box>
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
          onClick={() => closeMenu()}
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
      <Box>
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          ref={avatarRef}
          onChange={handleAvatarChange}
        />
        <FormLabel
          fontSize="1.2rem"
          fontFamily="openSans"
          color={textTheme}
          lineHeight="1.6rem"
          fontWeight={600}
          letterSpacing="0.16px"
          mt="2.2rem"
          marginBottom="0.8rem"
        >
          Avatar
        </FormLabel>
        <Flex
          as={Button}
          variant="unstyled"
          h="auto"
          onClick={handleAvatar}
          gap="1rem"
        >
          <Avatar
            name={user?.userInfo.name}
            src={avatar ? URL.createObjectURL(avatar) : user?.userInfo.avatar}
            size="xl"
            _hover={{
              transition: 'all 0.4s',
              transform: 'scale(0.9)',
            }}
          >
            <AvatarBadge boxSize="2rem" border="none">
              <EditIcon color="violet-2" fontSize="1.7rem" />
            </AvatarBadge>
          </Avatar>
          <Text
            alignSelf="flex-end"
            fontFamily="openSans"
            fontSize="1rem"
            fontWeight={400}
            lineHeight="1.8rem"
            letterSpacing="0.16px"
          >
            Upload image size under 5mb
          </Text>
        </Flex>
      </Box>
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
  );
}

export default UpdateAccount;
