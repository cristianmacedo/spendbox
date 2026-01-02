import { Billionaire } from "@/types";

export const billionaires: Billionaire[] = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    netWorth: 400_000_000_000,
    source: "Tesla, SpaceX, X",
    bio: "The future is going to be weird, but that's okay.",
  },
  {
    id: "jeff-bezos",
    name: "Jeff Bezos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/440px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg",
    netWorth: 230_000_000_000,
    source: "Amazon, Blue Origin",
    bio: "If you can't tolerate critics, don't do anything new or interesting.",
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/440px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    netWorth: 210_000_000_000,
    source: "Meta",
    bio: "The biggest risk is not taking any risk.",
  },
  {
    id: "bill-gates",
    name: "Bill Gates",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/440px-Bill_Gates_2017_%28cropped%29.jpg",
    netWorth: 130_000_000_000,
    source: "Microsoft, Investments",
    bio: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
  },
  {
    id: "warren-buffett",
    name: "Warren Buffett",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg/440px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg",
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
