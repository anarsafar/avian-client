import { Box, Heading, Image } from '@chakra-ui/react';
import pattern from '@assets/layout/pattern.png';
import cover from '@assets/layout/could.png';

function HeroSection() {
  return (
    <Box
      flexGrow={{ base: 1.3, lg: 1 }}
      flexBasis="0"
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
        zIndex: -1,
      }}
    >
      <Image
        src={pattern}
        alt="Pattern Background"
        loading="eager"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        objectFit="cover"
        filter="blur(27px)"
        zIndex={-1}
      />
      <Image
        src={cover}
        alt="Cover Image"
        loading="eager"
        position="relative"
        zIndex={1}
        objectFit="cover"
        height="100%"
        width="100%"
      />

      <Box
        position="absolute"
        width={{ base: '80%', lg: '38.3rem' }}
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        p="5rem 4.4rem 6.2rem 3.4rem"
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
          mb="1.6rem"
        >
          Blazingly fast messaging platform for the web.
        </Heading>
        <Heading
          as="h2"
          fontFamily="fredoka"
          color="#fff"
          fontSize="1.2rem"
          fontWeight="400"
          letterSpacing="0.16px"
          lineHeight="normal"
          fontStyle="normal"
        >
          Avian saves all the data in user’s devices and uses a cryptographic
          protocols to sync the data across multiple browsers and devices.
        </Heading>
      </Box>
    </Box>
  );
}

export default HeroSection;
