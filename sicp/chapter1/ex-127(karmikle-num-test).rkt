#lang racket

; find divisor function
(define (divides? a b) (= (remainder b a) 0))

(define (square n) (* n n))

(define (smallest-divisor n)
  (find-divisor n 2))

(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
        ((divides? test-divisor n) test-divisor)
        (else (find-divisor n (+ test-divisor 1)))))

; ----

(define (even? n) (= (remainder n 2) 0))

(define (expmod base exp m)
  (cond ((= exp 0) 1)
        ((even? exp)(remainder (square (expmod base (/ exp 2) m))m))
        (else (remainder (* base (expmod base (- exp 1) m)) m))))

(define (prime? n)
  (define (prime-iter a)
    (if (= a 1)
        #f
        (or (= (expmod a n n) a) (prime-iter (- a 1)))))
  (prime-iter (- n 1)))

; > (prime? 561)
; #t
; > (smallest-divisor 561)
; 3
; > 