import { Person } from "@/types/Person";
import { Character } from "@/types/Character";

export const convertPersonToCharacter = ({
  naturalId,
  person: { name, squareImage },
  source,
  finalWorth,
  bios,
}: Person): Character => ({
  id: naturalId,
  image: squareImage,
  name,
  source,
  netWorth: finalWorth * 1000 * 1000,
  bios,
});
