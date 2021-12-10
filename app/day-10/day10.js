// https://adventofcode.com/2021/day/10

import * as fs from "fs";

import { getSum } from "../js-utils/js-utils.js";

const getFileLines = () => fs.readFileSync("./input.txt", "utf8").split("\n");

const openingChars = ["(", "[", "{", "<"];
const closingChars = [")", "]", "}", ">"];

const getClosingChar = (openingChar) => {
  const index = openingChars.indexOf(openingChar);
  return closingChars[index];
};

const extractDataFromLines = (line) => {
  const isOpeningChar = (char) => openingChars.includes(char);
  const isClosingChar = (char) => closingChars.includes(char);
  const currentOpeningChars = [];

  for (let char of line) {
    if (isOpeningChar(char)) currentOpeningChars.push(char);
    if (isClosingChar(char)) {
      const lastOpeningChar = currentOpeningChars.pop();
      const doCharsMatch = getClosingChar(lastOpeningChar) === char;
      if (!doCharsMatch) {
        return {
          type: "corrupt",
          charsForPointsCount: [char]
        };
      }
    }
  }

  return {
    type: "incomplete",
    charsForPointsCount: currentOpeningChars
  };
};

const isLineCorrupt = (report) => report.type === "corrupt";

const extractCharsForPointsCount = ({ charsForPointsCount }) => charsForPointsCount;

const transformToPoints = (points, chars) => chars.map((char) => points[char]);

const solution1 = () => {
  const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const pointsByLine = getFileLines()
    .map(extractDataFromLines)
    .filter(isLineCorrupt)
    .map(extractCharsForPointsCount)
    .flatMap((chars) => transformToPoints(points, chars));

  return getSum(pointsByLine);
};

const solution2 = () => {
  const points = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const getCorrespondingClosingSequence = (openingChars) => {
    return openingChars.map(getClosingChar).reverse();
  };

  const sumPointsInLine = (charPoints) => {
    return charPoints.reduce((sum, charPoint) => sum * 5 + charPoint, 0);
  };

  const sortNumbersAsc = (a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  };

  const sumsSorted = getFileLines()
    .map(extractDataFromLines)
    .filter((line) => !isLineCorrupt(line))
    .map(extractCharsForPointsCount)
    .map(getCorrespondingClosingSequence)
    .map((chars) => transformToPoints(points, chars))
    .map(sumPointsInLine)
    .sort(sortNumbersAsc);

  const index = (sumsSorted.length - 1) / 2;
  const result = sumsSorted[index];

  return result;
};

console.log(
  "Solution 1. What is the total syntax error score for those errors?",
  solution1()
);

console.log("Solution 2. What is the middle score? ", solution2());
