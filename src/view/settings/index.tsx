import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  SlideFade,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import usePersist, { StorageType } from '@/hooks/store/usePersist';
import UpdateAccount from '../../components/update-account';
import useUserOperations from '@/hooks/user';

interface SettingsProps {
  account: boolean;
  notifications: boolean;
  darkMode: boolean;
}

function Settings() {
  const textTheme = useColorModeValue('gray-4', 'text-dark');
  const logoTheme = useColorModeValue('#C5C5C6', '#6b7280');
  const secondTextTheme = useColorModeValue('rgba(0, 0, 0, 0.35)', 'text-dark');
  const hoverTheme = useColorModeValue('hover-light', 'accent-dark');
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');
  const { updateUser } = useUserOperations();

  const { toggleColorMode, colorMode } = useColorMode();
  const { persistData, getPersistedData } = usePersist();

  const [settingsPreferences, setSettingsPreferences] = useState<SettingsProps>(
    () => {
      const settings = getPersistedData<SettingsProps | null>(
        'settings',
        StorageType.Session
      );

      if (!settings) {
        return {
          account: false,
          notifications: false,
          darkMode: false,
        };
      }

      return settings;
    }
  );

  useEffect(() => {
    updateUser({ theme: colorMode });
  }, [colorMode, updateUser]);

  const handleSetttingPreferences = (
    type: 'account' | 'notifications' | 'darkMode'
  ) => {
    setSettingsPreferences((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [type]: !prevSettings[type],
      };
      persistData(newSettings, 'settings', StorageType.Session);
      return newSettings;
    });
  };

  return (
    <Box
      as="section"
      p="2.2rem 0"
      id="settings"
      fontFamily="openSans"
      letterSpacing="0.16px"
      color={textTheme}
      pos="relative"
    >
      <SlideFade
        in={settingsPreferences.account}
        unmountOnExit
        style={{ zIndex: 10, position: 'absolute', top: '6.2rem' }}
        offsetY="0"
        offsetX="1rem"
      >
        <Box bg={bgTheme} w="28rem" h="calc(100vh - 11rem)" p="2.2rem">
          <UpdateAccount onClose={handleSetttingPreferences} />
        </Box>
      </SlideFade>
      <Text
        as="h1"
        fontFamily="openSans"
        fontSize="1.8rem"
        fontWeight={400}
        lineHeight="1.8rem"
        letterSpacing="0.16px"
        color={textTheme}
        mb="2.2rem"
        px="2.2rem"
      >
        Settings
      </Text>
      <Flex
        h="auto"
        as={Button}
        fontSize="1.3rem"
        fontWeight={600}
        color={textTheme}
        variant="unstyled"
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
        p="2.2rem"
        borderRadius="0.9rem"
        onClick={() => handleSetttingPreferences('account')}
        _hover={{
          bg: hoverTheme,
        }}
      >
        <Box textAlign="left">
          <Text>Account</Text>
          <Text
            mt="8px"
            textAlign="left"
            fontSize="1.1rem"
            fontWeight={400}
            color={secondTextTheme}
          >
            Update your profile details
          </Text>
        </Box>
        <ChevronRightIcon color={logoTheme} fontSize="1.8rem" />
      </Flex>
      <Accordion
        allowToggle
        defaultIndex={settingsPreferences.darkMode ? 0 : 1}
      >
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              p="0"
              borderRadius="0.9rem"
              _hover={{
                backgroundColor: hoverTheme,
              }}
              onClick={() => handleSetttingPreferences('darkMode')}
            >
              <Flex
                h="auto"
                textAlign="left"
                fontSize="1.3rem"
                fontWeight={600}
                color={textTheme}
                justifyContent="space-between"
                alignItems="flex-start"
                w="100%"
                p="2.2rem"
              >
                <Box textAlign="left" me="2.2rem">
                  <Text>Appearance</Text>
                  <Text
                    mt="8px"
                    textAlign="left"
                    fontSize="1.1rem"
                    fontWeight={400}
                    color={secondTextTheme}
                  >
                    Customize the look and feel
                  </Text>
                </Box>
              </Flex>
              <AccordionIcon color={logoTheme} fontSize="1.8rem" me="2.2rem" />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <Flex
              h="auto"
              textAlign="left"
              fontSize="1.3rem"
              fontWeight={600}
              color={textTheme}
              justifyContent="space-between"
              alignItems="flex-start"
              w="100%"
              p="2.2rem"
            >
              <Box textAlign="left" me="2.2rem">
                <Text>Dark Mode</Text>
                <Text
                  mt="8px"
                  textAlign="left"
                  fontSize="1.1rem"
                  fontWeight={400}
                  color={secondTextTheme}
                >
                  Apply a theme with dark colors
                </Text>
              </Box>
              <Switch
                id="notifications"
                isChecked={colorMode === 'dark'}
                colorScheme="whatsapp"
                size="lg"
                onChange={toggleColorMode}
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion
        allowToggle
        defaultIndex={settingsPreferences.notifications ? 0 : 1}
      >
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              p="0"
              borderRadius="0.9rem"
              onClick={() => handleSetttingPreferences('notifications')}
              _hover={{
                backgroundColor: hoverTheme,
              }}
            >
              <Flex
                h="auto"
                textAlign="left"
                fontSize="1.3rem"
                fontWeight={600}
                color={textTheme}
                justifyContent="space-between"
                alignItems="flex-start"
                w="100%"
                p="2.2rem"
              >
                <Box textAlign="left" me="2.2rem">
                  <Text>Notifications</Text>
                  <Text
                    mt="8px"
                    textAlign="left"
                    fontSize="1.1rem"
                    fontWeight={400}
                    color={secondTextTheme}
                  >
                    Customize notifications
                  </Text>
                </Box>
              </Flex>
              <AccordionIcon color={logoTheme} fontSize="1.8rem" me="2.2rem" />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <Flex
              h="auto"
              textAlign="left"
              fontSize="1.3rem"
              fontWeight={600}
              color={textTheme}
              justifyContent="space-between"
              alignItems="flex-start"
              w="100%"
              p="2.2rem"
            >
              <Box textAlign="left" me="2.2rem">
                <Text>Keep Notifications</Text>
                <Text
                  mt="8px"
                  textAlign="left"
                  fontSize="1.1rem"
                  fontWeight={400}
                  color={secondTextTheme}
                >
                  Save notifications after they are received
                </Text>
              </Box>
              <Switch
                id="notifications"
                defaultChecked
                size="lg"
                colorScheme="whatsapp"
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default Settings;
