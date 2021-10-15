import React from 'react';

import {
  HStack,
  Box,
  Avatar,
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Text,
  Spacer,
  useRadio,
  RadioProps,
} from '@chakra-ui/react';

interface CharacterProps {
  character: {
    avatar: string;
    name: string;
    source: string;
    netWorth: string;
  };
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

  const color = isChecked ? 'green' : 'gray';

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
        _focus={{
          boxShadow: 'outline',
        }}
        _checked={{
          bg: 'green.50',
          borderLeftColor: 'green.300',
        }}
      >
        <Avatar size="sm" name={character.name} src={character.avatar} />
        <Box>
          <Text fontSize="md" fontWeight="bold" color={`${color}.800`}>
            {character.name}
          </Text>
          <Text fontSize="sm" color={`${color}.600`}>
            {character.source}
          </Text>
        </Box>
        <Spacer />
        <Text fontSize="md" fontWeight="bold" color={`${color}.800`}>
          {character.netWorth}
        </Text>
      </HStack>
    </Box>
  );
};

export default Character;
