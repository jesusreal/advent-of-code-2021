module FileUtil (getFileLines) where

readLines = fmap lines . readFile

getFileLines fileName =
  do
    -- putStrLn "Enter file name (Including full path) to read"
    -- fileName <- getLine

    readLines fileName
