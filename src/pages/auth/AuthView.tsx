import { Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';

import HeroSection from '@/components/auth/HeroSection';
import SignUp from './Signup';
import SignIn from './Signin';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const [containerHeight, setContainerHeight] = useState<number | string>(0);

  const updateContainerHeight = () => {
    setContainerHeight(window.innerHeight);
  };

  useEffect(() => {
    updateContainerHeight();

    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  useLayoutEffect(() => {
    if (Number(containerHeight) < 680) {
      setContainerHeight('auto');
      window.removeEventListener('resize', updateContainerHeight);
    }
  }, [containerHeight]);

  return (
    <Flex as="section" height={containerHeight} padding="2.4rem">
      {isSignUp ? <SignUp /> : <SignIn />}
      {isLargerThan768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
