import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import usePersist, { StorageType } from '@/hooks/store/usePersist';
import useCustomToast from '@/hooks/custom/useCustomToast';
import {
  ValidateContact,
  ValidateContactType,
} from '@/schemas/contact/contact.schema';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

interface ContactProps {
  textColor: string;
  inputColor: string;
  logoColor: string;
  placeholderColor: string;
}

function useAddContact({
  textColor,
  inputColor,
  logoColor,
  placeholderColor,
}: ContactProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidateContactType>({
    resolver: zodResolver(ValidateContact),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('bg-light', 'bg-dark');
  const errorColor = useColorModeValue('red.300', 'red.400');
  const toast = useCustomToast();
  const { getPersistedData } = usePersist();
  const queryClient = useQueryClient();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

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
      queryClient.invalidateQueries({
        queryKey: ['user', accessToken?.accessToken],
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error: ErrorResponse) =>
      toast('error', `Error adding contact`, error),
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
      <ModalContent p="1.6rem" bg={bgColor}>
        <ModalHeader
          p="0"
          mb="1.6rem"
          fontSize="1.8rem"
          fontWeight={400}
          lineHeight="1.8rem"
          letterSpacing="0.16px"
          color={textColor}
        >
          New Contact
        </ModalHeader>
        <ModalBody p="0">
          <FormControl>
            <Input
              backgroundColor={inputColor}
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
              color={textColor}
              focusBorderColor={logoColor}
              {...register('contact')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit((data) => addContact(data))();
                }
              }}
              _placeholder={{
                fontFamily: 'openSans',
                fontSize: '1.2rem',
                color: placeholderColor,
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
  return { onOpen, modal };
}

export default useAddContact;
