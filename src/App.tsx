import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import Header from 'components/Header';

import theme from 'config/theme';

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
);

export default App;
