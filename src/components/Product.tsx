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
  onChange: (id: string, count: number) => void;
}

const Product = ({ product, onChange }: ProductProps): JSX.Element => (
  <Flex
    bgColor="green.100"
    p="8px"
    borderRadius="md"
    direction="column"
    w="100%"
    justify="space-between"
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
    <Text fontSize="xl" fontWeight="bold" color="green.700">
      {product.name}
    </Text>
    <Center w="100%" p="16px">
      <Image h="80px" src={product.image} alt={product.name} />
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
        onClick={() => onChange(product.id, product.count - 1)}
      >
        Sell
      </Button>
      <NumberInput
        size="sm"
        w="100%"
        onChange={(_, valueAsNumber) => onChange(product.id, valueAsNumber)}
        value={product.count}
        min={0}
      >
        <NumberInputField
          bgColor="green.50"
          color="green.700"
          border="none"
          borderRadius="md"
          pr="12px"
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
        onClick={() => onChange(product.id, product.count + 1)}
      >
        Buy
      </Button>
    </HStack>
  </Flex>
);

export default Product;
