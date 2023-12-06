/// <reference path="main.d.ts"/>

import { exec, multiply, sum, readFile } from "../utils";

function main() {
  console.clear();
  const input = readFile(3, "input");
  if (!input.length) return;

  exec("input1", () => input1(input)); // 519444
  exec("input2", () => input2(input)); // 74528807
}

function input1(input: string[]): number {
  let previousNumbers: numberWithIndex[] = [];
  let previousSymbols: number[] = [];
  let sum = 0;

  input.forEach((line) => {
    const currentNumbers: numberWithIndex[] = [];
    const currentSymbols: number[] = [];

    // Rempli les tableaux de nombres et de symboles
    const regex = /(?<number>\d+)|(?<symbol>[^.])/g;
    const matches = Array.from(line.matchAll(regex)) as Match[];
    matches.forEach((match) => {
      if (isMatchWithNumber(match)) {
        currentNumbers.push({
          index: match.index,
          value: +match[0],
        });
        return;
      }
      currentSymbols.push(match.index);
    });

    // Vérifie les nombres de la ligne précédentes qui n'avaient pas de symbole autour
    previousNumbers.forEach((numberWithIndex) => {
      if (isPartNumber(numberWithIndex, currentSymbols, false)) {
        sum += numberWithIndex.value;
        return;
      }
    });
    previousNumbers = [];

    // Vérifie si les nombres de la ligne ont un symbole autour (exclut la ligne du dessous)
    currentNumbers.forEach((numberWithIndex) => {
      if (
        isPartNumber(
          numberWithIndex,
          [...currentSymbols, ...previousSymbols],
          false
        )
      ) {
        sum += numberWithIndex.value;
        return;
      }
      // Si pas de symbole, on vérifie ca à la ligne suivante
      previousNumbers.push(numberWithIndex);
    });

    previousSymbols = currentSymbols;
  });

  return sum;
}

function input2(input: string[]): number {
  let previousNumbers: numberWithIndex[] = [];
  let previousSymbols: number[] = [];
  let gears: Gear = {};

  const updateGear = (
    indexesGear: number[],
    value: number,
    row: number,
    gearToUpdate: Gear
  ) => {
    for (const iGear of indexesGear) {
      gearToUpdate[row] = gearToUpdate[row] ?? {};
      gearToUpdate[row][iGear] = gearToUpdate[row][iGear] ?? [];
      gearToUpdate[row][iGear].push(value);
    }
  };

  input.forEach((line, i) => {
    const currentNumbers: numberWithIndex[] = [];
    const currentSymbols: number[] = [];

    // Rempli les tableaux de nombres et de symboles
    const regex = /(?<number>\d+)|(?<symbol>[\*])/g;
    const matches = Array.from(line.matchAll(regex)) as Match[];
    matches.forEach((match) => {
      if (isMatchWithNumber(match)) {
        currentNumbers.push({
          index: match.index,
          value: +match[0],
        });
        return;
      }
      currentSymbols.push(match.index);
    });

    // Vérifie les nombres de la ligne précédentes qui n'avaient pas de symbole autour
    previousNumbers.forEach((numberWithIndex) => {
      const indexesGear = isPartNumber(numberWithIndex, currentSymbols, true);
      updateGear(indexesGear, numberWithIndex.value, i, gears);
    });
    previousNumbers = [];

    // Vérifie si les nombres de la ligne ont un symbole autour (exclut la ligne du dessous)
    currentNumbers.forEach((numberWithIndex) => {
      const indexesGear = isPartNumber(numberWithIndex, currentSymbols, true);
      updateGear(indexesGear, numberWithIndex.value, i, gears);
      const indexesGear2 = isPartNumber(numberWithIndex, previousSymbols, true);
      updateGear(indexesGear2, numberWithIndex.value, i - 1, gears);

      // Si pas de symbole, on vérifie ca à la ligne suivante
      previousNumbers.push(numberWithIndex);
    });

    previousSymbols = currentSymbols;
  });

  const arrGears = Object.values(gears)
    .map((value) => Object.values(value))
    .flat()
    .filter((arr) => arr.length === 2);

  return sum(arrGears.map(multiply));
}

main();

function isMatchWithNumber(match: Match): match is MatchWithNumber {
  return Boolean(match?.groups?.number);
}

function isPartNumber(
  number: numberWithIndex,
  symbolIndexes: number[],
  filter: true
): number[];
function isPartNumber(
  number: numberWithIndex,
  symbolIndexes: number[],
  filter: false
): boolean;
function isPartNumber(
  number: numberWithIndex,
  symbolIndexes: number[],
  filter: boolean
) {
  const indexStart = number.index - 1;
  const indexEnd = number.index + number.value.toString().length;

  if (filter) {
    return symbolIndexes.filter(
      (index) => indexStart <= index && index <= indexEnd
    );
  } else {
    return symbolIndexes.some(
      (index) => indexStart <= index && index <= indexEnd
    );
  }
}
