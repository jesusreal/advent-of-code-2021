import Control.Monad (join)
import Data.IORef (readIORef)
import System.IO
import Text.PrettyPrint.Annotated.HughesPJClass (Pretty (pPrintList))

readDataFrom fileHandle =
  do
    isFileEnd <- hIsEOF fileHandle
    if isFileEnd
      then return ""
      else do
        info <- hGetLine fileHandle
        putStrLn info

        let a = addPrefixToLine info
        putStrLn a

        readDataFrom fileHandle

addPrefixToLines = map addPrefixToLine

addPrefixToLine = ("const " ++)

main =
  do
    putStrLn "Enter file name (Including full path) to read"
    fileName <- getLine
    fileHandle <- openFile fileName ReadMode
    readDataFrom fileHandle

    lines <- readLines fileName
    -- lines <- readLines2 fileName

    let result = addPrefixToLines lines
    putStr (unlines result)

    print (addPrefixToLines lines)

readLines = fmap lines . readFile

readLines2 fileName =
  do
    content <- readFile fileName
    return (lines content)
