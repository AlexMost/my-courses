module Exponent where
import           Data.List

(^^^^) :: (Integral a) => a -> a -> a
m ^^^^ 0 = 1
m ^^^^ n = m * m ^^^^ (n - 1)

and' [] = True
and' (x:xs) = x && and' xs

conc [] = []
conc (xs: xss) = xs ++ conc xss

merge [] ys = ys
merge xs [] = xs
merge (x:xs) (y:ys)
  | x <= y = x: merge xs (y:ys)
  | otherwise = y: merge (x:xs) ys

halve :: [a] -> ([a], [a])
halve xs = splitAt (length xs `div` 2) xs

msort [] = []
msort [x] = [x]
msort xs = merge (msort ys) (msort zs)
  where (ys, zs) = halve xs
