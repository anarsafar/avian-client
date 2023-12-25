/* eslint-disable no-underscore-dangle */
import { DeleteIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import useContactInfo from '@/hooks/contact/useContactInfo';
import { ContactInterface } from '@/utils/contact.interface';
import useCustomModal from '@/hooks/custom/useCustomModal';

interface ContactCardInterface {
  textTheme: string;
  contact: ContactInterface;
}

function ContactCard({
  contact,
  textTheme,
}: ContactCardInterface): JSX.Element {
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');

  const { modal: infoModal, infoOnOpen } = useContactInfo({
    contact,
  });

  const { modal: customModal, onOpen: customOpen } = useCustomModal({
    contact,
  });

  return (
    <Button
      as={Box}
      p="1.7rem 0.8rem 1.6rem 1.8rem"
      borderRadius="0.9rem"
      variant="unstyled"
      height="auto"
      _hover={{
        bg: hoverTheme,
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text
          fontWeight={600}
          lineHeight="1.8rem"
          fontFamily="openSans"
          fontSize="1.2rem"
          color={textTheme}
        >
          {contact.user.userInfo.name}
        </Text>
        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill={iconTheme}
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </MenuButton>
          <MenuList w="18rem">
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              color={textTheme}
              fontWeight={400}
            >
              <EditIcon />
              <Text ms="1rem">Start Converation</Text>
            </MenuItem>
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              color={textTheme}
              fontWeight={400}
              onClick={infoOnOpen}
            >
              <InfoOutlineIcon />
              <Text ms="1rem">Contact Information</Text>
            </MenuItem>
            <MenuItem
              fontSize="1.3rem"
              fontFamily="openSans"
              fontWeight={400}
              onClick={customOpen}
            >
              <DeleteIcon color="red-3" />
              <Text ms="1rem" color="red-3">
                Delete Contact
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {infoModal}
      {customModal({ modalType: 'delete', modalHeader: 'Delete Contact' })}
    </Button>
  );
}

export default ContactCard;
