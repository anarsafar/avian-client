import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import appLogo from '@assets/logos/bird.svg';
import { useRef, useState } from 'react';
import {
  InfoOutlineIcon,
  MoonIcon,
  RepeatIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';

import logout from '@assets/layout/logout.svg';

import Animate from '@/components/common/Animate';
import Inbox from '@/components/messages/Inbox';
import ChatView from '@/components/messages/chat/ChatView';
import Contacts from '@/components/contacts/Contacts';

import useLogout from '@/hooks/auth/useLogout';
import useSendVerification from '@/hooks/auth/useSendVerification';
import usePersist, { StorageType } from '@/hooks/common/usePersist';
import { UserInterface } from '@/schemas/user.schema';
import Sidebar from '@/components/common/Sidebar';
// import useUser from '@/hooks/common/useUser';

function AppLayout() {
  const contactIcon = (
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
  );

  const { getPersistedData, persistData } = usePersist();

  const { current: user } = useRef(
    getPersistedData<UserInterface>('user', StorageType.Local)
  );
  const { current: accessToken } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const { current: activeTabIndex } = useRef(
    getPersistedData<number>('activeTabIndex', StorageType.Session)
  );

  const [activeTab, setActiveTab] = useState(() => Number(activeTabIndex) || 0);
  const { logoutHandler } = useLogout();
  const { sendVerificationEmail, isPending } = useSendVerification();
  //   const { updateUser } = useUser();

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('bg-light', 'bg-dark');
  const text = useColorModeValue('gray-4', 'text-dark');
  const logo = useColorModeValue('#C5C5C6', '#6b7280');

  const updateDarkMode = () => {
    // updateUser({ darkMode: colorMode === 'light' });
    toggleColorMode();
  };

  //   useEffect(() => {
  //     if (user && user.preferences && 'darkMode' in user.preferences) {
  //       localStorage.setItem(
  //         'chakra-ui-color-mode',
  //         user.preferences.darkMode ? 'dark' : 'light'
  //       );
  //     } else {
  //       // add default value
  //     }
  //   }, [user]);

  const handleTabChange = (index: number) => {
    persistData(index, 'activeTabIndex', StorageType.Session);
    setActiveTab(index);
  };

  const getFillColor = (tabIndex: number) =>
    tabIndex === activeTab ? '#8E99F3' : logo;

  if (isPending) {
    return (
      <Flex justify="center" align="center" w="100vw" h="100vh" p="1rem">
        <Flex direction="column" alignItems="center">
          <Heading
            textAlign="center"
            as="h1"
            color={text}
            fontSize="1.6rem"
            fontFamily="openSans"
            fontWeight="600"
            marginBottom="1rem"
          >
            Sending verification code
          </Heading>
          <Heading
            textAlign="center"
            as="h1"
            color={text}
            fontSize="1.6rem"
            fontFamily="openSans"
            fontWeight="600"
            marginBottom="1.4rem"
          >
            Please wait...
          </Heading>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  }

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
                  <Image src={appLogo} alt="avian logo" width="100%" />
                </Button>

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
                          d="M1.5 4.5C1.5 3.70435 1.81607 2.94129 2.37868 2.37868C2.94129 1.81607 3.70435 1.5 4.5 1.5H5.872C6.732 1.5 7.482 2.086 7.691 2.92L8.796 7.343C8.88554 7.701 8.86746 8.07746 8.74401 8.42522C8.62055 8.77299 8.39723 9.07659 8.102 9.298L6.809 10.268C6.674 10.369 6.645 10.517 6.683 10.62C7.24738 12.1549 8.1386 13.5487 9.29495 14.7051C10.4513 15.8614 11.8451 16.7526 13.38 17.317C13.483 17.355 13.63 17.326 13.732 17.191L14.702 15.898C14.9234 15.6028 15.227 15.3794 15.5748 15.256C15.9225 15.1325 16.299 15.1145 16.657 15.204L21.08 16.309C21.914 16.518 22.5 17.268 22.5 18.129V19.5C22.5 20.2956 22.1839 21.0587 21.6213 21.6213C21.0587 22.1839 20.2956 22.5 19.5 22.5H17.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                          fill={getFillColor(3)}
                        />
                      </svg>
                    </Tab>
                    <Button
                      mt="auto"
                      variant="unstyled"
                      onClick={updateDarkMode}
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
                          fill={getFillColor(4)}
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
                      <MenuList w="18rem">
                        <MenuItem
                          fontSize="1.3rem"
                          fontFamily="openSans"
                          color={text}
                          fontWeight={400}
                        >
                          <InfoOutlineIcon />
                          <Text ms="1rem">Profile Information</Text>
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
                          onClick={() =>
                            logoutHandler(accessToken?.accessToken)
                          }
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
                    <Sidebar
                      header="Contacts"
                      sidebarIcon={contactIcon}
                      type="contacts"
                    >
                      {(contactName: string) => (
                        <Contacts contactName={contactName} />
                      )}
                    </Sidebar>
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel>
                    <p>Content for Tab 3</p>
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel>
                    <p>Content for Tab 4</p>
                  </TabPanel>
                </Animate>
                <Animate>
                  <TabPanel>
                    <p>Content for Tab 5</p>
                  </TabPanel>
                </Animate>
              </TabPanels>
            </GridItem>
            <GridItem area="chatbox">
              <ChatView />
            </GridItem>
          </Grid>
        </Tabs>
      </Box>
    </>
  );
}

export default AppLayout;
