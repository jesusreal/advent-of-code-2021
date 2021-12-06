const input = [
4,5,3,2,3,3,2,4,2,1,2,4,5,2,2,2,4,1,1,1,5,1,1,2,5,2,1,1,4,4,5,5,1,2,1,1,5,3,5,2,4,3,2,4,5,3,2,1,4,1,3,1,2,4,1,1,4,1,4,2,5,1,4,3,5,2,4,5,4,2,2,5,1,1,2,4,1,4,4,1,1,3,1,2,3,2,5,5,1,1,5,2,4,2,2,4,1,1,1,4,2,2,3,1,2,4,5,4,5,4,2,3,1,4,1,3,1,2,3,3,2,4,3,3,3,1,4,2,3,4,2,1,5,4,2,4,4,3,2,1,5,3,1,4,1,1,5,4,2,4,2,2,4,4,4,1,4,2,4,1,1,3,5,1,5,5,1,3,2,2,3,5,3,1,1,4,4,1,3,3,3,5,1,1,2,5,5,5,2,4,1,5,1,2,1,1,1,4,3,1,5,2,3,1,3,1,4,1,3,5,4,5,1,3,4,2,1,5,1,3,4,5,5,2,1,2,1,1,1,4,3,1,4,2,3,1,3,5,1,4,5,3,1,3,3,2,2,1,5,5,4,3,2,1,5,1,3,1,3,5,1,1,2,1,1,1,5,2,1,1,3,2,1,5,5,5,1,1,5,1,4,1,5,4,2,4,5,2,4,3,2,5,4,1,1,2,4,3,2,1
];

const TIMER_GENERATING_NEW_LANTERNFISH = 0

const solution1 = (totalDays) => {  
  let result = input;

  for (let i = 1; i <= totalDays; i++) {
    const newLanternfish = result
      .filter(timer => timer === TIMER_GENERATING_NEW_LANTERNFISH)
      .map(_ => 8);
    result = result
      .map((timer) => (timer === 0) ? 6 : timer - 1)
      .concat(newLanternfish);
  }

  return result.length;
};


const solution2 = (totalDays) => {  
  let timerCounters = Array(9).fill(0,0,9)

  // Create initial array based on input data
  for (let i = 0; i < input.length; i++) {
    const timer = input[i];
    timerCounters[timer] = timerCounters[value] + 1;
  }

  // Rearrange array of counters on every passed day
  for (let i = 1; i <= totalDays; i++) {
    const zeroDays = timerCounters.shift();
    timerCounters[8] = zeroDays;
    timerCounters[6] = timerCounters[6] + zeroDays;
  }
  
  const total = timerCounters.reduce((acc, totalForSpecificDay) =>  acc + totalForSpecificDay)

  return total;
};


console.log(
  "How many lanternfish would there be after 80 days?",
  solution1(80)
);

console.log(
  "How many lanternfish would there be after 256 days?",
  solution2(256)
);

