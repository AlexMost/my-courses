#lang racket
(define (change-count amount) (cc amount 5))


(define (cc amount kind-of-coins)
  (cond ((= amount 0) 1)
        ((or (< amount 0) (= kind-of-coins 0)) 0)
        (else
         (+ (cc amount (- kind-of-coins 1))
            (cc (- amount (get-coin-val kind-of-coins)) kind-of-coins)))))


(define (get-coin-val koin)
  (cond
    [(= koin 1) 1]
    [(= koin 2) 5]
    [(= koin 3) 10]
    [(= koin 4) 25]
    [(= koin 5) 50]))

(change-count 100)