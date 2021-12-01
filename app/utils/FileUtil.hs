module FileUtil (getFileLines, extractLinesAsNumbers) where

readLines = fmap lines . readFile

getFileLines fileName =
  do
    -- putStrLn "Enter file name (Including full path) to read"
    -- fileName <- getLine

    readLines fileName

extractLinesAsNumbers subPath =
  do
    lines <- getFileLines ("app/" ++ subPath)

    return (map read lines)
