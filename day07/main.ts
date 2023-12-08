/// <reference path="main.d.ts"/>

import { groupBy } from "../helpers/groupBy";
import { toSorted, toSortedMap } from "../helpers/toSorted";
import { exec, readFile } from "../utils";

const DAY = 7;

// prettier-ignore
export const CARD_VALUES_1 = Object.freeze({
  "2": "0",
  "3": "1",
  "4": "2",
  "5": "3",
  "6": "4",
  "7": "5",
  "8": "6",
  "9": "7",
  "T": "8",
  "J": "9",
  "Q": "A",
  "K": "B",
  "A": "C",
} as const);

// prettier-ignore
export const CARD_VALUES_2 = Object.freeze({
  "J": "0",
  "2": "1",
  "3": "2",
  "4": "3",
  "5": "4",
  "6": "5",
  "7": "6",
  "8": "7",
  "9": "8",
  "T": "9",
  "Q": "A",
  "K": "B",
  "A": "C",
} as const);

export const HAND_TYPE = Object.freeze({
  FIVE_OF_A_KIND: 6,
  FOUR_OF_A_KIND: 5,
  FULL_HOUSE: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  HIGH_CARD: 0,
} as const);

function main(): void {
  console.clear();
  const input = readFile(DAY, "input", true);
  if (!input.length) {
    console.error("Invalid input data");
    return;
  }

  exec("input1", () => input1(input));
  exec("input2", () => input2(input));
}

function input1(input: string[]): number {
  const hands = new Map<string[], HandDetail>();

  for (let line of input) {
    hands.set(...parseLine(line, CARD_VALUES_1));
  }

  // first to last
  const handsSorted = toSortedMap(hands, compareHands).reverse();

  return handsSorted.reduce((n, [, { bid }], i) => n + bid * (i + 1), 0);
}

function input2(input: string[]): number {
  const hands = new Map<string[], HandDetail>();

  for (let line of input) {
    hands.set(...parseLine(line, CARD_VALUES_2, true));
  }

  // first to last
  const handsSorted = toSortedMap(hands, compareHands).reverse();
  console.log(handsSorted);

  return handsSorted.reduce((n, [, { bid }], i) => n + bid * (i + 1), 0);
}

function parseLine(
  line: string,
  cardsValue: CardsValue,
  hasJokers = false
): [string[], HandDetail] {
  const [hand, bid] = line.split(" ");
  let cards = hand.split("");
  const handValue = convertHand(cards, cardsValue);

  if (hasJokers) {
    const cardsNotJoker = cards.filter((card) => card !== "J");

    if (cardsNotJoker.length > 0) {
      const groups = groupBy(cardsNotJoker);
      const [bestCard] = Object.entries(groups).reduce((best, group) => {
        if (best[1] > group[1]) return best;
        return group;
      });

      cards = cards.map((card) => (card === "J" ? bestCard : card));
    }
  }

  const value = {
    bid: +bid,
    handType: handScore(cards),
    handValue,
  };

  return [cards, value];
}

function convertHand(hand: string[], cardsValue: CardsValue): string {
  let res = "";
  for (let card of hand) {
    res += cardsValue[card as Card];
  }

  return res;
}

function compareHands<T extends [string[], HandDetail]>(
  [, { handType: handType1, handValue: handValue1 }]: T,
  [, { handType: handType2, handValue: handValue2 }]: T
) {
  if (handType1 != handType2) {
    return handType2 - handType1;
  }

  return parseInt(handValue2, 16) - parseInt(handValue1, 16);
}

function handScore(hand: string[]): HandTypeScore {
  const groups = groupBy(hand);

  switch (Object.keys(groups).length) {
    case 1: {
      return HAND_TYPE.FIVE_OF_A_KIND;
    }
    case 2: {
      const qty1 = Object.values(groups)[0];
      if (qty1 === 4 || qty1 === 1) {
        return HAND_TYPE.FOUR_OF_A_KIND;
      }
      return HAND_TYPE.FULL_HOUSE;
    }
    case 3: {
      const [qty1, qty2] = Object.values(groups);
      if (qty1 === 2 || qty2 === 2) {
        return HAND_TYPE.TWO_PAIR;
      }
      return HAND_TYPE.THREE_OF_A_KIND;
    }
    case 4: {
      return HAND_TYPE.ONE_PAIR;
    }
    default: {
      return HAND_TYPE.HIGH_CARD;
    }
  }
}

main();
