module HW10 where

removeone x [] = []
removeone x (y: ys)
  | x == y = ys
  | otherwise = y: removeone x ys


isChoice [] _ = True
isChoice (x: xs) [] = False
isChoice (x: xs) ys = x `elem` ys && isChoice xs (removeone x ys)
