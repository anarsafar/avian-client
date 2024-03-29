import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface ModalInterface {
  modalHeader: string;
  action: () => void;
  isLoading: boolean;
}

function useConfiramtion() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const initialRef = useRef(null);

  const modal = ({ action, modalHeader, isLoading }: ModalInterface) => (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="lg"
      initialFocusRef={initialRef}
    >
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
        <Flex
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
          onClick={onClose}
          position="absolute"
          right="1.6rem"
          top="2rem"
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
            bg="violet-3"
            p="0.7rem 1rem"
            lineHeight="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            border="1px solid transparent"
            _focus={{
              border: '1px solid white',
            }}
            color="white"
            _hover={{
              bg: 'violet-1',
            }}
          >
            Close
          </Button>
          <Button
            bg="red-3"
            p="1.6rem"
            lineHeight="1.8rem"
            fontFamily="openSans"
            fontSize="1.2rem"
            color="white"
            _hover={{
              bg: 'red-1',
            }}
            border="1px solid transparent"
            _focus={{
              border: '1px solid white',
            }}
            ref={initialRef}
            isLoading={isLoading}
            onClick={async () => {
              await action();
              onClose();
            }}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { modal, onOpen, onClose };
}

export default useConfiramtion;
