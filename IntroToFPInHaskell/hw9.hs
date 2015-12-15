module HW9 where

import           Data.Char
import           Data.List

data Nat = Zero
          | Succ Nat
          deriving Show

nat2Int Zero = 0
nat2Int (Succ n) = nat2Int n + 1

nat2Int' = head . m
  where m Zero = [0]
        m (Succ n) = [sum [x | x <- (1: m n)]]
