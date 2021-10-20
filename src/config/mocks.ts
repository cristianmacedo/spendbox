import { CharacterValue } from 'domains/CharacterValue';

export const characters = [
  {
    id: 'faris/35/0/14117',
    name: 'Elon Musk',
    avatar:
      // eslint-disable-next-line no-secrets/no-secrets
      'https://specials-images.forbesimg.com/imageserve/5f47d4de7637290765bce495/416x416.jpg',
    source: 'Tesla, SpaceX',
    netWorth: 214_840_733_200,
  },
  {
    id: 'faris/35/0/6713',
    name: 'Jeff Besos',
    avatar:
      // eslint-disable-next-line no-secrets/no-secrets
      'https://specials-images.forbesimg.com/imageserve/5bb22ae84bbe6f67d2e82e05/416x416.jpg',
    source: 'Amazon',
    netWorth: 197_817_067_000,
  },
] as CharacterValue[];

export default characters;
