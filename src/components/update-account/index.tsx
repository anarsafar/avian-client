import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VisuallyHiddenInput,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

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

  const { updateUser, isPending, deleteUser, isDeleting } = useUserOperations();
  const { modal, onOpen } = useConfiramtion();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const user = useUser((state) => state.user);

  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const errorTheme = useColorModeValue('red.300', 'red.400');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');

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

  return (
    <Box>
      {modal({
        action: () => deleteUser(),
        isLoading: isDeleting,
        modalHeader: 'Delete Account',
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
        <Box
          onClick={() => closeMenu()}
          as="button"
          borderColor={iconTheme}
          cursor="pointer"
        >
          <CloseIcon fontSize="0.8rem" />
        </Box>
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
        <Flex as={Button} variant="unstyled" h="auto" gap="1rem">
          <Popover arrowSize={10} placement="right">
            <PopoverTrigger>
              <Avatar
                name={user?.userInfo.name}
                src={
                  avatar ? URL.createObjectURL(avatar) : user?.userInfo.avatar
                }
                border="2px solid"
                borderColor={bgTheme}
                size="xl"
                _hover={{
                  border: '2px solid',
                  borderColor: 'violet-2',
                }}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent w="7rem" bg={bgTheme}>
                <PopoverArrow bg={bgTheme} />
                <PopoverBody>
                  <Flex justifyContent="center" alignItems="center" gap="1rem">
                    <EditIcon
                      color="violet-2"
                      fontSize="2rem"
                      as="button"
                      cursor="pointer"
                      onClick={handleAvatar}
                    />
                    <ViewIcon
                      fontSize="2rem"
                      as="button"
                      cursor="pointer"
                      color="violet-2"
                      onClick={() => setOpen(true)}
                    />
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            plugins={[Zoom]}
            styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .7)' } }}
            slides={[{ src: user?.userInfo.avatar as string }]}
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
