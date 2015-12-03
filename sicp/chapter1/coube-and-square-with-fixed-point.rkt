#lang racket
(define tolerance 0.0000001)
(define (average a b) (/ (+ a b) 2))
(define (square x) (* x x ))

(define (fixed-point f first-guess)
  (define (close-enough? v1 v2)
    (< (abs (- v1 v2)) tolerance))
  (define (try guess)
    (let ((next (f guess)))
      (begin
        (display (exact->inexact guess))
        (newline)
        (if (close-enough? guess next)
          next
          (try next)))))
  (try first-guess))

(define (average-damp f)
  (lambda (x) (average x (f x))))

(define (sqrt x)
  (fixed-point (average-damp (lambda (y) (/ x y))) 1.0))


(define (coube-root x)
  (fixed-point (average-damp (lambda (y) (/ x (square y)))) 0.1))

(sqrt 4)
(coube-root 27)