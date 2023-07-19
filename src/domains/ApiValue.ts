export interface FinancialAssetValue {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: true;
  currentPrice: number;
}

export interface PersonValue {
  name: string;
  year: number;
  uri: string;
  bio: string;
  rank: number;
  listUri: string;
  finalWorth: number;
  person: {
    name: string;
    uri: string;
    imageExists: true;
    squareImage: string;
  };
  visible: true;
  personName: string;
  state: string;
  city: string;
  source: string;
  industries: string[];
  countryOfCitizenship: string;
  timestamp: number;
  version: number;
  naturalId: string;
  position: number;
  imageExists: true;
  gender: "M" | "F";
  birthDate: number;
  lastName: string;
  financialAssets: FinancialAssetValue[];
  date: number;
  wealthList: false;
  estWorthPrev: number;
  privateAssetsWorth: number;
  familyList: false;
  interactive: true;
  archivedWorth: number;
  thumbnail: string;
  squareImage: string;
  bioSuppress: false;
  csfDisplayFields: string[];
  bios: string[];
  abouts: string[];
}
