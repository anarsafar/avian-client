/* eslint-disable no-underscore-dangle */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import useContact from '@/hooks/contact/useContact';
import { ContactInterface } from '@/utils/contact.interface';

interface ModalInterface {
  modalType: 'delete' | 'block';
  modalHeader: string;
}

function useContactModal({ contact }: ContactInterface) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');

  const { isPending, deleteOrBlockContact } = useContact(contact.user._id);

  const modal = ({ modalType, modalHeader }: ModalInterface) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent py="1rem" bg={bg}>
        <ModalHeader
          color={textTheme}
          fontSize="1.6rem"
          fontFamily="openSans"
          borderRadius="1.9rem"
          fontWeight={600}
        >
          {modalHeader}
        </ModalHeader>
        <ModalCloseButton
          fontSize="1rem"
          mt="1.5rem"
          mr="1rem"
          color={textTheme}
          borderRadius="50%"
          border="1px solid"
          p="1.2rem"
          borderColor={textTheme}
        />
        <ModalBody
          fontSize="1.3rem"
          fontFamily="openSans"
          color={textTheme}
          fontWeight={400}
        >
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="unstyled"
            mr={3}
            onClick={onClose}
            h="auto"
            bg="violet-2"
            p="0.7rem 1rem"
            lineHeight="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            color="white"
            _hover={{
              bg: 'violet-3',
            }}
          >
            Close
          </Button>
          <Button
            bg="#FF7961"
            p="1.6rem"
            lineHeight="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            color="white"
            _hover={{
              bg: '#FF5F44',
            }}
            isLoading={isPending}
            loadingText="deleting..."
            onClick={async () => {
              await deleteOrBlockContact({ action: modalType });
              onClose();
            }}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { modal, isOpen, onClose, onOpen };
}

export default useContactModal;
