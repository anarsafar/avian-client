import { Flex, useMediaQuery } from '@chakra-ui/react';

import HeroSection from '@/components/auth/HeroSection';

import useHeight from '@/hooks/useHeight';
import SignUp from './SignUp';
import SignIn from './SignIn';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [height] = useHeight();

  return (
    <Flex as="section" height={height} padding="2.4rem">
      {isSignUp ? <SignUp /> : <SignIn />}
      {isLargerThan768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
