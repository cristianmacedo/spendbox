"use client";

import BalanceIndicator from "@/components/BalanceIndicator";
import CharacterPicker from "@/components/CharacterPicker";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Receipt from "@/components/Receipt";
import { STYLE_SPACING, ANIMATION_DELAY_MULTIPLIER } from "@/config/constants";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types/Character";
import { Product as ProductType } from "@/types/Product";
import { products as defaultProducts } from "@/config/products";
import {
  SlideFade,
  Grid,
  SimpleGrid,
  ScaleFade,
  Center,
  Text,
} from "@chakra-ui/react";
import { useState, useMemo, useCallback } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { id } from "@/utils/generators";

export const getInitialProps: GetStaticProps<{
  date: string;
  receiptId: string;
}> = () => {
  const date = new Date().toLocaleDateString();
  const receiptId = id(6);
  return { props: { date, receiptId } };
};

export default function Home({
  date,
  receiptId,
}: InferGetStaticPropsType<typeof getInitialProps>) {
  const { data: characters, isFetching: isFetchingCharacters } =
    useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [products, setProducts] = useState<ProductType[]>(defaultProducts);
  const [isQuoteOpen, setQuoteOpen] = useState<boolean>(false);

  const spent = useMemo(
    () => products.reduce((acc, p) => acc + p.price * p.count, 0),
    [products]
  );

  const startingBalance = useMemo(
    () => selectedCharacter?.netWorth ?? 0,
    [selectedCharacter]
  );

  const currentBalance = useMemo(
    () => startingBalance - spent,
    [spent, startingBalance]
  );

  const subtitle = useMemo((): string => {
    if (selectedCharacter) {
      return `Spend ${selectedCharacter.name}'s fortune however you want on the available products below!`;
    }
    return "Pick a billionaire and spend it’s fortune however you want on the available products below!";
  }, [selectedCharacter]);

  const handleCharacterChange = useCallback((character: Character) => {
    setQuoteOpen(false);
    setSelectedCharacter(character);

    setTimeout(() => {
      setQuoteOpen(true);
    }, 2000);
  }, []);

  const handleChangeProduct = useCallback(
    (id: string, count: number) => {
      if (count < 0) return;
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
    <>
      <Header />
      <Hero title="Spend billionaires money!" subtitle={subtitle}>
        {selectedCharacter && (
          <SlideFade in={isQuoteOpen}>
            <Text
              fontSize={14}
              fontWeight="medium"
              fontStyle="italic"
              color="green.200"
              w="256px"
            >
              &quot;{selectedCharacter.bios[0]}&quot;
            </Text>
          </SlideFade>
        )}
        <CharacterPicker
          isLoading={isFetchingCharacters}
          characters={characters || []}
          onCharacterChange={handleCharacterChange}
        />
      </Hero>
      <BalanceIndicator start={startingBalance} end={currentBalance} />
      <Grid
        px={STYLE_SPACING}
        my="32px"
        templateColumns={["1fr", "1fr", "1fr", "1fr", "5fr 2fr"]}
        gap={5}
      >
        <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={5}>
          {products.map((product, index) => (
            <ScaleFade
              in
              delay={ANIMATION_DELAY_MULTIPLIER * index}
              key={product.id}
            >
              <Product
                key={product.id}
                product={product}
                onChange={handleChangeProduct}
              />
            </ScaleFade>
          ))}
          <Center>
            <Text
              color="green.500"
              fontWeight="bold"
              letterSpacing="wide"
              fontSize="xs"
            >
              Icons made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </Text>
          </Center>
        </SimpleGrid>
        <Receipt
          id={receiptId}
          date={date}
          products={products}
          balance={currentBalance}
          spent={spent}
          characterName={selectedCharacter?.name}
        />
      </Grid>
    </>
  );
}
