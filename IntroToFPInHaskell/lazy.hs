fibs = 0:1:zipWith (+) fibs (tail fibs)

someDirtyWork = [fibs !! 5000000, fibs !! 500000]

main = do
  let
    [f1, f2] = someDirtyWork
    rr = show $ f1 + f2
  print $ show $ length rr
