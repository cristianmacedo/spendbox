import React from 'react';

import numeral from 'numeral';

import {
  // Box,
  Flex,
  Text,
  Badge,
  Image,
  Center,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { FORMAT_PRICE } from 'config/constants';

import { ProductValue } from 'domains/ProductValue';

interface ProductProps {
  product: ProductValue;
  onBuy: (id: string) => void;
  onSell: (id: string) => void;
}

const Product = ({ product, onBuy, onSell }: ProductProps): JSX.Element => (
  <Flex
    bgColor="green.100"
    p="8px"
    m="8px"
    borderRadius="md"
    direction="column"
  >
    <Flex justify="space-between" mb="4px">
      <Text
        color="green.500"
        fontWeight="bold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {product.type}
      </Text>
      <Badge borderRadius="md" px="2" bgColor="orange.500" color="orange.100">
        {numeral(product.price).format(FORMAT_PRICE)}
      </Badge>
    </Flex>
    <Text fontSize="xl" fontWeight="bold" color="green.700" mb="8px">
      {product.name}
    </Text>
    <Center w="100%" mb="8px">
      <Image h="128px" src={product.image} alt={product.name} />
    </Center>
    <HStack justify="space-between">
      <Button
        color="green.700"
        variant="outline"
        borderColor="green.700"
        size="sm"
        minW="50px"
        _hover={{ bgColor: 'green.50' }}
        _active={{
          bgColor: 'white',
        }}
        onClick={() => onSell(product.id)}
      >
        Sell
      </Button>
      <NumberInput size="sm" defaultValue={product.count}>
        <NumberInputField
          bgColor="green.50"
          color="green.700"
          border="none"
          borderRadius="md"
        />
      </NumberInput>
      <Button
        bgColor="green.700"
        color="green.50"
        size="sm"
        minW="50px"
        _hover={{ bgColor: 'green.800' }}
        _active={{
          bgColor: 'green.900',
        }}
        onClick={() => onBuy(product.id)}
      >
        Buy
      </Button>
    </HStack>
  </Flex>
);

export default Product;
