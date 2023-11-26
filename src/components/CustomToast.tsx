import { Box, Text, useToast } from '@chakra-ui/react';
import { NetworkResponse } from '@/interfaces/response.interface';

function useCustomToast() {
  const toast = useToast();

  return (isError: boolean, headerText: string, message: NetworkResponse) =>
    toast({
      duration: 3000,
      position: 'top-right',
      render: () => (
        <Box
          color="white"
          p="1.2rem 1.7rem"
          bg={isError ? 'red-1' : 'green-1'}
          borderRadius="12px"
        >
          <Text
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight="700"
            color={isError ? 'red-5' : 'green-5'}
          >
            {headerText}
          </Text>
          <Text
            fontSize="1.2rem"
            fontFamily="openSans"
            fontWeight="400"
            color={isError ? 'red-5' : 'green-5'}
          >
            {message?.error || message?.message}
          </Text>
        </Box>
      ),
    });
}

export default useCustomToast;
