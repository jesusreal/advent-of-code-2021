-- http://learnyouahaskell.com
-- https://adventofcode.com/2021/day/2#

module Day2 where

import Data.Char (digitToInt)
import Data.List (isPrefixOf)
import FileUtil (getFileLines)

solution1 =
  do
    inputData <- getFileLines "day-2/input-1.txt"

    let upList = [last a | a <- inputData, "up" `isPrefixOf` a]
    let depthDecrease = sum [digitToInt b | b <- upList]
    print depthDecrease

    let downList = [last a | a <- inputData, "down" `isPrefixOf` a]
    let depthIncrease = sum [digitToInt b | b <- downList]
    print depthIncrease

    let depth = depthIncrease - depthDecrease
    print depth

    let forwardList = [last a | a <- inputData, "forward" `isPrefixOf` a]
    let horizontalPos = sum [digitToInt b | b <- forwardList]

    let result = depth * horizontalPos

    print "What do you get if you multiply your final horizontal position by your final depth?"
    print result

solution2 =
  do
    inputData <- getFileLines "day-2/input-2.txt"

    -- result <- f inputData

    print "REPLACE_WITH_RESULT_DESCRIPTION 2"

-- print result
