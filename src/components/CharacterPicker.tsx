import {
  Flex,
  ScaleFade,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";

import {
  ANIMATION_DELAY_MULTIPLIER,
  CHARACTER_LIMIT,
} from "@/config/constants";

import { Character as CharacterType } from "@/types/Character";

import Character from "@/components/Character";

interface CharacterPickerProps {
  characters: CharacterType[];
  onCharacterChange: (character: CharacterType) => void;
  isLoading: boolean;
}

const characterPickerSkeleton = Array.from(
  { length: CHARACTER_LIMIT },
  (_, index) => (
    <Skeleton
      key={index}
      h="56px"
      borderRadius="md"
      startColor="green.100"
      endColor="green.900"
    />
  )
);

const CharacterPicker = ({
  characters,
  onCharacterChange,
  isLoading,
}: CharacterPickerProps): JSX.Element => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "character-picker",
    onChange: (id: string) => {
      const character = characters.find((c) => c.id === id);
      if (character) {
        onCharacterChange(character);
      }
    },
  });

  const group = getRootProps();

  const charactersMap = characters.map((character, index) => (
    <ScaleFade key={character.id} delay={ANIMATION_DELAY_MULTIPLIER * index} in>
      <Character
        character={character}
        radio={getRadioProps({
          value: character.id,
          enterKeyHint: "none",
        })}
      />
    </ScaleFade>
  ));

  return (
    <Stack {...group} maxW="424px" w="100%">
      <Flex>
        <Text fontSize="sm" fontWeight="bold" mb="4px" color="green.100">
          Choose a character
        </Text>
        {isLoading && <Spinner size="sm" ml="8px" color="green.500" />}
      </Flex>
      {isLoading ? characterPickerSkeleton : charactersMap}
    </Stack>
  );
};

export default CharacterPicker;
