import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VisuallyHiddenInput,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import CustomInput from '@/components/auth/CustomInput';
import {
  UpdateUserInterface,
  UpdateUserValidate,
} from '@/schemas/user/update.schema';

import useUser from '@/hooks/store/useUser';
import useUserOperations from '@/hooks/user';
import useConfiramtion from '@/hooks/custom/useConfirmation';

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

  const {
    updateUser,
    isPending,
    deleteUser,
    isDeleting,
    deleteAvatar,
    isDeletingAvatar,
    isDeleteSuccess,
  } = useUserOperations();
  const { modal, onOpen } = useConfiramtion();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const user = useUser((state) => state.user);

  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const errorTheme = useColorModeValue('red.300', 'red.400');

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

  useEffect(() => {
    if (isDeleteSuccess) {
      setAvatar(null);
    }
  }, [isDeleteSuccess]);

  return (
    <Box>
      {modal({
        action: () => deleteUser(),
        isLoading: isDeleting,
        modalHeader: 'Delete',
      })}
      {modal({
        action: () => deleteAvatar(),
        isLoading: isDeletingAvatar,
        modalHeader: 'Delete',
      })}
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
          as="button"
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          onClick={closeMenu}
          border="1px solid"
          borderColor={iconTheme}
          borderRadius="50%"
          w="2rem"
          h="2rem"
          p="4px"
          position="absolute"
          right="1.6rem"
          top="1.6rem"
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
        <Flex h="auto" gap="1rem">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  variant="unstyled"
                  transform={isOpen ? 'scale(1.1)' : 'scale(1)'}
                  transition="transform 0.3s ease-in-out"
                  w="5rem"
                  h="5rem"
                  _hover={{
                    transform: `scale(1.1)`,
                  }}
                >
                  <Avatar
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : user?.userInfo.avatar
                    }
                    bg="gray.500"
                    w="100%"
                    h="100%"
                  />
                </MenuButton>
                <MenuList w="10rem" zIndex={20}>
                  <MenuItem
                    fontSize="1.2rem"
                    fontFamily="openSans"
                    color={textTheme}
                    fontWeight={600}
                    onClick={handleAvatar}
                  >
                    <EditIcon
                      color="violet-2"
                      fontSize="1.5rem"
                      as="button"
                      cursor="pointer"
                    />
                    <Text ms="1rem">Edit</Text>
                  </MenuItem>
                  {(user?.userInfo.avatar || avatar) && (
                    <MenuItem
                      fontSize="1.2rem"
                      fontFamily="openSans"
                      color={textTheme}
                      fontWeight={600}
                      onClick={() => setOpen(true)}
                    >
                      <ViewIcon
                        fontSize="1.5rem"
                        as="button"
                        cursor="pointer"
                        color="violet-2"
                      />
                      <Text ms="1rem">View</Text>
                    </MenuItem>
                  )}
                  {user?.userInfo.avatar && (
                    <MenuItem
                      fontSize="1.2rem"
                      fontFamily="openSans"
                      fontWeight={600}
                      onClick={onOpen}
                    >
                      <DeleteIcon
                        fontSize="1.5rem"
                        as="button"
                        cursor="pointer"
                        color="red.400"
                      />
                      <Text ms="1rem" color="red-3">
                        Delete
                      </Text>
                    </MenuItem>
                  )}
                </MenuList>
              </>
            )}
          </Menu>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            plugins={[Zoom]}
            styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .7)' } }}
            slides={[
              {
                src: avatar
                  ? URL.createObjectURL(avatar)
                  : (user?.userInfo.avatar as string),
              },
            ]}
            zoom={{
              scrollToZoom: true,
              maxZoomPixelRatio: 5,
            }}
          />

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
          Update Info
        </Button>
        <Button
          onClick={onOpen}
          marginTop="1.4rem"
          w="100%"
          padding="2rem"
          backgroundColor="red-3"
          color="white"
          fontSize="1.2rem"
          fontFamily="openSans"
          fontWeight={400}
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          borderRadius="8px"
          _hover={{
            background: 'red-1',
          }}
        >
          Delete Account
        </Button>
      </FormControl>
    </Box>
  );
}

export default UpdateAccount;
