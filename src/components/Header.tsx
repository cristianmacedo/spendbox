import React from 'react';

import { FaGithub } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Box, Text, Button } from '@chakra-ui/react';

import { APP_NAME, STYLE_SPACING } from 'config/constants';

const Header = (): JSX.Element => (
  <Box
    w="100%"
    h="56px"
    bgColor="green.800"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    px={STYLE_SPACING}
  >
    <Text fontSize="lg" color="orange.300" fontWeight="bold">
      {APP_NAME}
    </Text>

    <Button rightIcon={<FaGithub />} color="orange.300" variant="link">
      Contribute
    </Button>
  </Box>
);

export default Header;
