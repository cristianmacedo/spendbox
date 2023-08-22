import numeral from "numeral";
import CountUp from "react-countup";

import { HStack, Text, Divider, Box } from "@chakra-ui/react";

import {
  FORMAT_BALANCE,
  FORMAT_PERCENTAGE,
  STYLE_SPACING,
} from "@/config/constants";

import { usePrevious } from "@/hooks/usePrevious";

interface BalanceIndicatorProps {
  start: number;
  end: number;
}

const BalanceIndicator = ({
  start,
  end,
}: BalanceIndicatorProps): JSX.Element => {
  const spent = start - end;
  const percentage = Number.isNaN(spent / start) ? 0 : spent / start;
  const previousPercentage = usePrevious<number>(percentage);
  const previousEnd = usePrevious<number>(end);

  return (
    <HStack
      h="64px"
      px={STYLE_SPACING}
      py="8px"
      bgColor="orange.400"
      justify="center"
      position="sticky"
      top="0"
      zIndex={1}
    >
      <Box>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="orange.100"
          textTransform="uppercase"
        >
          Your balance
        </Text>
        <Text
          fontFamily="mono"
          fontSize="2xl"
          fontWeight="bold"
          color="orange.50"
          lineHeight="none"
        >
          <CountUp
            start={previousEnd}
            end={end}
            duration={2}
            formattingFn={(n: number) => numeral(n).format(FORMAT_BALANCE)}
            decimals={5}
          />
        </Text>
      </Box>
      <Divider
        orientation="vertical"
        borderLeftWidth="2px"
        borderColor="orange.50"
      />
      <Box>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="orange.100"
          textTransform="uppercase"
        >
          Spent
        </Text>
        <Text
          fontFamily="mono"
          fontSize="2xl"
          fontWeight="bold"
          color="orange.50"
          lineHeight="none"
        >
          <CountUp
            start={previousPercentage}
            end={percentage}
            duration={2}
            formattingFn={(n: number) => numeral(n).format(FORMAT_PERCENTAGE)}
            decimals={6}
          />
        </Text>
      </Box>
    </HStack>
  );
};

export default BalanceIndicator;
