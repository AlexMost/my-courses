#lang racket
(define (cube x) (* x x x))
(define (inc x) (+ 1 x))
(define (id x) x)

(define (sum term a next b)
  (define (iter a result)
    (if (> a b)
        result
        (iter (next a) (+ result (term a)))))
    (iter a 0))

(define (cube-sum a b)
  (sum cube a inc b))

(define (simple-sum a b)
  (sum id a inc b))


; > (simple-sum 1 2)
; 3
; > (simple-sum 1 10)
; 55
; > 