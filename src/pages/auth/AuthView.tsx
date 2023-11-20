import { Flex, useMediaQuery } from '@chakra-ui/react';
import HeroSection from '@/components/auth/HeroSection';
import SignUp from './Signup';
import SignIn from './Signin';

interface AuthViewProps {
  isSignUp: boolean;
}

function AuthView({ isSignUp }: AuthViewProps) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Flex as="section" height={{ base: 'auto', md: '100vh' }} padding="2.4rem">
      {isSignUp ? <SignUp /> : <SignIn />}
      {isLargerThan768 && <HeroSection />}
    </Flex>
  );
}

export default AuthView;
