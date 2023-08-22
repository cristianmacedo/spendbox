import { FaGithub } from "react-icons/fa";

import { Flex, Text, Link } from "@chakra-ui/react";

import { APP_NAME, STYLE_SPACING } from "@/config/constants";

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
    <Link
      href="https://github.com/cristianmacedo/spendbox"
      color="orange.300"
      isExternal
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text pr="4px" fontWeight="bold">
        Contribute
      </Text>
      <FaGithub />
    </Link>
  </Flex>
);

export default Header;
