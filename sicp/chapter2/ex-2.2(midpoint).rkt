#lang racket
(define (make-segment p1 p2)
  (cons p1 p2))

(define (start-segment s) (car s))
(define (end-segment s) (cdr s))

(define (make-point x y)
  (cons x y))

(define (x-point p) (car p))
(define (y-point p) (cdr p))

(define (print-point p)
  (newline)
  (display "(")
  (display (x-point p))
  (display ",")
  (display (y-point p))
  (display ")"))

(define (midpoint-segment s)
  (make-point
   (/ (+ (x-point (start-segment s)) (x-point (end-segment s))) 2)
   (/ (+ (y-point (start-segment s)) (y-point (end-segment s))) 2)))


(define point1 (make-point 0 0))
(define point2 (make-point 0 10))
(define segment1 (make-segment point1 point2))

;> (print-point (midpoint-segment segment1))
;(0,5)
;> 