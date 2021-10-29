import React from 'react';

import numeral from 'numeral';

import { Stack, Heading, Text, Flex, Box, Divider } from '@chakra-ui/react';

import { FORMAT_CURRENCY_SYMBOLS, FORMAT_NUMBER } from 'config/constants';

import { ProductValue } from 'domains/ProductValue';

import id from 'utils/common';

interface ReceiptProps {
  products: ProductValue[];
  balance: number;
  spent: number;
  characterName?: string;
}

const FIRST_COLUMN_WIDTH = '22.5%';
const SECOND_COLUMN_WIDTH = '2.5%';
const THIRD_COLUMN_WIDTH = '50%';
const FOURTH_COLUMN_WIDTH = '25%';

const renderTable = (products: ProductValue[]): JSX.Element => (
  <Stack textTransform="uppercase" fontSize="xs">
    <Stack direction="row" fontWeight="bold">
      <Text w={FIRST_COLUMN_WIDTH}>Qty</Text>
      <Text w={SECOND_COLUMN_WIDTH} />
      <Text w={THIRD_COLUMN_WIDTH}>Item</Text>
      <Text w={FOURTH_COLUMN_WIDTH}>Amount</Text>
    </Stack>
    {products.map((product) => (
      <Stack key={product.id} direction="row">
        <Text w={FIRST_COLUMN_WIDTH}>
          {numeral(product.count).format(FORMAT_NUMBER)}
        </Text>
        <Text w={SECOND_COLUMN_WIDTH} textTransform="lowercase">
          x
        </Text>
        <Text w={THIRD_COLUMN_WIDTH} isTruncated>
          {product.name}
        </Text>
        <Text w={FOURTH_COLUMN_WIDTH} textAlign="right">
          {numeral(product.total).format(FORMAT_CURRENCY_SYMBOLS)}
        </Text>
      </Stack>
    ))}
  </Stack>
);

const Receipt = ({
  products,
  balance,
  spent,
  characterName,
}: ReceiptProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredProducts = React.useMemo(
    () => products.filter((product) => product.count > 0),
    [products]
  );

  const date = React.useMemo(() => new Date().toLocaleDateString(), []);
  const transaction = React.useMemo(() => id(6), []);

  return (
    <Stack
      bgColor="gray.50"
      color="gray.700"
      p="16px"
      borderRadius="md"
      shadow="base"
      fontFamily="mono"
    >
      <Stack py="8px" align="center" w="100%">
        <Heading as="h3" size="md">
          SpendBox
        </Heading>
        <Text textAlign="center" fontSize="xs">
          55-011 Sao Paulo, Brazil
          <br />
          Cristian Macedo
        </Text>
      </Stack>
      <Flex
        justifyContent="space-between"
        textTransform="uppercase"
        fontSize="xs"
      >
        <Text textAlign="center">
          <Box as="span" fontWeight="bold">
            Transaction:
          </Box>
          #{transaction}
        </Text>
        <Text textAlign="center">
          <Box as="span" fontWeight="bold">
            Date:
          </Box>
          {date}
        </Text>
      </Flex>
      <Text fontSize="xs" textTransform="uppercase">
        <Box as="span" fontWeight="bold">
          Payment method:
        </Box>
        {characterName}&apos;s Fortune
      </Text>
      <Divider />
      {renderTable(filteredProducts)}
      <Divider />
      <Flex
        justifyContent="space-between"
        textTransform="uppercase"
        fontSize="xs"
      >
        <Text textAlign="center" fontWeight="bold">
          Subtotal:
        </Text>
        <Text textAlign="center">
          {numeral(spent).format(FORMAT_CURRENCY_SYMBOLS)}
        </Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        textTransform="uppercase"
        fontSize="xs"
      >
        <Text textAlign="center" fontWeight="bold">
          Remaining Balance:
        </Text>
        <Text textAlign="center">
          {numeral(balance).format(FORMAT_CURRENCY_SYMBOLS)}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Receipt;
