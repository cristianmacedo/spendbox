import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';

import Header from 'components/Header';

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
);

export default App;
