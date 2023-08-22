import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  image: StaticImageData;
  name: string;
  type: string;
  price: number;
  count: number;
  total: number;
}
