import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './utils/chakraTheme';
import AppRoutes from './routes';
import Fonts from './utils/chakraFonts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <Fonts />
    <AppRoutes />
  </ChakraProvider>
);
