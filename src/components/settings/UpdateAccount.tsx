import { Box, Button, SlideFade, useColorModeValue } from '@chakra-ui/react';

interface PropTypes {
  isOpen: boolean;
  handleSetttingPreferences: (
    type: 'account' | 'notifications' | 'darkMode'
  ) => void;
}

function UpdateAccount({ isOpen, handleSetttingPreferences }: PropTypes) {
  const bgTheme = useColorModeValue('bg-light', 'bg-dark');

  return (
    <SlideFade
      in={isOpen}
      unmountOnExit
      style={{ zIndex: 10, position: 'absolute', top: '6.2rem' }}
      offsetY="0"
      offsetX="1rem"
    >
      <Box bg={bgTheme} w="28rem" h="calc(100vh - 11rem)" p="2.2rem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia harum
        accusamus quod recusandae dicta? Cum voluptate, vero voluptates qui
        temporibus esse non voluptas alias voluptatum neque recusandae
        perferendis repudiandae at nam blanditiis reiciendis eveniet iure. Quos,
        totam? Doloremque ea non doloribus autem est soluta cumque nemo voluptas
        similique itaque! Eum cupiditate quod provident id quas minima, quidem
        excepturi soluta voluptatibus iusto animi repellendus numquam, neque
        fuga vero sint nostrum non voluptatem adipisci quam ex! A maiores
        nesciunt dolore saepe id aliquam fugit nam tempore porro doloremque odit
        nobis totam ex quos laboriosam minus tempora fugiat quo nisi, explicabo
        omnis ut.
        <Button onClick={() => handleSetttingPreferences('account')}>
          Close
        </Button>
      </Box>
    </SlideFade>
  );
}

export default UpdateAccount;
