// https://adventofcode.com/2021/day/11

import * as fs from "fs";

let DEBUG = false;

let GRID_LENGTH = 10;
if (DEBUG) {
  GRID_LENGTH = 3;
}
const FLASH_LEVEL = 10;
const ENERGY_LEVEL_INCREMENT = 1;

const showGrid = (values, gridLength) => {
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

const flashIfNecessary = (energyLevels, position) => {
  const shouldFlash = energyLevels[position] === FLASH_LEVEL;

  if (!shouldFlash) return energyLevels;

  const adjacentPositionsFiltered = getAdjacentPositions(GRID_LENGTH, position);
  if (DEBUG) console.log(position, adjacentPositionsFiltered);

  energyLevels[position] = 0;

  adjacentPositionsFiltered.forEach((adjacentPosition) => {
    if (DEBUG) console.log(position, adjacentPosition);

    if (energyLevels[adjacentPosition] === 0) return;
    if (energyLevels[adjacentPosition] < FLASH_LEVEL) {
      energyLevels[adjacentPosition] =
        energyLevels[adjacentPosition] + ENERGY_LEVEL_INCREMENT;
    }

    energyLevels = flashIfNecessary(energyLevels, adjacentPosition);
  });

  showGrid(energyLevels, GRID_LENGTH);

  return energyLevels;
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

const getNewEnergyLevelsAfterStep = (energyLevels) => {
  let updatedEnergyLevels = energyLevels.map(
    (level) => level + ENERGY_LEVEL_INCREMENT
  );

  showGrid(updatedEnergyLevels, GRID_LENGTH);

  let energyLevelsAfterFlashes = [...updatedEnergyLevels];
  updatedEnergyLevels.map((_, index) => {
    energyLevelsAfterFlashes = flashIfNecessary(
      energyLevelsAfterFlashes,
      index
    );
  });

  return energyLevelsAfterFlashes;
};

const getTotalFlashedForStep = (energyLevels) => {
  return energyLevels.filter((level) => level === 0).length;
};

const solution1 = () => {
  let TOTAL_STEPS = 100;
  if (DEBUG) {
    TOTAL_STEPS = 50;
  }

  let flashesCount = 0;
  let energyLevels = getFileLines();

  for (let step = 1; step <= TOTAL_STEPS; step++) {
    if (DEBUG) {
      console.log(`===========    STEP ${step}      ==============`);
    }

    energyLevels = getNewEnergyLevelsAfterStep(energyLevels);

    flashesCount = flashesCount + getTotalFlashedForStep(energyLevels);
  }

  return flashesCount;
};

const solution2 = () => {
  let energyLevels = getFileLines();

  let currentStep = 0;
  let allOctopusesHaveFlashed = false;
  while (!allOctopusesHaveFlashed) {
    currentStep = currentStep + 1;

    energyLevels = getNewEnergyLevelsAfterStep(energyLevels);

    allOctopusesHaveFlashed =
      getTotalFlashedForStep(energyLevels) === energyLevels.length;
  }

  return currentStep;
};

console.log(
  "Solution 1. How many total flashes are there after 100 steps?",
  solution1()
);

console.log(
  "Solution 2. What is the first step during which all octopuses flash?",
  solution2()
);
