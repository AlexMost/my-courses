#lang racket

; generic sum function
(define (inc x) (+ x 1))
(define (cube x) (* x x x))
(define (identity x) x)

(define (sum term a  next b)
  (if (> a b)
      0
      (+ (term a)
         (sum term (next a) next b))))

; sum cubes
(define (sum-cubes a b)
  (sum cube a inc b))

; sum ints
(define (sum-ints a b)
  (sum identity a inc b))

; simple integral calculation
(define (integral f a b dx)
  (define (add-dx a) (+ a dx))
  (* (sum f (+ a (/ dx 2)) add-dx b) dx))

; Simpson integral calculation
(define (simpson f a b n)
  (define h (/ (- b a) n))
  (define (yk k c) (* c (f (+ a (* k h)))))
  (define (term x) (yk x (cond [(= x 0) 1] [(even? x) 2] [else 4])))
  (exact->inexact (* (/ h 3) (sum term 0 inc n))))
  



