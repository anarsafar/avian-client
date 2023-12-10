import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import theme from './chakra/chakraTheme';
import AppRoutes from './routes';
import Fonts from './chakra/chakraFonts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Fonts />
        <AppRoutes />
      </ChakraProvider>
    </HelmetProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
