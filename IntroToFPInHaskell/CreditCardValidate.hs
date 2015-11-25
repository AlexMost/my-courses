import           Data.Char

toDigits :: Int -> [Int]
toDigits = map digitToInt . show

doubleSecond [] = []
doubleSecond [x] = [x]
doubleSecond (x:y:xs) = x : (2 * y) : doubleSecond xs

sumDigits [] = 0
sumDigits (x:xs)
  | x >= 10 = sumDigits (toDigits x) + sumDigits xs
  | otherwise = x + sumDigits xs

isValidCard = (== 0) . (`mod` 10) . sumDigits . doubleSecond . reverse . toDigits

numValid xs = sum . map (\_ -> 1) $ filter isValidCard xs
