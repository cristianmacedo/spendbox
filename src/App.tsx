import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import characters from 'config/mocks';
import theme from 'config/theme';

import { CharacterValue } from 'domains/CharacterValue';

import BalanceIndicator from 'components/BalanceIndicator';
import CharacterPicker from 'components/CharacterPicker';
import Header from 'components/Header';
import Hero from 'components/Hero';

const App = (): JSX.Element => {
  const [selectedCharacter, setSelectedCharacter] =
    React.useState<CharacterValue>();
  const [startingBalance, setStartingBalance] = React.useState<number>(0);
  const [currentBalance, setCurrentBalance] = React.useState<number>(0);

  const handleCharacterChange = React.useCallback(
    (character: CharacterValue) => {
      setSelectedCharacter(character);
      setCurrentBalance(character.netWorth - 1_000_000_000);
      setStartingBalance(character.netWorth);
    },
    []
  );

  const subtitle = React.useMemo((): string => {
    if (selectedCharacter) {
      return `Spend ${selectedCharacter.name}'s fortune however you want on the available products below!`;
    }
    return 'Pick a billionaire and spend it’s fortune however you want on the available products below!';
  }, [selectedCharacter]);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Hero title="Spend billionaires money!" subtitle={subtitle}>
        <CharacterPicker
          characters={characters}
          onCharacterChange={handleCharacterChange}
        />
      </Hero>
      <BalanceIndicator start={startingBalance} end={currentBalance} />
    </ChakraProvider>
  );
};

export default App;
