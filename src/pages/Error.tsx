/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import pattern from '@assets/layout/pattern.jpg';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      width="100vw"
      borderRadius="12px"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${pattern})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'blur(27px)',
        zIndex: -1,
      }}
    >
      <Box
        position="absolute"
        width={{ base: '90%', md: '50rem' }}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        padding="3rem"
        borderRadius="5px"
        backdropFilter="blur(21.5px)"
        background="linear-gradient(89deg, rgba(242, 242, 242, 0.54) 0.78%, rgba(229, 229, 229, 0.28) 99.34%)"
        zIndex={2}
      >
        <Heading
          as="h1"
          fontFamily="fredoka"
          color="#fff"
          fontSize="2.8rem"
          fontWeight="500"
          lineHeight="normal"
          fontStyle="normal"
          mb="2rem"
        >
          Ups! Page failed to load.
        </Heading>
        <Heading
          as="h2"
          fontFamily="fredoka"
          color="#fff"
          fontSize="1.5rem"
          fontWeight="400"
          letterSpacing="0.16px"
          lineHeight="normal"
          fontStyle="normal"
          mb="2rem"
        >
          Sorry, We couldn't find the page you looking for
        </Heading>
        <Button
          w="100%"
          padding="2rem"
          fontSize="1.2rem"
          fontFamily="openSans"
          fontWeight={400}
          lineHeight="1.6rem"
          letterSpacing="0.16px"
          borderRadius="8px"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;
