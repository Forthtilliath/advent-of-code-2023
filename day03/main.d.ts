type numberWithIndex = {
  index: number;
  value: number;
};

type StringNumber = `${number}`;

type MatchWithNumber = [match: StringNumber, StringNumber, undefined] & {
  index: number;
  input: string;
  groups: { number: StringNumber; symbol: undefined };
};

type MatchWithSymbol = [match: string, undefined, string] & {
  index: number;
  input: string;
  groups?: { number: undefined; symbol: string };
};

type Match = MatchWithNumber | MatchWithSymbol;

// type Gear = Record<number,Record<number, number[]>>;
type Gear = {
  [row: number]: {
    [column: number]: number[]
  }
}

// type Gear = number[][][]
// gears[1][5] = [512, 145]