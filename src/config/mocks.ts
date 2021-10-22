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
    id: 'drink/3233',
    type: 'drink',
    name: 'Starbucks Coffee',
    image: 'https://cdn-icons-png.flaticon.com/256/3233/3233444.png',
    price: 2,
    count: 0,
  },
  {
    id: 'food/1522',
    type: 'food',
    name: 'Big Mac',
    image: 'https://cdn-icons-png.flaticon.com/256/1522/1522401.png',
    price: 4,
    count: 0,
  },
  {
    id: 'entertainment/320',
    type: 'entertainment',
    name: 'Movie Ticket',
    image: 'https://cdn-icons-png.flaticon.com/256/320/320416.png',
    price: 8,
    count: 0,
  },
  {
    id: 'food/5854',
    type: 'food',
    name: 'Average Restaurant Meal',
    image: 'https://cdn-icons-png.flaticon.com/256/5854/5854016.png',
    price: 20,
    count: 0,
  },
  {
    id: 'movie/3771',
    type: 'streaming subscription',
    name: 'Netflix - 1 year',
    image: 'https://cdn-icons-png.flaticon.com/256/3771/3771491.png',
    price: 170,
    count: 0,
  },
  {
    id: 'videogame/3771',
    type: 'video game console',
    name: 'Playstation 5',
    image: 'https://cdn-icons-png.flaticon.com/256/771/771262.png',
    price: 400,
    count: 0,
  },
  {
    id: 'smartphone/3771',
    type: 'smartphone',
    name: 'Iphone 13',
    image: 'https://cdn-icons-png.flaticon.com/256/644/644458.png',
    price: 700,
    count: 0,
  },
  {
    id: 'laptop/3771',
    type: 'laptop',
    name: 'Macbook Pro',
    image: 'https://cdn-icons-png.flaticon.com/256/644/644438.png',
    price: 1400,
    count: 0,
  },
];

export default characters;
