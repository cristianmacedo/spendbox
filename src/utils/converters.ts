import { PersonValue } from 'domains/ApiValue';
import { CharacterValue } from 'domains/CharacterValue';

export const convertPersonToCharacter = ({
  naturalId,
  person: { name, squareImage },
  source,
  finalWorth,
}: PersonValue): CharacterValue => ({
  id: naturalId,
  image: squareImage,
  name,
  source,
  netWorth: finalWorth * 1000 * 1000,
});

export default convertPersonToCharacter;
