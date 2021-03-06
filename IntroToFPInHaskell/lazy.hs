fibs = 0:1:zipWith (+) fibs (tail fibs)

someDirtyWork = [fibs !! 40000000, fibs !! 5000000]

removeone x [] = []
removeone x (y: ys)
  | x == y = ys
  | otherwise = y: removeone x ys


isChoice [] _ = True
isChoice (x: xs) [] = False
isChoice (x: xs) ys = x `elem` ys && isChoice xs (removeone x ys)

main = do
  let
    [f1, f2] = someDirtyWork
    rr = show $  (f1 + f2)/2
  print $ show $ length rr
