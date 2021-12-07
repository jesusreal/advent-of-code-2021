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

const getSum = (values) => {
  return values.reduce((acc, value) => acc + value)
}

const getAverage = (values) => {
  return Math.round(
    getSum(values) / input.length
  );
};

// const getMinValue = (values) => {
//   return values.reduce((acc, value) => {
//     return value < acc ? value : acc;
//   });
// };
