import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { FORBES_RTB_400 } from 'config/endpoints';

import { PersonValue } from 'domains/ApiValue';
import { CharacterValue } from 'domains/CharacterValue';
import { QueryType } from 'domains/QueriesValue';

import convertPersonToCharacter from 'utils/converters';

const DEFAULT_LIMIT = 4;

const getCharacters = async (): Promise<CharacterValue[]> => {
  const { data } = await axios.get<PersonValue[]>(
    `${FORBES_RTB_400}?limit=${DEFAULT_LIMIT}`
  );
  return data.map((element) => convertPersonToCharacter(element));
};

const useCharacters = (): UseQueryResult<CharacterValue[]> =>
  useQuery<CharacterValue[], Error>(QueryType.CHARACTERS, getCharacters, {
    staleTime: 60 * 1000,
  });

export default useCharacters;
