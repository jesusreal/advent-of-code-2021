-- Extra preparation
-- - add day module to "advent-of-code.cabal"
-- - import day module in "Main.hs"

module DayX where

import FileUtil (extractLinesAsNumbers)

f linesAsNumbers =
  do
    return "here the result"

solution1 =
  do
    let linesAsNumbers = [1]
    -- linesAsNumbers <- extractLinesAsNumbers "day-x/input-1.txt"

    result <- f linesAsNumbers

    print "REPLACE_WITH_RESULT_DESCRIPTION 1"
    print result

solution2 =
  do
    let linesAsNumbers = [2]
    -- linesAsNumbers <- extractLinesAsNumbers "day-x/input-2.txt"

    result <- f linesAsNumbers

    print "REPLACE_WITH_RESULT_DESCRIPTION 2"
    print result
