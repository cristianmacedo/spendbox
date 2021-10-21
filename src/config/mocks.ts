import { CharacterValue } from 'domains/CharacterValue';
import { ProductValue } from 'domains/ProductValue';

export const characters: CharacterValue[] = [
  {
    id: 'faris/35/0/14117',
    name: 'Elon Musk',
    image:
      // eslint-disable-next-line no-secrets/no-secrets
      'https://specials-images.forbesimg.com/imageserve/5f47d4de7637290765bce495/416x416.jpg',
    source: 'Tesla, SpaceX',
    netWorth: 214_840_733_200,
  },
  {
    id: 'faris/35/0/6713',
    name: 'Jeff Besos',
    image:
      // eslint-disable-next-line no-secrets/no-secrets
      'https://specials-images.forbesimg.com/imageserve/5bb22ae84bbe6f67d2e82e05/416x416.jpg',
    source: 'Amazon',
    netWorth: 197_817_067_000,
  },
];

export const products: ProductValue[] = [
  {
    id: 'starbucks/35/0/14117',
    type: 'drink',
    name: 'Starbucks Coffee',
    image: 'https://www.starbucks.com/static/images/global/logo.png?',
    price: 2,
    count: 32,
  },
  {
    id: 'mcdonalds/85/1/14411',
    type: 'food',
    name: 'Big Mac',
    image: 'https://www.starbucks.com/static/images/global/logo.png',
    price: 4,
    count: 14,
  },
  {
    id: 'movie/35/0/18223',
    type: 'entertainment',
    name: 'Movie Ticket',
    image: 'https://www.starbucks.com/static/images/global/logo.png',
    price: 2,
    count: 5,
  },
];

export default characters;
