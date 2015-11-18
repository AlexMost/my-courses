#lang racket
(define (even? n) (= (remainder n 2) 0))
(define (halve n) (/ n 2))
(define (double n) (+ n n))

; linear iterative (tail recursion)
(define (** x y)
  (define (iter a b p)
    (cond [(= b 0) p]
          [(even? b)(iter (double a) (halve b) p)]
          [else (iter a (- b 1) (+ a p))]))
  (iter x y 0))