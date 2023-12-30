import { Flex } from '@chakra-ui/react';

import HeroSection from '@/components/auth/HeroSection';
import useHeight from '@/hooks/sizing/useHeight';
import useWidth from '@/hooks/sizing/useWidth';
import SignUp from './SignUp';
import SignIn from './SignIn';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const height = useHeight();
  const width = useWidth();

  return (
    <Flex as="section" height={height} padding="2.4rem">
      {isSignUp ? <SignUp /> : <SignIn />}
      {width >= 768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
