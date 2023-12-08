import { CARD_VALUES_1, HAND_TYPE } from "./main";

declare global {
  type Card = keyof typeof CARD_VALUES_1;
  type CardsValue = Record<Card, string>;

  type HandType = keyof typeof HAND_TYPE;
  type HandTypeScore = (typeof HAND_TYPE)[HandType];

  type HandDetail = {
    bid: number;
    handType: HandTypeScore;
    handValue: string;
  };
}

export {};
