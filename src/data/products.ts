import { Product } from "@/types";

import averageHouse from "@/assets/average-house.png";
import boeing from "@/assets/boeing.png";
import burjKhalifa from "@/assets/burj-khalifa.png";
import car from "@/assets/car.png";
import coffee from "@/assets/coffee.png";
import computer from "@/assets/computer.png";
import cruise from "@/assets/cruise.png";
import electricCar from "@/assets/electric-car.png";
import falcon from "@/assets/falcon.png";
import graphicsCard from "@/assets/graphics-card.png";
import hamburger from "@/assets/hamburger.png";
import helicopter from "@/assets/helicopter.png";
import homeless from "@/assets/homeless.png";
import hunger from "@/assets/hunger.png";
import iphone from "@/assets/iphone.png";
import jet from "@/assets/jet.png";
import macbook from "@/assets/macbook.png";
import mars from "@/assets/mars.png";
import mcdonalds from "@/assets/mcdonalds.png";
import meal from "@/assets/meal.png";
import oil from "@/assets/oil.png";
import packages from "@/assets/packages.png";
import piano from "@/assets/piano.png";
import playstation from "@/assets/playstation.png";
import rocket from "@/assets/rocket.png";
import spaceStation from "@/assets/space-station.png";
import sportsCar from "@/assets/sports-car.png";
import streaming from "@/assets/streaming.png";
import tickets from "@/assets/tickets.png";
// New icons
import americanFootball from "@/assets/american-football.png";
import twitter from "@/assets/twitter.png";
import bitcoin from "@/assets/bitcoin.png";

// Product definitions with 2025 updated prices
const productDefinitions = [
  {
    type: "Drink",
    name: "Starbucks Coffee",
    image: coffee,
    price: 6,
  },
  {
    type: "Food",
    name: "Big Mac",
    image: hamburger,
    price: 6,
  },
  {
    type: "Entertainment",
    name: "Movie Ticket",
    image: tickets,
    price: 15,
  },
  {
    type: "Food",
    name: "Average Restaurant Meal",
    image: meal,
    price: 35,
  },
  {
    type: "Subscription",
    name: "Netflix - 1 Year",
    image: streaming,
    price: 190,
  },
  {
    type: "Gaming",
    name: "PlayStation 5 Pro",
    image: playstation,
    price: 700,
  },
  {
    type: "Smartphone",
    name: "iPhone 16 Pro",
    image: iphone,
    price: 1_199,
  },
  {
    type: "Laptop",
    name: "MacBook Pro M4",
    image: macbook,
    price: 2_000,
  },
  {
    type: "Graphics Card",
    name: "RTX 5090",
    image: graphicsCard,
    price: 2_000,
  },
  {
    type: "Desktop",
    name: "Gaming Computer",
    image: computer,
    price: 3_000,
  },
  {
    type: "Piano",
    name: "Steinway Baby Grand Piano",
    image: piano,
    price: 90_000,
  },
  {
    type: "Average Car",
    name: "Toyota Corolla",
    image: car,
    price: 25_000,
  },
  {
    type: "Electric Car",
    name: "Tesla Model S",
    image: electricCar,
    price: 75_000,
  },
  {
    type: "Property",
    name: "Average House",
    image: averageHouse,
    price: 420_000,
  },
  {
    type: "Sports Car",
    name: "Lamborghini Revuelto",
    image: sportsCar,
    price: 600_000,
  },
  {
    type: "Helicopter",
    name: "Bell 505",
    image: helicopter,
    price: 2_000_000,
  },
  {
    type: "Franchise",
    name: "McDonald's Franchise",
    image: mcdonalds,
    price: 2_500_000,
  },
  {
    type: "Advertising",
    name: "Super Bowl Ad (30 sec)",
    image: americanFootball,
    price: 7_000_000,
  },
  {
    type: "Private Jet",
    name: "Gulfstream G700",
    image: jet,
    price: 80_000_000,
  },
  {
    type: "Space Trip",
    name: "SpaceX Orbital Trip",
    image: rocket,
    price: 55_000_000,
  },
  {
    type: "Rocket",
    name: "Falcon Heavy Launch",
    image: falcon,
    price: 97_000_000,
  },
  {
    type: "Aircraft",
    name: "Boeing 787 Dreamliner",
    image: boeing,
    price: 300_000_000,
  },
  {
    type: "Oil Rig",
    name: "Offshore Oil Platform",
    image: oil,
    price: 650_000_000,
  },
  {
    type: "Cruise Ship",
    name: "Icon of the Seas",
    image: cruise,
    price: 2_000_000_000,
  },
  {
    type: "Skyscraper",
    name: "Burj Khalifa",
    image: burjKhalifa,
    price: 1_500_000_000,
  },
  {
    type: "Space Mission",
    name: "Mars Colony Mission",
    image: mars,
    price: 10_000_000_000,
  },
  {
    type: "Shopping Spree",
    name: "Everything on Amazon",
    image: packages,
    price: 15_000_000_000,
  },
  {
    type: "Philanthropy",
    name: "End US Homelessness",
    image: homeless,
    price: 25_000_000_000,
  },
  {
    type: "Acquisition",
    name: "Twitter/X (Elon's Price)",
    image: twitter,
    price: 44_000_000_000,
  },
  {
    type: "Philanthropy",
    name: "End World Hunger (1 Year)",
    image: hunger,
    price: 45_000_000_000,
  },
  {
    type: "Space Station",
    name: "International Space Station",
    image: spaceStation,
    price: 150_000_000_000,
  },
  {
    type: "Crypto",
    name: "All Bitcoin in Existence",
    image: bitcoin,
    price: 800_000_000_000,
  },
];

export const initialProducts: Product[] = productDefinitions.map((product) => ({
  ...product,
  id: `${product.type.toLowerCase().replace(/\s+/g, "-")}/${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`,
  count: 0,
  total: 0,
}));

export function getProductById(id: string): Product | undefined {
  return initialProducts.find((p) => p.id === id);
}
