import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <h1>SpendBox</h1>
  </ChakraProvider>
);

export default App;
