#lang racket
(define (even? n) (= (remainder n 2) 0))
(define (halve n) (/ n 2))
(define (double n) (+ n n))

(define (* a b)
    (cond [(= b 0) 0]
          [(even? b)(* (double a) (halve b))]
          [else (+ a (* a (- b 1)))]))
    

    