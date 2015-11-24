#lang racket
(define (cube x) (* x x x))
(define (inc x) (+ 1 x))
(define (id x) x)

; accumulate recursive

(define (accumulate combiner null-value term a next b)
  (if (> a b)
      null-value
      (combiner (term a) (accumulate combiner null-value term (next a) next b))))

(define (sum a b)
  (accumulate + 0 id a inc b))

; > (sum 1 3)
; 6
; > (sum 1 4)
; 10
; > 

(define (product a b)
  (accumulate * 1 id a inc b))

; > (product 1 3)
; 6
; > (product 1 4)
; 24
; >

; accumulate iterative

(define (acc-iter combiner null-value term a next b)
  (define (iter a result)
    (if (> a b)
        result
        (iter (next a) (combiner result (term a)))))
    (iter a null-value))

(define (sum-iter a b)
  (acc-iter + 0 id a inc b))

; > (sum-iter 1 3)
; 6
; > (sum-iter 1 4)
; 10
; >

(define (product-iter a b)
  (acc-iter * 1 id a inc b))

; > (product-iter 1 3)
; 6
; > (product-iter 1 4)
; 24
; > 
