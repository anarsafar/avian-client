import {
  AtSignIcon,
  BellIcon,
  DeleteIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import {
  Avatar,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import useCustomModal from '@/hooks/custom/useConfirmation';
import { ContactInterface } from '@/utils/contact.interface';

function useContactInfo({ contact }: { contact: ContactInterface }) {
  const {
    isOpen: infoIsOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();

  const textTheme = useColorModeValue('rgba(0, 0, 0, 0.60)', 'text-dark');
  const iconTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const secondTextTheme = useColorModeValue('rgba(0, 0, 0, 0.35)', 'text-dark');
  const { modal: deleteContactModal, onOpen: deleteOpen } = useCustomModal({
    contact,
  });

  const { modal: blockContactModal, onOpen: blockOpen } = useCustomModal({
    contact,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contact.user.userInfo?.username).then(() => {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 1000);
    });
  };

  const modal = (
    <Modal isOpen={infoIsOpen} onClose={infoOnClose} isCentered>
      <ModalOverlay />
      <ModalContent position="relative">
        <ModalHeader
          p={0}
          mt="1.6rem"
          ms="1.6rem"
          color={textTheme}
          fontSize="1.8rem"
          fontFamily="openSans"
          fontWeight={400}
          letterSpacing="0.16px"
        >
          Contact Info
        </ModalHeader>
        <Flex
          as="button"
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          onClick={infoOnClose}
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
        <ModalBody p="0">
          <Flex p="1.6rem" gap="1rem" alignItems="center">
            <Avatar
              as="button"
              onClick={() => setOpen(true)}
              w="4rem"
              h="4rem"
              name={contact.user.userInfo.name}
              src={contact.user.userInfo?.avatar}
              _hover={{
                transform: 'scale(1.1)',
                transition: 'all 0.1s linear ',
              }}
            />
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              plugins={[Zoom]}
              styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .7)' } }}
              slides={[{ src: contact.user.userInfo?.avatar }]}
              zoom={{
                scrollToZoom: true,
                maxZoomPixelRatio: 5,
              }}
            />

            <Flex direction="column">
              <Text
                color={textTheme}
                fontSize="1.4rem"
                fontFamily="openSans"
                fontWeight={600}
                lineHeight="1.8rem"
                letterSpacing="0.16px"
                maxW="18rem"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {contact.user.userInfo.name}
              </Text>
              <Text
                color={secondTextTheme}
                fontSize="1.2rem"
                fontFamily="openSans"
                fontWeight={400}
                lineHeight="1.8rem"
                letterSpacing="0.16px"
              >
                last seen yesterday
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <List
            spacing="1.2rem"
            p="1.6rem"
            color={textTheme}
            fontSize="1.4rem"
            fontFamily="openSans"
            fontWeight={400}
            lineHeight="1.8rem"
            letterSpacing="0.16px"
          >
            <Tooltip
              fontSize="1.2rem"
              hasArrow
              placement="top"
              closeOnPointerDown={false}
              closeOnClick={false}
              label={
                isTooltipVisible ? 'Copied to clipboard!' : 'Copy to clipboard'
              }
            >
              <ListItem
                as="button"
                onClick={copyToClipboard}
                value={contact.user.userInfo?.username}
              >
                <ListIcon
                  as={AtSignIcon}
                  color={iconTheme}
                  fontSize="2rem"
                  me="1.2rem"
                />
                {contact.user.userInfo?.username}
              </ListItem>
            </Tooltip>
            <ListItem display="flex">
              <ListIcon
                as={BellIcon}
                color={iconTheme}
                fontSize="2rem"
                me="1.2rem"
              />
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormLabel
                  htmlFor="notifications"
                  mb="0"
                  color={textTheme}
                  fontSize="1.4rem"
                  fontFamily="openSans"
                  fontWeight={400}
                  lineHeight="1.8rem"
                  letterSpacing="0.16px"
                >
                  notifications
                </FormLabel>
                <Switch
                  id="notifications"
                  defaultChecked
                  size="lg"
                  colorScheme="whatsapp"
                />
              </FormControl>
            </ListItem>
          </List>
          <Divider />
          <List
            spacing="1.2rem"
            p="1.6rem"
            color={textTheme}
            fontSize="1.4rem"
            fontFamily="openSans"
            fontWeight={400}
            lineHeight="1.8rem"
            letterSpacing="0.16px"
          >
            <ListItem
              color="red-3"
              as="button"
              w="100%"
              textAlign="left"
              onClick={blockOpen}
            >
              <ListIcon
                as={NotAllowedIcon}
                color="red-3"
                fontSize="2rem"
                me="1.2rem"
              />
              {contact.isBlocked ? 'unblock' : 'block'} contact
            </ListItem>
            <ListItem
              color="red-3"
              w="100%"
              textAlign="left"
              as="button"
              onClick={deleteOpen}
            >
              <ListIcon
                as={DeleteIcon}
                color="red-3"
                fontSize="2rem"
                me="1.2rem"
              />
              delete contact
            </ListItem>
          </List>
        </ModalBody>
      </ModalContent>
      {deleteContactModal({
        modalType: 'delete',
        modalHeader: 'Delete Contact',
      })}
      {blockContactModal({
        modalType: 'block',
        modalHeader: contact.isBlocked ? 'Unblock Contact' : 'Block Contact',
      })}
    </Modal>
  );
  return { infoIsOpen, infoOnOpen, infoOnClose, modal };
}

export default useContactInfo;
