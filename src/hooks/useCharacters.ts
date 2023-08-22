import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { CHARACTER_LIMIT } from "@/config/constants";
import { FORBES_RTB_400 } from "@/config/endpoints";

import { Person } from "@/types/Person";
import { Character } from "@/types/Character";
import { QueryType } from "@/types/Queries";

import { convertPersonToCharacter } from "@/utils/converters";

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await axios.get<Person[]>(
    `${FORBES_RTB_400}?limit=${CHARACTER_LIMIT}`
  );

  return data.map((element) => convertPersonToCharacter(element));
};

export const useCharacters = (): UseQueryResult<Character[], Error> =>
  useQuery<Character[], Error>(QueryType.CHARACTERS, getCharacters, {
    placeholderData: [],
    staleTime: 60 * 1000,
  });
