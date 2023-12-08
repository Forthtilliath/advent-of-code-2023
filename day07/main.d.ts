import { CARD_VALUES, HAND_TYPE } from "./main";

declare global {
  type Card = keyof typeof CARD_VALUES;
  type HandValue = [number, number, number, number, number];

  type HandScore = [
    handType: number,
    card2: number,
    card3: number,
    card4: number
  ];

  type HandType = keyof typeof HAND_TYPE;
  type HandTypeScore = (typeof HAND_TYPE)[HandType];

  type HandDetail = {
    bid: number;
    handType: HandTypeScore;
    handValue: string;
  };
}

export {};
