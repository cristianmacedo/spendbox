import { StaticImageData } from "next/image";

export interface Billionaire {
  id: string;
  name: string;
  image: StaticImageData | string;
  netWorth: number;
  source: string;
  bio: string;
  isCustom?: boolean;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  image: StaticImageData | string;
  price: number;
  count: number;
  isCustom?: boolean;
}
