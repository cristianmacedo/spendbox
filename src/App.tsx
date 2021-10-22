import React from 'react';

import { ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import { STYLE_SPACING } from 'config/constants';
import characters, { products as productsMock } from 'config/mocks';
import theme from 'config/theme';

import { CharacterValue } from 'domains/CharacterValue';
import { ProductValue } from 'domains/ProductValue';

import BalanceIndicator from 'components/BalanceIndicator';
import CharacterPicker from 'components/CharacterPicker';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Product from 'components/Product';

const App = (): JSX.Element => {
  const [selectedCharacter, setSelectedCharacter] =
    React.useState<CharacterValue>();
  const [products, setProducts] = React.useState<ProductValue[]>(productsMock);

  const currentBalance = React.useMemo(
    () =>
      (selectedCharacter?.netWorth ?? 0) -
      products.reduce((acc, p) => acc + p.price * p.count, 0),
    [products, selectedCharacter]
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
          return { ...p, count };
        }
        return p;
      });
      setProducts(newProducts);
    },
    [products]
  );

  const handleBuyProduct = React.useCallback(
    (id: string, count: number) => {
      const newProducts = products.map((p) => {
        if (p.id === id) {
          return { ...p, count: p.count + count };
        }
        return p;
      });
      setProducts(newProducts);
    },
    [products]
  );

  const handleSellProduct = React.useCallback(
    (id: string, count: number) => {
      const newProducts = products.map((p) => {
        if (p.id === id) {
          return { ...p, count: p.count - count };
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
          characters={characters}
          onCharacterChange={handleCharacterChange}
        />
      </Hero>
      <BalanceIndicator
        start={selectedCharacter?.netWorth ?? 0}
        end={currentBalance}
      />
      <SimpleGrid
        columns={[1, 1, 2, 3, 4]}
        spacing={8}
        px={STYLE_SPACING}
        my="32px"
      >
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onBuy={handleBuyProduct}
            onSell={handleSellProduct}
            onChange={handleChangeProduct}
          />
        ))}
      </SimpleGrid>
    </ChakraProvider>
  );
};

export default App;
