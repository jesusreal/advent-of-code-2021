// https://adventofcode.com/2021/day/13

import * as fs from "fs";

const getFileLines = () => {
  const lines = fs.readFileSync("./input.txt", "utf8").split("\n");
  const lineSeparatorIndex = lines.indexOf("");

  const foldingInstructionLines = lines.slice(lineSeparatorIndex + 1);
  let foldingInstructions = foldingInstructionLines
    .map((line) => line.split("="))
    .map(([axis, foldPosition]) => ({
      axis: axis[axis.length - 1],
      foldPosition: parseInt(foldPosition),
    }));

  return {
    coordinates: lines.slice(0, lineSeparatorIndex),
    foldingInstructions,
  };
};

const getMaxPositionInAxis = (axis, coordinates) => {
  const axisIndex = axis === "x" ? 0 : 1;

  return coordinates
    .map((coordinateString) => coordinateString.split(","))
    .map((coordinateArray) => coordinateArray[axisIndex])
    .map((position) => parseInt(position))
    .reduce((acc, x) => (acc > x ? acc : x));
};

const foldX = (coordinates, foldPosition) => {
  const maxY = getMaxPositionInAxis("y", coordinates);

  const newCoordinates = [];

  for (let x = 1; x <= foldPosition; x++) {
    for (let y = 0; y <= maxY; y++) {
      const a = `${foldPosition - x},${y}`;
      const b = `${foldPosition + x},${y}`;

      const foundA = coordinates.find((item) => item === a);
      const foundB = coordinates.find((item) => item === b);

      if (foundA || foundB) newCoordinates.push(a);
    }
  }
  return newCoordinates;
};

const foldY = (coordinates, foldPosition) => {
  const maxX = getMaxPositionInAxis("x", coordinates);

  const newCoordinates = [];

  for (let y = 1; y <= foldPosition; y++) {
    for (let x = 0; x <= maxX; x++) {
      const a = `${x},${foldPosition - y}`;
      const b = `${x},${foldPosition + y}`;

      const foundA = coordinates.find((item) => item === a);
      const foundB = coordinates.find((item) => item === b);

      if (foundA || foundB) newCoordinates.push(a);
    }
  }
  return newCoordinates;
};

const fold = (coordinates, foldingInstruction) => {
  const { axis, foldPosition } = foldingInstruction;

  return axis === "x"
    ? foldX(coordinates, foldPosition)
    : foldY(coordinates, foldPosition);
};

const getVisualResult = (coordinates) => {
  const result = [];
  const maxX = getMaxPositionInAxis("x", coordinates);
  const maxY = getMaxPositionInAxis("y", coordinates);

  for (let y = 0; y <= maxY; y++) {
    const row = Array.from({ length: maxX + 1 }, (_, index) => {
      const coordinate = `${index},${y}`;
      const coordinateFound = coordinates.find((item) => item === coordinate);
      return coordinateFound ? "#" : ".";
    }).join(" ");
    result.push(row);
  }

  return result;
};

const solution1 = () => {
  const data = getFileLines();

  const foldingInstruction = data.foldingInstructions[0];
  const newCoordinates = fold(data.coordinates, foldingInstruction);

  return newCoordinates.length;
};

const solution2 = () => {
  const data = getFileLines();

  const newCoordinates = data.foldingInstructions.reduce(
    (newCoordinates, foldingInstruction) => {
      return fold(newCoordinates, foldingInstruction);
    },
    data.coordinates
  );

  return getVisualResult(newCoordinates);
};

console.log(
  "Solution 1. How many dots are visible after completing just the first fold instruction on your transparent paper?",
  solution1()
);

console.log(
  "Solution 2. What code do you use to activate the infrared thermal imaging camera system?",
  "Look at the result! :)",
  solution2()
);
