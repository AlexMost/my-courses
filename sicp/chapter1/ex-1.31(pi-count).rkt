#lang racket
(define (cube x) (* x x x))
(define (inc x) (+ 1 x))
(define (id x) x)


; mul iterative
(define (mul term a next b)
  (define (iter a result)
    (if (> a b)
        result
        (iter (next a) (* result (term a)))))
    (iter a 1))


; mul recursive
(define (mul-rec term a next b)
  (if (> a b) 1
      (* (term a) (mul-rec term (next a) next b))))


(define (mul-simple a b)
  (mul id a inc b))

(define (mul-rec-simple a b)
  (mul-rec id a inc b))


; factorial
(define (factorial n) (mul-simple 1 n))

(define (pi-next n)
    (if (even? n)
        (/ (+ n 2) (+ n 1))
        (/ (+ n 1) (+ n 2))))

; pi count iterative
(define (pi n)
  (exact->inexact (* (mul pi-next 1 inc n) 4)))

; pi count recursive
(define (pi-rec n)
  (exact->inexact (* (mul-rec pi-next 1 inc n) 4)))

; > (pi 100)
; 3.1570301764551676
; > (pi 200)
; 3.1493784731686008
; > (pi 1000)
; 3.1431607055322663
; > (pi 1000000)