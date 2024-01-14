import { Box, useColorMode, useRadioGroup } from '@chakra-ui/react';
import ThemeCard from './ThemeCard';
import useUser from '@/hooks/store/useUser';
import useUserOperations from '@/hooks/user';

function ThemeSwitch() {
  const options = ['os', 'light', 'dark'];
  const { setColorMode } = useColorMode();
  const user = useUser((state) => state.user);
  let theme = user?.preferences?.theme;
  const { updateUser } = useUserOperations();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: theme,
    defaultValue: theme,
    onChange: (value) => {
      if (value === 'light') {
        setColorMode('light');
        theme = 'light';
      } else if (value === 'dark') {
        setColorMode('dark');
        theme = 'dark';
      } else {
        theme = 'os';
        setColorMode('system');
      }
      updateUser({ theme });
    },
  });

  const group = getRootProps();

  return (
    <Box {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <ThemeCard key={value} {...radio}>
            {value}
          </ThemeCard>
        );
      })}
    </Box>
  );
}

export default ThemeSwitch;
