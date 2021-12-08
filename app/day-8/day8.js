// https://adventofcode.com/2021/day/8

import { input } from "./input.js";

const solution1 = () => {
  const LENGHTS_OF_DIGITS_WITH_UNIQUE_AMOUNT_OF_SEGMENTS = [2, 3, 4, 7];

  const digitsWithUniqueNumberOfSegments = input
    .map((line) => line.split(" | "))
    .map((splittedLine) => splittedLine.pop())
    .flatMap((digits) => digits.split(" "))
    .filter((digit) => LENGHTS_OF_DIGITS_WITH_UNIQUE_AMOUNT_OF_SEGMENTS.includes(digit.length))
    
  return digitsWithUniqueNumberOfSegments.length;
};

const solution2 = () => {};

console.log(
  "Solution 1. In the output values, how many times do digits 1, 4, 7, or 8 appear?",
  solution1()
);

console.log("Solution 2. ", solution2());
