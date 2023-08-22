import numeral from "numeral";

import {
  HStack,
  Box,
  Avatar,
  Text,
  Spacer,
  useRadio,
  RadioProps,
} from "@chakra-ui/react";

import { FORMAT_CURRENCY_SYMBOLS } from "@/config/constants";

import { Character as CharacterType } from "@/types/Character";

interface CharacterProps {
  character: CharacterType;
  radio: RadioProps;
}

const Character = ({ character, radio }: CharacterProps): JSX.Element => {
  const {
    getInputProps,
    getCheckboxProps,
    state: { isChecked },
  } = useRadio(radio);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const color = isChecked ? "green" : "gray";

  return (
    <Box as="label">
      <input {...input} />
      <HStack
        {...checkbox}
        h="56px"
        w="100%"
        borderRadius="md"
        borderLeft="8px solid"
        p="8px"
        transition="all 0.2s"
        bgColor="gray.50"
        borderLeftColor="gray.300"
        cursor="pointer"
        opacity={0.5}
        _focus={{
          boxShadow: "outline",
        }}
        _checked={{
          opacity: 1,
          bg: "green.50",
          borderLeftColor: "green.300",
        }}
      >
        <Avatar size="sm" name={character.name} src={character.image} />
        <Box overflow="hidden">
          <Text
            fontSize="md"
            fontWeight="bold"
            color={`${color}.800`}
            isTruncated
          >
            {character.name}
          </Text>
          <Text fontSize="sm" color={`${color}.600`} isTruncated>
            {character.source}
          </Text>
        </Box>
        <Spacer />
        <Text
          fontSize="md"
          fontWeight="bold"
          color={`${color}.800`}
          textTransform="uppercase"
        >
          {numeral(character.netWorth).format(FORMAT_CURRENCY_SYMBOLS)}
        </Text>
      </HStack>
    </Box>
  );
};

export default Character;
