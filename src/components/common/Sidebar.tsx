/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReactNode, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCustomToast from './CustomToast';
import usePersist, { StorageType } from '@/hooks/common/usePersist';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import { ValidateContact, ValidateContactType } from '@/schemas/contact.schema';

interface SidebarProps {
  children: (contactName: string) => ReactNode | ReactNode;
  sidebarIcon: JSX.Element;
  header: 'Messages' | 'Contacts';
  type: 'conversation' | 'contacts';
}

function Sidebar({ children, sidebarIcon, header }: SidebarProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidateContactType>({
    resolver: zodResolver(ValidateContact),
  });

  const text = useColorModeValue('gray-4', 'text-dark');
  const input = useColorModeValue('input-light', 'input-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholder = useColorModeValue('gray-5', 'text-darker');
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const errorColor = useColorModeValue('red.300', 'red.400');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();
  const { getPersistedData } = usePersist();

  const { current: accessToken } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const queryClient = useQueryClient();
  //   const queryCache = queryClient.getQueryCache();
  //   const contactCache = queryCache.find({
  //     queryKey: ['contacts', accessToken?.accessToken],
  //   });

  //   console.log(contactCache?.state.data);
  const [contactName, setContactName] = useState<string>('');

  const { mutateAsync: addContact, isPending } = useMutation({
    mutationFn: (contact: ValidateContactType) =>
      api<SuccessResponse, ValidateContactType>(
        contact,
        `contacts`,
        RequestType.Post,
        accessToken?.accessToken
      ),
    mutationKey: ['add-contact'],
    onSuccess: () => {
      onClose();
      reset();
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error: ErrorResponse) =>
      toast(true, `Error adding contact`, error),
    retry: false,
    networkMode: 'always',
  });

  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="1.2rem" p="1.6rem" bg={bg}>
        <ModalHeader
          fontSize="1.8rem"
          fontWeight={400}
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          color={text}
        >
          New Contact
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Input
              backgroundColor={input}
              borderRadius="0.9rem"
              mt="1rem"
              type="text"
              p="1.8rem"
              border="none"
              placeholder="Enter email or username..."
              fontFamily="openSans"
              fontSize="1.2rem"
              fontWeight="400"
              lineHeight="1.6rem"
              letterSpacing="0.16px"
              color={text}
              focusBorderColor={logo}
              {...register('contact')}
              _placeholder={{
                fontFamily: 'openSans',
                fontSize: '1.2rem',
                color: placeholder,
                fontWeight: '400',
                lineHeight: '1.6rem',
                letterSpacing: '0.16px',
              }}
            />
            <Text
              fontFamily="openSans"
              fontSize="1rem"
              fontWeight="300"
              color={errorColor}
              height="1.4rem"
              position="relative"
              top="3px"
            >
              {errors.contact?.message?.toString()}
            </Text>
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Adding..."
              onClick={handleSubmit((data) => addContact(data))}
              w="100%"
              p="1.7rem"
              borderRadius="8px"
              mt="1rem"
              fontFamily="openSans"
              fontSize="1.2rem"
              fontWeight="400"
              lineHeight="1.6rem"
              letterSpacing="0.16px"
              bg="violet-2"
              color="white"
              _hover={{
                bg: 'violet-3',
              }}
            >
              Add
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <Box as="section" id="inbox" p="2.2rem 0">
      {modal}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        ms="1.7rem"
        me="2rem"
      >
        <Text
          as="h1"
          fontFamily="openSans"
          fontSize="1.8rem"
          fontWeight={400}
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          color={text}
        >
          {header}
        </Text>
        <Button variant="unstyled" w="1.7rem" h="1.7rem" onClick={onOpen}>
          {sidebarIcon}
        </Button>
      </Flex>
      <Box ms="1.7rem" me="2.7rem">
        <FormControl mt="2.2rem">
          <InputGroup backgroundColor={input} borderRadius="0.9rem">
            <InputLeftElement pointerEvents="none" mt="0.4rem" ms="0.4rem">
              <SearchIcon color={logo} fontSize="1.4rem" />
            </InputLeftElement>
            <Input
              type="text"
              p="1.7rem 1.7rem 1.7rem 3.2rem"
              border="none"
              placeholder="Search..."
              fontFamily="openSans"
              fontSize="1.2rem"
              fontWeight="400"
              lineHeight="1.6rem"
              letterSpacing="0.16px"
              color={text}
              focusBorderColor={logo}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              _placeholder={{
                fontFamily: 'openSans',
                fontSize: '1.2rem',
                color: placeholder,
                fontWeight: '400',
                lineHeight: '1.6rem',
                letterSpacing: '0.16px',
              }}
            />
          </InputGroup>
        </FormControl>
      </Box>
      <Scrollbars style={{ height: 'calc(100vh - 12.5rem)' }} autoHide>
        <Flex direction="column" mt="2rem" me="1rem">
          {children(contactName)}
        </Flex>
      </Scrollbars>
    </Box>
  );
}

export default Sidebar;
