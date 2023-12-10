import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';

interface SidebarProps {
  children: ReactNode;
  sidebarIcon: string;
  header: 'Messages' | 'Contacts';
}

function Sidebar({ children, sidebarIcon, header }: SidebarProps): JSX.Element {
  const text = useColorModeValue('gray-4', 'text-dark');
  const input = useColorModeValue('input-light', 'input-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');
  const placeholder = useColorModeValue('gray-5', 'text-darker');

  return (
    <Box as="section" id="inbox" p="2.2rem 0">
      <Flex justifyContent="space-between" alignItems="center" mx="1.7rem">
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
        <Button variant="unstyled" w="1.7rem" h="1.7rem">
          <Image src={sidebarIcon} w="100%" h="100%" />
        </Button>
      </Flex>
      <Box mx="1.7rem">
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
        <Flex direction="column" mt="2rem">
          {children}
        </Flex>
      </Scrollbars>
    </Box>
  );
}

export default Sidebar;
