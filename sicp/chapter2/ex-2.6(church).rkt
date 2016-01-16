#lang racket
(define (inc n) (+ 1 n))

(define zero (lambda (f) (lambda (x) x)))
(define one (lambda (f) (lambda (x) (f x))))
(define two (lambda (f) (lambda (x) (f (f x)))))
(define three (lambda (f) (lambda (x) (f (f (f x))))))

(define (add a b)
  (lambda (f)
    (lambda (x)
      ((a f) ((b f) x)))))

(define (church->int fn) ((fn inc) 0))

; > (define four (add two two))
; > (church->int four)
; 4
; > 