import { Billionaire } from "@/types";
import elonMusk from "@/assets/billionaires/elon-musk.jpg";
import jeffBezos from "@/assets/billionaires/jeff-bezos.jpeg";
import markZuckerberg from "@/assets/billionaires/mark-zuckerberg.jpg";
import billGates from "@/assets/billionaires/bill-gates.jpg";
import warrenBuffett from "@/assets/billionaires/warren-buffett.jpg";

export const billionaires: Billionaire[] = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    image: elonMusk,
    netWorth: 400_000_000_000,
    source: "Tesla, SpaceX, X",
    bio: "The future is going to be weird, but that's okay.",
  },
  {
    id: "jeff-bezos",
    name: "Jeff Bezos",
    image: jeffBezos,
    netWorth: 230_000_000_000,
    source: "Amazon, Blue Origin",
    bio: "If you can't tolerate critics, don't do anything new or interesting.",
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    image: markZuckerberg,
    netWorth: 210_000_000_000,
    source: "Meta",
    bio: "The biggest risk is not taking any risk.",
  },
  {
    id: "bill-gates",
    name: "Bill Gates",
    image: billGates,
    netWorth: 130_000_000_000,
    source: "Microsoft, Investments",
    bio: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
  },
  {
    id: "warren-buffett",
    name: "Warren Buffett",
    image: warrenBuffett,
    netWorth: 145_000_000_000,
    source: "Berkshire Hathaway",
    bio: "Price is what you pay. Value is what you get.",
  },
];

export const CUSTOM_BILLIONAIRE_ID = "custom";

export function createCustomBillionaire(
  name: string,
  netWorth: number
): Billionaire {
  return {
    id: CUSTOM_BILLIONAIRE_ID,
    name,
    image: "",
    netWorth,
    source: "Custom",
    bio: "Your custom fortune to spend!",
    isCustom: true,
  };
}
