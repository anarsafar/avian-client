import { Flex, useMediaQuery } from '@chakra-ui/react';

import HeroSection from '@/components/auth/HeroSection';
import SignUp from './Signup';
import SignIn from './Signin';
import useHeight from '@/hooks/useHeight';

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
