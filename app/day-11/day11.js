// https://adventofcode.com/2021/day/11

import * as fs from "fs";

let DEBUG = false;

const showIt = (values, gridLength) => {
  if (!DEBUG) return;
  console.log();
  console.log();
  Array.from({ length: gridLength }, (value, index) => {
    const b = values
      .map((value) => value.toString())
      .map((value) => (value.length === 2 ? value : ` ${value}`))
      .slice(index * gridLength, (index + 1) * gridLength)
      .join(" ");
    console.log(b);
    console.log();
  });
};

const getAdjacentPositions = (gridLength, position) => {
  const row = Math.floor(position / gridLength);
  const column = position % gridLength;

  const columns = [column - 1, column, column + 1]
    .filter((column) => column >= 0)
    .filter((column) => column < gridLength);

  const rows = [row - 1, row, row + 1]
    .filter((row) => row >= 0)
    .filter((row) => row < gridLength);

  return rows
    .flatMap((row) => {
      return columns.map((column) => row * gridLength + column);
    })
    .filter((pos) => pos !== position);
};

const getFileLines = () => {
  if (DEBUG) return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return fs
    .readFileSync("./input.txt", "utf8")
    .split("\n")
    .flatMap((line) => line.split("").map((digit) => parseInt(digit)));
};

const solution1 = () => {
  let TOTAL_STEPS = 100;
  let GRID_LENGTH = 10;
  if (DEBUG) {
    TOTAL_STEPS = 50;
    GRID_LENGTH = 3;
  }
  const FLASH_LEVEL = 10;
  const ENERGY_LEVEL_INCREMENT = 1;

  let flashesCount = 0;
  let energyLevels = getFileLines();

  const flashIfNecessary = (energyLevels, position) => {
    if (energyLevels[position] < FLASH_LEVEL) return energyLevels;

    energyLevels[position] = 0;

    const adjacentPositionsFiltered = getAdjacentPositions(
      GRID_LENGTH,
      position
    );

    if (DEBUG) console.log(position, adjacentPositionsFiltered);

    adjacentPositionsFiltered.forEach((adjacentPosition) => {
      if (DEBUG) console.log(position, adjacentPosition);

      const alreadyFlashed = energyLevels[adjacentPosition] === 0;
      if (alreadyFlashed) return;

      energyLevels[adjacentPosition] =
        energyLevels[adjacentPosition] + ENERGY_LEVEL_INCREMENT;

      energyLevels = flashIfNecessary(energyLevels, adjacentPosition);
    });

    showIt(energyLevels, GRID_LENGTH);

    return energyLevels;
  };

  for (let step = 0; step < TOTAL_STEPS; step++) {
    if (DEBUG) {
      console.log(`===========    STEP ${step}      ==============`);
    }

    energyLevels = energyLevels.map((level) => level + ENERGY_LEVEL_INCREMENT);

    showIt(energyLevels, GRID_LENGTH);

    energyLevels.map((_, index) => {
      energyLevels = flashIfNecessary(energyLevels, index);
    });

    const flashesInStep = energyLevels.filter((level) => level === 0).length;
    flashesCount = flashesCount + flashesInStep;

    showIt(energyLevels, GRID_LENGTH);
  }

  return flashesCount;
};

console.log(
  "Solution 1. How many total flashes are there after 100 steps?",
  solution1()
);

// console.log("Solution 2. ", solution2());
