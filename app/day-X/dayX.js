// https://adventofcode.com/2021/day/X

import * as fs from "fs";

const getFileLines = () => {
  return fs.readFileSync("./input.txt", "utf8").split("\n");
};

const solution1 = () => {
  let data = getFileLines();

  return data;
};

const solution2 = () => {
};

console.log(
  "Solution 1. ",
  solution1()
);

console.log(
  "Solution 2. ",
  solution2()
);
