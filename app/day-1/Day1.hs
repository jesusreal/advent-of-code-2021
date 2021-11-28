module Day1 where

import FileUtil (getFileLines)

solution =
  do
    lines <- getFileLines "app/day-1/data.txt"

    print lines
