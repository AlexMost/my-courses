#lang racket
(require math/base)

; fast prime
(define (even? n) (= (remainder n 2) 0))

(define (square x) (* x x))

(define (expmod base exp m)
  (cond ((= exp 0) 1)
        ((even? exp)(remainder (square (expmod base (/ exp 2) m))m))
        (else (remainder (* base (expmod base (- exp 1) m)) m))))

; Ferma test
(define (fermat-test n)
  (define (try-it a)
    (= (expmod a n n) a))
  (try-it (+ 1 (random-natural (- n 1)))))

(define (fast-prime? n times)
  (cond ((= times 0) true)
        ((fermat-test n)
         (fast-prime? n (- times 1)))
        (else false)))

(define (prime? n) (fast-prime? n 10))

; accumulate function
(define (inc x) (+ 1 x))
(define (id x) x)

(define (accumulate filter combiner null-value term a next b)
  (cond [(> a b) null-value]
        [(filter a) (combiner (term a) (accumulate filter combiner null-value term (next a) next b))]
        [else (accumulate filter combiner null-value term (next a) next b)]))

(define (sum-prime a b)
  (accumulate prime? + 0 id a inc b))

; > (sum-prime 2 10)
; 17
; > (+ 2 3 5 7)
; 17
