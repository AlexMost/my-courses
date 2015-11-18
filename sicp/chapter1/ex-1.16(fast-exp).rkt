#lang racket
(define (square x) (* x x))
(define (even? n) (= (remainder n 2) 0))

(define (fast-exp b n)
  (define (fast-exp-iter a b n)
    (cond [(= n 0) a]
          [(even? n) (fast-exp-iter a (square b) (/ n 2))]
          [else (fast-exp-iter (* a b) b (- n 1))]))
  (fast-exp-iter 1 b n))