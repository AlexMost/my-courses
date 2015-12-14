fibs :: [Int]
fibs = 0:1:zipWith (+) fibs (tail fibs)

someDirtyWork:: [Int]
someDirtyWork = [fibs !! 5000000, fibs !! 500000]

main :: IO ()
main = do
  let
    [f1, f2] = someDirtyWork
    rr = show $ 2 * f1 + 2 * f2
  print $ show $ length rr
