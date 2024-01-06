import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useActiveConversation from '@/hooks/store/useActiveConversation';
import formatLastSeen from '@/utils/formatLastSeen';

interface PropTypes {
  darkerTextColor: string;
  logoColor: string;
}

function ChatHeader({ darkerTextColor, logoColor }: PropTypes) {
  const { activeConversation } = useActiveConversation();
  return (
    <Flex
      fontFamily="openSans"
      w="100%"
      lineHeight="1.8rem"
      letterSpacing="0.16px"
      p="1.6rem 2.4rem"
      alignItems="center"
      gap="1.2rem"
    >
      <Button variant="unstyled" h="auto">
        <Flex alignItems="center" gap="1.2rem">
          <Avatar
            name={activeConversation?.user.userInfo.name}
            src={activeConversation?.user.userInfo.avatar}
            w="3.3rem"
            h="3.3rem"
          />
          <Box>
            <Text
              textAlign="left"
              fontSize="1.3rem"
              fontWeight="600"
              color={darkerTextColor}
              maxW="17rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {activeConversation?.user.userInfo.name}
            </Text>
            <Text
              textAlign="left"
              fontSize="1.1rem"
              fontWeight="300"
              color={darkerTextColor}
              maxW="17rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {activeConversation?.user.online
                ? 'Online'
                : formatLastSeen(activeConversation?.user.lastSeen as string)}
            </Text>
          </Box>
        </Flex>
      </Button>
      <Flex direction="row" alignItems="center" ms="auto" gap="1.2rem">
        <Button variant="unstyled">
          <SearchIcon color={logoColor} fontSize="1.8rem" />
        </Button>

        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill={logoColor}
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default ChatHeader;
