import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  InfoOutlineIcon,
  MoonIcon,
  RepeatIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';

import logout from '@assets/common/logout.svg';

import Animate from '@/components/common/Animate';
import Sidebar from '@/components/common/Sidebar';
import { Loading } from '@/components/loading';
import UpdateAccount from '@/components/update-account';

import useLogout from '@/hooks/auth/useLogout';
import useSendVerification from '@/hooks/auth/useSendVerification';
import usePersist, { StorageType } from '@/hooks/store/usePersist';
import useUser from '@/hooks/store/useUser';

import Inbox from '@/view/messages/conversations/Inbox';
import ChatView from '@/view/messages/chat';
import Contacts from '@/view/contacts/Contacts';
import Settings from '@/view/settings';
import useSocket from '@/hooks/store/useSocket';
import NoChatSelected from '@/view/messages/chat/NoChatSelected';
import useActiveConversation from '@/hooks/store/useActiveConversation';

function AppLayout() {
  useSocket();
  const { getPersistedData, persistData } = usePersist();
  const { isOpen: isSettingsOpen, onOpen, onClose } = useDisclosure();
  const user = useUser((state) => state.user);

  const activeTabIndex = getPersistedData<number>(
    'activeTabIndex',
    StorageType.Session
  );

  const [activeTab, setActiveTab] = useState(() => Number(activeTabIndex) || 0);
  const { activeConversation } = useActiveConversation();
  const { logoutHandler } = useLogout();
  const { sendVerificationEmail, isPending } = useSendVerification();

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const text = useColorModeValue('gray-4', 'text-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');

  const handleTabChange = (index: number) => {
    persistData(index, 'activeTabIndex', StorageType.Session);
    setActiveTab(index);
  };

  const getFillColor = (tabIndex: number) =>
    tabIndex === activeTab ? '#8E99F3' : logo;

  if (isPending) {
    return <Loading />;
  }

  const updateInfo = (
    <Modal isOpen={isSettingsOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="2rem" bg={bg}>
          <UpdateAccount onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <Helmet>
        <title>Avian</title>
        <meta name="description" content="Avian app" />
      </Helmet>
      <Box
        h="100vh"
        background="linear-gradient(180deg, #C1CAFF 0%, #5C6BC0 100%)"
      >
        <Tabs
          height="100vh"
          maxW="140rem"
          margin="auto"
          variant="unstyled"
          index={activeTab}
          onChange={handleTabChange}
          isManual
          isLazy
          lazyBehavior="unmount"
          bg={bg}
        >
          <Grid
            height="100%"
            templateAreas={`"nav sidebar chatbox"`}
            gridTemplateColumns="6rem 30rem 1fr"
          >
            <GridItem area="nav">
              <Flex
                direction="column"
                alignItems="center"
                padding="3rem 1.7rem"
                height="100%"
              >
                <Button width="3.5rem" mb="3.2rem" variant="unstyled">
                  <svg
                    width="27"
                    height="23"
                    viewBox="0 0 69 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="bird">
                      <g id="g32310">
                        <path
                          id="path32294"
                          opacity="0.79"
                          d="M14.8976 17.9823C14.639 16.2432 14.2743 14.2884 14.0871 13.6383C13.46 11.46 12.4779 9.89251 10.696 8.22559C9.56206 7.16485 9.59881 7.1552 12.2116 7.82767C17.0774 9.08004 19.9608 11.1111 22.2275 14.8828C22.5954 15.4949 22.7205 15.8195 22.6036 15.8584C22.5073 15.8905 21.5817 16.4834 20.5467 17.1759C18.8947 18.2813 18.1933 18.8143 15.8765 20.7247L15.3678 21.1442L14.8976 17.9823Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32296"
                          opacity="0.79"
                          d="M22.5435 14.5251C21.1023 12.0887 19.0679 10.1894 16.5662 8.94486C14.7941 8.06325 13.9405 7.7791 11.3762 7.21714C6.54471 6.15832 5.08235 5.90062 1.49603 5.47603L0 5.29892L0.712412 5.0791C1.27112 4.90668 2.19317 4.85792 4.9868 4.85302L8.54878 4.84678L9.33242 4.25109C11.1261 2.88757 13.5847 2.06842 15.8834 2.06842C18.0472 2.06842 19.5898 2.64412 20.8462 3.9205C21.7413 4.82979 22.3604 6.01808 23.2962 8.62248C24.227 11.2133 24.8434 12.5192 25.4916 13.2736L25.9988 13.8639L25.6765 14.0751C25.4992 14.1913 24.8422 14.5437 24.2165 14.8583L23.0789 15.4303L22.5435 14.5251Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32298"
                          opacity="0.79"
                          d="M29.3509 12.3638C29.5913 12.115 33.6179 9.80097 36.4749 8.26991C48.9622 1.57803 59.0504 -1.11899 65.8319 0.421475C67.1406 0.718744 69.0482 1.37897 68.9992 1.51768C68.9778 1.57821 67.3894 2.84814 65.4695 4.33978L61.9788 7.05185L60.1266 6.94669C56.6466 6.74908 50.0392 6.83542 48.087 7.10399C43.4534 7.74147 36.0451 9.76748 31.2032 11.7214C29.1394 12.5542 29.1811 12.5397 29.3509 12.3638Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32300"
                          opacity="0.79"
                          d="M35.2138 53.8833C32.8672 46.9758 30.8513 42.0814 29.6826 40.4539C29.3681 40.0161 28.9446 39.6595 28.4248 39.3951C27.2783 38.812 25.7987 37.7295 24.5401 36.5531C23.1585 35.2619 21.2397 32.9906 21.3972 32.8331C21.6204 32.6099 23.6445 32.3839 24.5759 32.4782C29.3146 32.958 33.2179 36.3991 34.976 41.6467C35.7166 43.8573 35.846 45.0207 35.8986 49.9416C35.925 52.4101 36.0172 54.9375 36.1034 55.5582C36.1897 56.1788 36.2444 56.7023 36.2251 56.7215C36.2057 56.7406 35.7506 55.4635 35.2138 53.8833Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32302"
                          opacity="0.79"
                          d="M35.9325 43.815C35.8694 43.384 35.5941 42.3605 35.3207 41.5406C33.8472 37.1202 30.9052 33.9349 27.071 32.6088C26.042 32.2528 25.7373 32.2139 23.9365 32.2087C22.6935 32.2051 21.7618 32.2692 21.4641 32.3787C21.0292 32.5387 20.9629 32.526 20.7244 32.2362C20.0562 31.4245 20.0589 31.4027 20.9947 30.0364C22.2256 28.2392 22.2959 28.1869 23.719 28.0086C26.4872 27.6617 29.2655 27.8373 32.7988 28.5823L34.2772 28.8941L34.8296 30.0498C36.1015 32.7112 36.4835 36.4873 36.1354 42.9601C36.0523 44.5045 36.0407 44.5536 35.9325 43.815Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32304"
                          opacity="0.79"
                          d="M32.2718 28.1259C29.4058 27.5148 27.4247 27.3604 24.9923 27.5585C23.8808 27.649 22.9454 27.6971 22.9138 27.6655C22.8821 27.6338 23.3118 27.2148 23.8687 26.7343C26.8674 24.147 30.0706 22.7713 34.7106 22.0778C36.4722 21.8145 43.1044 21.6226 42.8865 21.8412C42.6943 22.034 34.2475 28.5742 34.2183 28.5528C34.2056 28.5436 33.3297 28.3514 32.2718 28.1259Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32306"
                          opacity="0.79"
                          d="M19.0021 29.7445C18.5607 29.0591 17.9589 28.0604 17.6646 27.5249L17.1296 26.5515L17.9684 25.6968C23.35 20.2134 31.274 16.8094 41.2974 15.6749C43.5916 15.4153 49.9035 15.1617 50.6919 15.2974L51.2311 15.3903L47.3436 18.4131L43.4562 21.4359L40.4533 21.4408C38.8016 21.4434 36.7499 21.514 35.8939 21.5976C31.4641 22.0299 27.6824 23.3479 24.8748 25.4378C23.4897 26.4687 21.4108 28.6631 20.5882 29.9624C20.2356 30.5194 19.915 30.9785 19.8758 30.9828C19.8367 30.987 19.4435 30.4297 19.0021 29.7444V29.7445Z"
                          fill="#C5C5C6"
                        />
                        <path
                          id="path32308"
                          opacity="0.79"
                          d="M16.5944 25.4757C16.099 24.3766 15.883 23.7173 15.6709 22.6567L15.4714 21.6594L16.0708 21.1052C18.6 18.7667 22.1917 16.374 26.1506 14.3902C32.6639 11.1264 42.0974 8.19897 48.7143 7.38827C50.6957 7.14549 57.709 7.09586 60.2503 7.30662L61.5138 7.4114L56.7126 11.129L51.9114 14.8466L48.1826 14.937C41.0219 15.1104 36.0652 15.8309 31.2032 17.4052C26.0973 19.0585 21.7991 21.5462 18.2108 24.9249L16.9017 26.1575L16.5944 25.4757Z"
                          fill="#C5C5C6"
                        />
                      </g>
                    </g>
                  </svg>
                </Button>
                {updateInfo}
                <TabList flexGrow="1" mb="2.4rem">
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="space-bewteen"
                    gap="2.4rem"
                  >
                    <Tab>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.337 21.718C5.15841 21.7005 4.98061 21.6758 4.804 21.644C4.67429 21.6208 4.553 21.5638 4.45233 21.4787C4.35167 21.3937 4.27518 21.2836 4.23057 21.1597C4.18596 21.0357 4.17481 20.9021 4.19823 20.7724C4.22165 20.6428 4.27883 20.5215 4.364 20.421C4.77426 19.9373 5.05442 19.3571 5.178 18.735C5.201 18.62 5.156 18.418 4.924 18.192C3.274 16.587 2.25 14.41 2.25 12C2.25 6.97 6.678 3 12 3C17.322 3 21.75 6.97 21.75 12C21.75 17.03 17.322 21 12 21C11.167 21 10.357 20.903 9.583 20.721C8.31785 21.5161 6.82381 21.8669 5.337 21.718Z"
                          fill={getFillColor(0)}
                        />
                      </svg>
                    </Tab>
                    <Tab>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.49997 6C7.49997 4.80653 7.97408 3.66193 8.81799 2.81802C9.66191 1.97411 10.8065 1.5 12 1.5C13.1934 1.5 14.338 1.97411 15.182 2.81802C16.0259 3.66193 16.5 4.80653 16.5 6C16.5 7.19347 16.0259 8.33807 15.182 9.18198C14.338 10.0259 13.1934 10.5 12 10.5C10.8065 10.5 9.66191 10.0259 8.81799 9.18198C7.97408 8.33807 7.49997 7.19347 7.49997 6ZM3.75097 20.105C3.78469 17.9395 4.66862 15.8741 6.21193 14.3546C7.75525 12.8351 9.83419 11.9834 12 11.9834C14.1658 11.9834 16.2447 12.8351 17.788 14.3546C19.3313 15.8741 20.2153 17.9395 20.249 20.105C20.2516 20.2508 20.2116 20.3942 20.134 20.5176C20.0564 20.641 19.9445 20.7392 19.812 20.8C17.3611 21.9237 14.6961 22.5037 12 22.5C9.21397 22.5 6.56697 21.892 4.18797 20.8C4.05546 20.7392 3.94355 20.641 3.86594 20.5176C3.78832 20.3942 3.74837 20.2508 3.75097 20.105Z"
                          fill={getFillColor(1)}
                        />
                      </svg>
                    </Tab>
                    <Tab>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.24997 7C3.24997 5.20979 3.96113 3.4929 5.227 2.22703C6.49287 0.961159 8.20976 0.25 9.99997 0.25C11.7902 0.25 13.5071 0.961159 14.7729 2.22703C16.0388 3.4929 16.75 5.20979 16.75 7V7.75C16.75 9.873 17.55 11.807 18.868 13.27C18.9501 13.361 19.0086 13.4707 19.0385 13.5896C19.0684 13.7084 19.0687 13.8328 19.0394 13.9518C19.0101 14.0708 18.9521 14.1808 18.8704 14.2722C18.7887 14.3636 18.6859 14.4335 18.571 14.476C17.027 15.046 15.411 15.466 13.74 15.719C13.7776 16.2331 13.7088 16.7495 13.5379 17.2359C13.367 17.7222 13.0977 18.1681 12.7467 18.5457C12.3957 18.9233 11.9707 19.2245 11.4981 19.4304C11.0255 19.6364 10.5155 19.7427 9.99997 19.7427C9.48446 19.7427 8.97448 19.6364 8.50188 19.4304C8.02929 19.2245 7.60424 18.9233 7.25327 18.5457C6.90229 18.1681 6.63295 17.7222 6.46204 17.2359C6.29114 16.7495 6.22235 16.2331 6.25997 15.719C4.61163 15.4692 2.99296 15.0524 1.42897 14.475C1.31411 14.4326 1.21137 14.3627 1.12973 14.2715C1.0481 14.1802 0.990049 14.0703 0.960654 13.9515C0.931259 13.8326 0.931413 13.7084 0.961102 13.5896C0.990791 13.4708 1.04911 13.3611 1.13097 13.27C2.49778 11.7567 3.25305 9.78919 3.24997 7.75V7ZM7.75197 15.9C7.73918 16.2032 7.78785 16.5058 7.89506 16.7897C8.00226 17.0736 8.16579 17.3329 8.37579 17.5519C8.5858 17.771 8.83795 17.9453 9.11707 18.0644C9.39619 18.1835 9.69651 18.2448 9.99997 18.2448C10.3034 18.2448 10.6038 18.1835 10.8829 18.0644C11.162 17.9453 11.4141 17.771 11.6242 17.5519C11.8342 17.3329 11.9977 17.0736 12.1049 16.7897C12.2121 16.5058 12.2608 16.2032 12.248 15.9C10.7523 16.0347 9.24761 16.0347 7.75197 15.9Z"
                          fill={getFillColor(2)}
                        />
                      </svg>
                    </Tab>

                    <Button
                      mt="auto"
                      variant="unstyled"
                      onClick={toggleColorMode}
                    >
                      {colorMode === 'light' ? (
                        <MoonIcon color={logo} w="2.3rem" h="2.3rem" />
                      ) : (
                        <SunIcon color={logo} w="2.3rem" h="2.3rem" />
                      )}
                    </Button>

                    <Tab>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.078 2.25C10.161 2.25 9.379 2.913 9.228 3.817L9.05 4.889C9.03 5.009 8.935 5.149 8.753 5.237C8.41034 5.40171 8.08073 5.59226 7.767 5.807C7.601 5.922 7.433 5.933 7.317 5.89L6.3 5.508C5.88424 5.35224 5.42669 5.34906 5.00881 5.49904C4.59093 5.64901 4.23982 5.94241 4.018 6.327L3.096 7.924C2.87408 8.30836 2.79571 8.75897 2.87481 9.19569C2.95392 9.6324 3.18537 10.0269 3.528 10.309L4.368 11.001C4.463 11.079 4.538 11.23 4.522 11.431C4.4935 11.8101 4.4935 12.1909 4.522 12.57C4.537 12.77 4.463 12.922 4.369 13L3.528 13.692C3.18537 13.9741 2.95392 14.3686 2.87481 14.8053C2.79571 15.242 2.87408 15.6926 3.096 16.077L4.018 17.674C4.23998 18.0584 4.59115 18.3516 5.00902 18.5014C5.42689 18.6512 5.88435 18.6478 6.3 18.492L7.319 18.11C7.434 18.067 7.602 18.079 7.769 18.192C8.081 18.406 8.41 18.597 8.754 18.762C8.936 18.85 9.031 18.99 9.051 19.112L9.229 20.183C9.38 21.087 10.162 21.75 11.079 21.75H12.923C13.839 21.75 14.622 21.087 14.773 20.183L14.951 19.111C14.971 18.991 15.065 18.851 15.248 18.762C15.592 18.597 15.921 18.406 16.233 18.192C16.4 18.078 16.568 18.067 16.683 18.11L17.703 18.492C18.1185 18.6472 18.5756 18.6501 18.993 18.5002C19.4105 18.3502 19.7612 18.0571 19.983 17.673L20.906 16.076C21.1279 15.6916 21.2063 15.241 21.1272 14.8043C21.0481 14.3676 20.8166 13.9731 20.474 13.691L19.634 12.999C19.539 12.921 19.464 12.77 19.48 12.569C19.5084 12.1899 19.5084 11.8091 19.48 11.43C19.464 11.23 19.539 11.078 19.633 11L20.473 10.308C21.181 9.726 21.364 8.718 20.906 7.923L19.984 6.326C19.762 5.94159 19.4108 5.6484 18.993 5.49861C18.5751 5.34883 18.1176 5.35215 17.702 5.508L16.682 5.89C16.568 5.933 16.4 5.921 16.233 5.807C15.9196 5.5923 15.5903 5.40175 15.248 5.237C15.065 5.15 14.971 5.01 14.951 4.889L14.772 3.817C14.6991 3.37906 14.4731 2.98122 14.1343 2.69427C13.7956 2.40732 13.366 2.24989 12.922 2.25H11.079H11.078ZM12 15.75C12.9946 15.75 13.9484 15.3549 14.6516 14.6517C15.3549 13.9484 15.75 12.9946 15.75 12C15.75 11.0054 15.3549 10.0516 14.6516 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25C11.0054 8.25 10.0516 8.64509 9.34835 9.34835C8.64508 10.0516 8.25 11.0054 8.25 12C8.25 12.9946 8.64508 13.9484 9.34835 14.6517C10.0516 15.3549 11.0054 15.75 12 15.75Z"
                          fill={getFillColor(3)}
                        />
                      </svg>
                    </Tab>
                    <Divider colorScheme="red" orientation="horizontal" />
                  </Flex>
                </TabList>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        variant="unstyled"
                        transform={isOpen ? 'scale(1.2)' : 'scale(1)'}
                        transition="transform 0.3s ease-in-out"
                        w="3.2rem"
                        h="3.2rem"
                        _hover={{
                          transform: `scale(1.2)`,
                        }}
                      >
                        <Avatar
                          name={user?.userInfo.name}
                          src={user?.userInfo.avatar}
                          w="100%"
                          h="100%"
                        >
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                      </MenuButton>
                      <MenuList w="18rem" zIndex={20}>
                        <MenuItem
                          fontSize="1.3rem"
                          fontFamily="openSans"
                          color={text}
                          fontWeight={400}
                          onClick={onOpen}
                        >
                          <InfoOutlineIcon />
                          <Text ms="1rem">Update Info</Text>
                        </MenuItem>
                        <MenuItem
                          fontSize="1.3rem"
                          fontFamily="openSans"
                          color={text}
                          fontWeight={400}
                          isDisabled={user?.authType === 'social'}
                          onClick={() =>
                            sendVerificationEmail({
                              email: user?.authInfo.email,
                            })
                          }
                        >
                          <RepeatIcon />
                          <Text ms="1rem">Password Change</Text>
                        </MenuItem>
                        <MenuItem
                          fontSize="1.3rem"
                          fontFamily="openSans"
                          fontWeight={400}
                          onClick={logoutHandler}
                        >
                          <Image src={logout} w="1.8rem" />
                          <Text ms="1rem" color="red-3">
                            Logout
                          </Text>
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>
            </GridItem>
            <GridItem area="sidebar">
              <TabPanels>
                <Animate>
                  <TabPanel h="100vh" p="0">
                    <Inbox />
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel h="100vh" p="0">
                    <Sidebar header="Contacts" type="contacts">
                      {(contactName: string) => (
                        <Contacts contactName={contactName} />
                      )}
                    </Sidebar>
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel>
                    <Text
                      fontSize="1.3rem"
                      fontFamily="openSans"
                      color={text}
                      fontWeight={400}
                      mt="2.2rem"
                    >
                      Coming soon
                    </Text>
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel>
                    <Settings />
                  </TabPanel>
                </Animate>
              </TabPanels>
            </GridItem>
            <GridItem area="chatbox">
              {activeConversation ? <ChatView /> : <NoChatSelected />}
            </GridItem>
          </Grid>
        </Tabs>
      </Box>
    </>
  );
}

export default AppLayout;
