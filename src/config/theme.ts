import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const theme: ThemeConfig = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
