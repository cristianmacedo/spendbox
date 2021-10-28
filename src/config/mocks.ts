import averageHouse from 'assets/average-house.png';
import boeing from 'assets/boeing.png';
import car from 'assets/car.png';
import coffee from 'assets/coffee.png';
import computer from 'assets/computer.png';
import electricCar from 'assets/electric-car.png';
import falcon from 'assets/falcon.png';
import graphicsCard from 'assets/graphics-card.png';
import hamburger from 'assets/hamburger.png';
import helicopter from 'assets/helicopter.png';
import iphone from 'assets/iphone.png';
import jet from 'assets/jet.png';
import macbook from 'assets/macbook.png';
import mcdonalds from 'assets/mcdonalds.png';
import meal from 'assets/meal.png';
import oil from 'assets/oil.png';
import piano from 'assets/piano.png';
import playstation from 'assets/playstation.png';
import rocket from 'assets/rocket.png';
import sportsCar from 'assets/sports-car.png';
import streaming from 'assets/streaming.png';
import tickets from 'assets/tickets.png';

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
    type: 'drink',
    name: 'Starbucks Coffee',
    image: coffee,
    price: 2,
  },
  {
    type: 'food',
    name: 'Big Mac',
    image: hamburger,
    price: 4,
  },
  {
    type: 'entertainment',
    name: 'Movie Ticket',
    image: tickets,
    price: 8,
  },
  {
    type: 'food',
    name: 'Average Restaurant Meal',
    image: meal,
    price: 20,
  },
  {
    type: 'streaming subscription',
    name: 'Netflix - 1 year',
    image: streaming,
    price: 170,
  },
  {
    type: 'video game console',
    name: 'Playstation 5',
    image: playstation,
    price: 400,
  },
  {
    type: 'smartphone',
    name: 'Iphone 13',
    image: iphone,
    price: 700,
  },
  {
    type: 'laptop',
    name: 'Macbook Pro',
    image: macbook,
    price: 1400,
  },
  {
    type: 'graphics card',
    name: 'RTX 3080',
    image: graphicsCard,
    price: 1790,
  },
  {
    type: 'desktop',
    name: 'Gaming Computer',
    image: computer,
    price: 2000,
  },
  {
    type: 'piano',
    name: 'Steinway Baby Grand Piano',
    image: piano,
    price: 8000,
  },
  {
    type: 'Average Car',
    name: 'Toyotta Corolla',
    image: car,
    price: 25_000,
  },
  {
    type: 'Electric Car',
    name: 'Tesla Model S',
    image: electricCar,
    price: 80_000,
  },
  {
    type: 'Property',
    name: 'Average House',
    image: averageHouse,
    price: 150_000,
  },
  {
    type: 'Sports Car',
    name: 'Lamborghini Aventador',
    image: sportsCar,
    price: 400_000,
  },
  {
    type: 'Helicopter',
    name: 'Bell B206',
    image: helicopter,
    price: 700_000,
  },
  {
    type: 'Franchise Unit',
    name: "McDonald's",
    image: mcdonalds,
    price: 1_500_000,
  },
  {
    type: 'Private Jet',
    name: 'Cessna Citation XLS',
    image: jet,
    price: 7_000_000,
  },
  {
    type: 'Trip to Orbit',
    name: 'Spacex Insipiration 4 Ticket',
    image: rocket,
    price: 50_000_000,
  },
  {
    type: 'Rocket',
    name: 'Falcon Heavy',
    image: falcon,
    price: 90_000_000,
  },
  {
    type: 'Aircraft',
    name: 'Boeing 747',
    image: boeing,
    price: 400_000_000,
  },
  {
    type: 'Oil Extraction',
    name: 'Petronius Oil Rig',
    image: oil,
    price: 550_000_000,
  },
].map((product) => ({
  ...product,
  id: `${product.type.toLocaleLowerCase().replaceAll(' ', '-')}/${product.name
    .toLocaleLowerCase()
    .replaceAll(' ', '-')}`,
  count: 0,
  total: 0,
}));
