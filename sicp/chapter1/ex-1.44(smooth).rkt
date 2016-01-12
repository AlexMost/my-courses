#lang racket

(define (inc x) (+ x 1))
(define (double x) (+ x x))

(define (compose f1 f2)
  (lambda (x) (f1 (f2 x))))

(define (repeated func n)
  (if (<= n 1) func (compose func (repeated func (- n 1)))))

(define (smooth f dx)
  (lambda (x) (/ (+ (f x) (f (- x dx)) (f (+ x dx))) 3)))

