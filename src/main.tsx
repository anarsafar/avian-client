import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';

import theme from './chakra/chakraTheme';
import AppRoutes from './routes';
import Fonts from './chakra/chakraFonts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <Fonts />
      <AppRoutes />
    </ChakraProvider>
  </HelmetProvider>
);
