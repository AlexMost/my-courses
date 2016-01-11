#lang racket

(define (inc x) (+ x 1))
(define (double x) (+ x x))

(define (compose f1 f2)
  (lambda (x) (f1 (f2 x))))

(define (repeated func n)
  (if (<= n 1) func (compose func (repeated func (- n 1)))))


;> ((repeated inc 2) 0)
;2
;> ((repeated inc 10) 0)
;10
;> ((repeated double 2) 0)
;0
;> ((repeated double 2) 1)
;4
;> ((repeated double 2) 30)
;120
;> 