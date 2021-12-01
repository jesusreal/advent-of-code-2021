module Day1 where

import FileUtil (extractLinesAsNumbers)

calculateTotalIncrements linesAsNumbers =
  do
    let minuends = drop 1 linesAsNumbers
    let subtrahends = reverse (drop 1 (reverse linesAsNumbers))

    let pairs = zip minuends subtrahends

    let dataPairsdiffs = [a - b | (a, b) <- pairs]

    let totalIncrements = length [diff | diff <- dataPairsdiffs, diff > 0]

    return totalIncrements

solution1 =
  do
    linesAsNumbers <- extractLinesAsNumbers "day-1/input-1.txt"

    result <- calculateTotalIncrements linesAsNumbers

    print "Number of times a depth measurement increases:"
    print result

solution2 =
  do
    linesAsNumbers <- extractLinesAsNumbers "day-1/input-2.txt"

    let one = linesAsNumbers
    let two = drop 1 linesAsNumbers
    let three = drop 2 linesAsNumbers

    let windows = zip3 one two three

    let windowsSum = [a + b + c | (a, b, c) <- windows]

    result <- calculateTotalIncrements windowsSum

    print "Number of times the sum of measurements in this sliding window increases:"
    print result
