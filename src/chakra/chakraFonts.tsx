import { Global } from '@emotion/react';

// eslint-disable-next-line react/function-component-definition
const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Open Sans';
        src: url('/fonts/OpenSans.ttf')  format('truetype');
      }

      @font-face {
        font-family: 'Fredoka';
        src: url('/fonts/fredoka.ttf')  format('truetype');
      }
      `}
  />
);

export default Fonts;
