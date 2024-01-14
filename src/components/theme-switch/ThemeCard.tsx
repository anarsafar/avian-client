import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  MenuItem,
  useColorModeValue,
  useRadio,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Theme {
  children: ReactNode;
}

function ThemeCard({ children, ...props }: Theme) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const iconTheme = useColorModeValue('#676767', '#fff');

  const input = getInputProps();
  const checkbox = getRadioProps();
  const textTheme = useColorModeValue('gray-4', 'text-dark');

  let icon: ReactNode;
  if (input.value === 'dark') {
    icon = <MoonIcon fontSize="1.3rem" />;
  } else if (input.value === 'light') {
    icon = <SunIcon fontSize="1.3rem" />;
  } else {
    icon = (
      <span style={{ display: 'inline' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          viewBox="0 -960 960 960"
          width="13"
          fill={iconTheme}
        >
          <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm40-83q119-15 199.5-104.5T800-480q0-123-80.5-212.5T520-797v634Z" />
        </svg>
      </span>
    );
  }

  return (
    <MenuItem as="label" p="0" m="0" borderRadius="md">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        w="100%"
        _checked={{
          bg: 'violet-2',
          color: 'white',
          borderColor: 'violet-2',
        }}
        p="1rem"
        fontFamily="openSans"
        fontSize="1.1rem"
        fontWeight="600"
        lineHeight="1.6rem"
        letterSpacing="0.16px"
        color={textTheme}
      >
        <Flex alignItems="center" gap="0.5rem">
          {icon}
          {children}
        </Flex>
      </Box>
    </MenuItem>
  );
}

export default ThemeCard;
