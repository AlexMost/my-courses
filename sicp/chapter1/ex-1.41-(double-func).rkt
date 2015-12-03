#lang racket
(define (inc x) (+ 1 x))
(define (double p)
  (lambda (x) (p (p x))))