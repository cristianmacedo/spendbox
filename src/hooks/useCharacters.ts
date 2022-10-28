import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { CHARACTER_LIMIT } from 'config/constants';
import { FORBES_RTB_400 } from 'config/endpoints';

import { PersonValue } from 'domains/ApiValue';
import { CharacterValue } from 'domains/CharacterValue';
import { QueryType } from 'domains/QueriesValue';

import { convertPersonToCharacter } from 'utils/converters';

const getCharacters = async (): Promise<CharacterValue[]> => {
  const { data } = await axios.get<PersonValue[]>(
    `${FORBES_RTB_400}?limit=${CHARACTER_LIMIT}`
  );

  return data.map((element) => convertPersonToCharacter(element));
};

const useCharacters = (): UseQueryResult<CharacterValue[], Error> =>
  useQuery<CharacterValue[], Error>(QueryType.CHARACTERS, getCharacters, {
    placeholderData: [],
    staleTime: 60 * 1000,
  });

export default useCharacters;
