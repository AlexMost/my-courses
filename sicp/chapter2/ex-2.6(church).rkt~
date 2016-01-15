#lang racket
(define (inc n) (+ 1 n))

(define zero (lambda (f) (lambda (x) x)))

(define one (lambda (f) (lambda (x) (f x))))

(define two (lambda (f) (lambda (x) (f (f x)))))


(define (church->int fn)
  ((fn inc) 0))