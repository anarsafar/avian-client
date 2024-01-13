/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import useAddContact from '@/hooks/contact/useAddContact';
import useAddConversation from '@/hooks/conversations/useAddConversation';
import SearchInput from './SearchInput';

interface SidebarProps {
  children: (contactName: string) => ReactNode | ReactNode;
  header: 'Messages' | 'Contacts';
  type: 'conversation' | 'contacts';
}

function Sidebar({ children, header, type }: SidebarProps): JSX.Element {
  const text = useColorModeValue('gray-4', 'text-dark');
  const input = useColorModeValue('input-light', 'input-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholder = useColorModeValue('gray-4', 'text-darker');
  const { addConversationOpen, addConversationModal } = useAddConversation();
  const [contactName, setContactName] = useState<string>('');

  const { modal, onOpen } = useAddContact({
    textColor: text,
    inputColor: input,
    logoColor: logo,
    placeholderColor: placeholder,
  });

  return (
    <Box as="section" id="inbox" p="2.2rem 0">
      {modal}
      {addConversationModal}
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
        <Button
          variant="unstyled"
          w="1.7rem"
          h="1.7rem"
          onClick={() =>
            type === 'contacts' ? onOpen() : addConversationOpen()
          }
        >
          {type === 'contacts' ? (
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M10.6667 4V6M10.6667 6V8M10.6667 6H12.6667M10.6667 6H8.66669M7.16669 3.25C7.16669 3.54547 7.10849 3.83806 6.99542 4.11104C6.88234 4.38402 6.71661 4.63206 6.50768 4.84099C6.29875 5.04992 6.05071 5.21566 5.77772 5.32873C5.50474 5.4418 5.21216 5.5 4.91669 5.5C4.62121 5.5 4.32863 5.4418 4.05565 5.32873C3.78267 5.21566 3.53463 5.04992 3.3257 4.84099C3.11676 4.63206 2.95103 4.38402 2.83796 4.11104C2.72489 3.83806 2.66669 3.54547 2.66669 3.25C2.66669 2.65326 2.90374 2.08097 3.3257 1.65901C3.74765 1.23705 4.31995 1 4.91669 1C5.51342 1 6.08572 1.23705 6.50768 1.65901C6.92963 2.08097 7.16669 2.65326 7.16669 3.25V3.25ZM0.666687 11.8233V11.75C0.666687 10.6228 1.11445 9.54183 1.91148 8.7448C2.70851 7.94777 3.78952 7.5 4.91669 7.5C6.04386 7.5 7.12486 7.94777 7.92189 8.7448C8.71892 9.54183 9.16669 10.6228 9.16669 11.75V11.8227C7.88367 12.5954 6.41376 13.0025 4.91602 13C3.36202 13 1.90802 12.57 0.666687 11.8227V11.8233Z"
                  stroke="#8E99F3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          ) : (
            <Box>
              <svg
                width="17"
                height="17"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97338 2.4915L11.1126 1.36616C11.3501 1.13171 11.6722 1 12.008 1C12.3439 1 12.666 1.13171 12.9035 1.36616C13.1409 1.60062 13.2744 1.9186 13.2744 2.25016C13.2744 2.58173 13.1409 2.89971 12.9035 3.13416L5.73258 10.2135C5.37557 10.5657 4.93531 10.8246 4.45156 10.9668L2.63841 11.5002L3.17864 9.71016C3.32266 9.23259 3.58492 8.79795 3.94172 8.4455L9.97338 2.4915ZM9.97338 2.4915L11.7548 4.25016M10.7419 8.8335V12.0002C10.7419 12.398 10.5818 12.7795 10.2968 13.0608C10.0119 13.3421 9.62543 13.5002 9.22246 13.5002H2.13195C1.72898 13.5002 1.34251 13.3421 1.05757 13.0608C0.772628 12.7795 0.612549 12.398 0.612549 12.0002V5.00016C0.612549 4.60234 0.772628 4.22081 1.05757 3.9395C1.34251 3.6582 1.72898 3.50016 2.13195 3.50016H5.33956"
                  stroke="#8E99F3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          )}
        </Button>
      </Flex>
      <Box ms="1.7rem" me="2.7rem">
        <FormControl mt="2.2rem">
          <SearchInput value={contactName} onChange={setContactName} />
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
