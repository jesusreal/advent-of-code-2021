import { getSum, getAverage } from "../js-utils/js-utils.js";
import { input } from "./input.js";

const getFuelConsumptionForPosition = (
  crabPositions,
  targetPosition,
  getFuelConsumptionFn
) => {
  const fuelConsumptions = crabPositions.map((pos) => {
    return getFuelConsumptionFn(pos, targetPosition);
  });
  return getSum(fuelConsumptions);
};

const getTotalMinFuelConsumptionFactory = (
  crabPositions,
  getFuelConsumptionFn
) => {
  const getTotalMinFuelConsumption = (currentPos) => {
    const previousPos = currentPos - 1;
    const consumptionPreviousPos = getFuelConsumptionForPosition(
      crabPositions,
      previousPos,
      getFuelConsumptionFn
    );
    const consumptionCurrentPos = getFuelConsumptionForPosition(
      crabPositions,
      currentPos,
      getFuelConsumptionFn
    );
    if (consumptionPreviousPos < consumptionCurrentPos)
      return getTotalMinFuelConsumption(previousPos);

    const nextPos = currentPos + 1;
    const consumptionNextPos = getFuelConsumptionForPosition(
      crabPositions,
      nextPos,
      getFuelConsumptionFn
    );
    if (consumptionNextPos < consumptionCurrentPos)
      return getTotalMinFuelConsumption(nextPos);

    return consumptionCurrentPos;
  };

  return getTotalMinFuelConsumption;
};

const solution1 = () => {
  const fuelComsumptionCalculatorFn = (position, targetPosition) => {
    const diffFuel = Math.abs(targetPosition - position);
    return diffFuel;
  };

  const positionsAverage = getAverage(input);
  return getTotalMinFuelConsumptionFactory(
    input,
    fuelComsumptionCalculatorFn
  )(positionsAverage);
};

const solution2 = () => {
  const fuelComsumptionCalculatorFn = (position, targetPosition) => {
    const diff = Math.abs(targetPosition - position);
    let diffFuel = 0;
    for (let moveNumber = 1; moveNumber <= diff; moveNumber++) {
      diffFuel = diffFuel + moveNumber;
    }
    return diffFuel;
  };

  const positionsAverage = getAverage(input);
  return getTotalMinFuelConsumptionFactory(
    input,
    fuelComsumptionCalculatorFn
  )(positionsAverage);
};

console.log(
  "Solution 1. How much fuel must they spend to align to that position?",
  solution1()
);

console.log(
  "Solution 2. How much fuel must they spend to align to that position?",
  solution2()
);
