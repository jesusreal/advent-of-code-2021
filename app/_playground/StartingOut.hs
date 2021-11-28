module StartingOut where

import FileUtil (getFileLines)

doubleMe x = x + x

doubleUs x y = doubleMe x + doubleMe y

addPrefixToLines :: [[Char]] -> [[Char]]
addPrefixToLines = map addPrefixToLine

addPrefixToLine = ("const " ++)

-- let result = addPrefixToLines lines
-- putStr (unlines result)

-- print (addPrefixToLines lines)

solution =
  do
    lines <- getFileLines "app/day-1/data.txt"

    let linesWithPrefix = addPrefixToLines lines
    print linesWithPrefix

-- http://learnyouahaskell.com/starting-out#an-intro-to-lists
lists =
  do
    print ([1, 2, 3, 4] ++ [9, 10, 11, 12])

    print ('A' : " SMALL CAT")

    print ("Steve Buscemi" !! 6)

    let list1 = [4, 5, 6, 7, 8, 9, 10]
    let list2 = [4, 5, 6, 7, 7, 9, 10]

    print (length list1)

    -- if length list1 > 0
    if (null list1)
      then print ((head list1))
      else -- then print ((head list1) (tail list1) (init list1) (last list1))
        print ['K' .. 'Z']

    let takeElements = take 24 [13, 26 ..]

    let evenNumbers = print [x * 2 | x <- [1 .. 10], x * 2 > 12]

    --  How about if we wanted all numbers from 50 to 100 whose remainder when divided with the number 7 is 3?
    let numbersWithMod = print [x | x <- [50 .. 100], x `mod` 7 == 3]

    let nouns = ["hobo", "frog", "pope"]
    let adjectives = ["lazy", "grouchy", "scheming"]
    -- print [adjective ++ " " ++ noun | adjective <- adjectives, noun <- nouns]

    -- which right triangle that has integers for all sides and all sides equal to or smaller than 10 has a perimeter of 24?
    let maxSideLength = 10
    let perimeter = 24

    print "Tuples"

    let trianglesTuple maxSideLength = [(a, b, c) | c <- [1 .. maxSideLength], b <- [1 .. c], a <- [1 .. b], a ^ 2 + b ^ 2 == c ^ 2]
    let trianglesTuple' triangles perimeter = [(x, y, z) | (x, y, z) <- triangles, x + y + z == perimeter]

    let triangles = trianglesTuple maxSideLength
    let triangles' = trianglesTuple' triangles perimeter

    print triangles
    print triangles'

    print "Lists"

    let trianglesList maxSideLength = [[a, b, c] | c <- [1 .. maxSideLength], b <- [1 .. c], a <- [1 .. b], a ^ 2 + b ^ 2 == c ^ 2]
    let trianglesList' triangles perimeter = [x | x <- triangles, sum x == perimeter]

    let triangles = trianglesList maxSideLength
    let triangles' = (trianglesList' triangles perimeter)

    print triangles
    print triangles'