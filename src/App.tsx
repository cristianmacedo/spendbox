import React from 'react';

import { Grid, ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import { STYLE_SPACING } from 'config/constants';
import {
  characters as charactersMock,
  products as productsMock,
} from 'config/mocks';
import theme from 'config/theme';

import { CharacterValue } from 'domains/CharacterValue';
import { ProductValue } from 'domains/ProductValue';

import BalanceIndicator from 'components/BalanceIndicator';
import CharacterPicker from 'components/CharacterPicker';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Product from 'components/Product';
import Receipt from 'components/Receipt';

const App = (): JSX.Element => {
  const [selectedCharacter, setSelectedCharacter] =
    React.useState<CharacterValue>();
  const [products, setProducts] = React.useState<ProductValue[]>(productsMock);

  const spent = React.useMemo(
    () => products.reduce((acc, p) => acc + p.price * p.count, 0),
    [products]
  );

  const startingBalance = React.useMemo(
    () => selectedCharacter?.netWorth ?? 0,
    [selectedCharacter]
  );

  const currentBalance = React.useMemo(
    () => startingBalance - spent,
    [spent, startingBalance]
  );

  const subtitle = React.useMemo((): string => {
    if (selectedCharacter) {
      return `Spend ${selectedCharacter.name}'s fortune however you want on the available products below!`;
    }
    return 'Pick a billionaire and spend it’s fortune however you want on the available products below!';
  }, [selectedCharacter]);

  const handleCharacterChange = React.useCallback(
    (character: CharacterValue) => {
      setSelectedCharacter(character);
    },
    []
  );

  const handleChangeProduct = React.useCallback(
    (id: string, count: number) => {
      const newProducts = products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            count: Number.isNaN(count) ? 0 : count,
            total: p.price * count,
          };
        }
        return p;
      });
      setProducts(newProducts);
    },
    [products]
  );

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Hero title="Spend billionaires money!" subtitle={subtitle}>
        <CharacterPicker
          characters={charactersMock}
          onCharacterChange={handleCharacterChange}
        />
      </Hero>
      <BalanceIndicator start={startingBalance} end={currentBalance} />
      <Grid
        px={STYLE_SPACING}
        my="32px"
        templateColumns={['1fr', '1fr', '1fr', '1fr', '5fr 2fr']}
        gap={5}
      >
        <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={5}>
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onChange={handleChangeProduct}
            />
          ))}
        </SimpleGrid>
        <Receipt
          products={products}
          balance={currentBalance}
          spent={spent}
          characterName={selectedCharacter?.name}
        />
      </Grid>
    </ChakraProvider>
  );
};

export default App;
