module Caesar where
import           Data.Char

let2int :: Char -> Int
let2int c = ord c - ord 'a'

int2let :: Int -> Char
int2let n = chr (ord 'a' + n)

bigLet2Int :: Char -> Int
bigLet2Int c = ord c - ord 'A'

bigInt2Let :: Int -> Char
bigInt2Let n = chr (ord 'A' + n)

shift :: Int -> Char -> Char
shift n c
  | isLower c = int2let ((let2int c + n) `mod` 26)
  | isUpper c = bigInt2Let ((bigLet2Int c + n) `mod` 26)
  | otherwise = c

encode :: Int -> String -> String
encode n xs = [shift n x | x <- xs]
