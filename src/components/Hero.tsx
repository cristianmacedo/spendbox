import { Stack, Text, Heading, Box } from "@chakra-ui/react";

import { STYLE_SPACING } from "@/config/constants";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Hero = ({ title, subtitle, children }: HeroProps): JSX.Element => (
  <Stack
    as="header"
    w="100%"
    minH="280px"
    bgColor="green.700"
    px={STYLE_SPACING}
    py="32px"
    align="center"
    justify="space-between"
    direction={["column", "column", "row"]}
    spacing={["64px", "32px", "16px"]}
  >
    <Box maxW="424px" w="100%">
      <Heading as="h1" size="lg" mb={2} color="white">
        {title}
      </Heading>
      <Text as="h2" fontWeight="bold" color="green.100">
        {subtitle}
      </Text>
    </Box>
    {children}
  </Stack>
);

export default Hero;
