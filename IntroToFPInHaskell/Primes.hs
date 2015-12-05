module Primes where
primes = sieve [2..]
sieve (p : xs) = p : sieve [x | x <− xs, x ‘mod‘ p > 0]
