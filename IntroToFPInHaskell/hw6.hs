module Hw6 where

unfold p h t x
  | p x = []
  | otherwise = h x : unfold p h t (t x)


int2bin = unfold (==0) (`mod` 2) (`div` 2)
_map f = unfold null (f . head) tail
_iterate f = unfold (const False) id f
