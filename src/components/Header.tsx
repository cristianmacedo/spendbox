import React from 'react';

import { FaGithub } from 'react-icons/fa';

// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Flex, Text, Button } from '@chakra-ui/react';

import { APP_NAME, STYLE_SPACING } from 'config/constants';

const Header = (): JSX.Element => (
  <Flex
    as="nav"
    w="100%"
    h="56px"
    bgColor="green.800"
    align="center"
    justify="space-between"
    px={STYLE_SPACING}
  >
    <Text fontSize="lg" color="orange.300" fontWeight="bold">
      {APP_NAME}
    </Text>
    <Button rightIcon={<FaGithub />} color="orange.300" variant="link">
      Contribute
    </Button>
  </Flex>
);

export default Header;
