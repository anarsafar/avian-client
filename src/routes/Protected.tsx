import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Spinner } from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';

interface ComponentProps {
  element: ReactNode;
}

function Protected({ element }: ComponentProps): ReactNode {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(-1);
    }
  }, [isLoading, user, navigate]);

  if (user) {
    return element;
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" w="100vw" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
}

export default Protected;
