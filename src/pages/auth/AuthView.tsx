import { Flex } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/auth/HeroSection';

import useHeight from '@/hooks/common/useHeight';
import SignUp from './SignUp';
import SignIn from './SignIn';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [height] = useHeight();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Flex as="section" height={height} padding="2.4rem">
      {isSignUp ? <SignUp /> : <SignIn />}
      {windowWidth >= 768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
