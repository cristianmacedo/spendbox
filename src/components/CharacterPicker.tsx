import React from 'react';

import { Flex, Spinner, Stack, Text, useRadioGroup } from '@chakra-ui/react';

import { CharacterValue } from 'domains/CharacterValue';

import Character from 'components/Character';

interface CharacterPickerProps {
  characters: CharacterValue[];
  onCharacterChange: (character: CharacterValue) => void;
  isLoading: boolean;
}

const CharacterPicker = ({
  characters,
  onCharacterChange,
  isLoading,
}: CharacterPickerProps): JSX.Element => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'character-picker',
    onChange: (id: string) => {
      const character = characters.find((c) => c.id === id);
      if (character) {
        onCharacterChange(character);
      }
    },
  });

  const group = getRootProps();

  return (
    <Stack {...group} maxW="424px" w="100%">
      <Flex>
        <Text fontSize="sm" fontWeight="bold" mb="4px" color="green.100">
          Choose a character
        </Text>
        {isLoading && <Spinner size="sm" ml="8px" color="green.500" />}
      </Flex>
      {characters.map((character) => {
        const radio = getRadioProps({
          value: character.id,
          enterKeyHint: 'none',
        });
        return (
          <Character key={character.id} character={character} radio={radio} />
        );
      })}
    </Stack>
  );
};

export default CharacterPicker;
