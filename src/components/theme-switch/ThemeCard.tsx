import { Box, MenuItem, useColorModeValue, useRadio } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Theme {
  children: ReactNode;
}

function ThemeCard({ children, ...props }: Theme) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();
  const textTheme = useColorModeValue('gray-4', 'text-dark');

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
        textAlign="center"
      >
        {children}
      </Box>
    </MenuItem>
  );
}

export default ThemeCard;
