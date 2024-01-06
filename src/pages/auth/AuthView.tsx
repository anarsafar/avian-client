import { Flex } from '@chakra-ui/react';

import HeroSection from '@/components/auth/HeroSection';
import useHeight from '@/hooks/sizing/useHeight';
import useWidth from '@/hooks/sizing/useWidth';
import Signup from './Signup';
import Signin from './Signin';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const height = useHeight();
  const width = useWidth();

  return (
    <Flex as="section" height={height} padding="2.4rem">
      {isSignUp ? <Signup /> : <Signin />}
      {width >= 768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
