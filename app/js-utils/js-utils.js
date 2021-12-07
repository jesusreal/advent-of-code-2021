// const getExecTime = (method, sampleSize = 100) => {
//   results = [];
//   for (i = 0; i <= sampleSize; i++) {
//     console.time("measure time executions");
//     method();
//     const execTime = console.timeEnd("measure time executions");
//     results.push(execTime);
//   }

//   return getAverage(results);
// };

export const getSum = (values) => {
  return values.reduce((acc, value) => acc + value)
}

export const getAverage = (values) => {
  return Math.round(
    getSum(values) / values.length
  );
};

// const getMinValue = (values) => {
//   return values.reduce((acc, value) => {
//     return value < acc ? value : acc;
//   });
// };
