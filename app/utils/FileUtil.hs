module FileUtil (getFileLines, extractLinesAsNumbers) where

readLines :: FilePath -> IO [String]
readLines = fmap lines . readFile

getFileLines subPath =
  do
    -- putStrLn "Enter file name (Including full path) to read"
    -- fileName <- getLine

    readLines ("app/" ++ subPath)

extractLinesAsNumbers subPath =
  do
    lines <- getFileLines ("app/" ++ subPath)

    return (map read lines)
