import ReactDOM from 'react-dom/client';
import { ChakraProvider, Text } from '@chakra-ui/react';

import theme from './theme/chakraTheme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <Text color="violet-1" fontSize="xl">
      Avian messaging
    </Text>
  </ChakraProvider>
);
