#lang racket
(define (make-segment p1 p2)
  (cons p1 p2))

(define (start-segment s) (car s))
(define (end-segment s) (cdr s))

(define (make-point x y)
  (cons x y))

(define (x-point p) (car p))
(define (y-point p) (cdr p))

(define (make-rect s1 s2)
  (cons s1 s2))

(define (get-a rect)
  (car rect))

(define (get-b rect)
  (cdr rect))

(define (width rect)
  (- (x-point (end-segment (get-a rect)))
     (x-point (start-segment (get-a rect)))))

(define (height rect)
  (- (y-point (end-segment (get-b rect)))
     (y-point (start-segment (get-b rect)))))

(define (rec-square rect)
   (* (width rect) (height rect)))

(define (rec-perim rect)
  (* (+ (width rect) (height rect)) 2))

(define sa (make-segment (make-point 0 0) (make-point 10 0)))
(define sb (make-segment (make-point 0 0) (make-point 0 10)))
(define myrec (make-rect sa sb))

;> (rec-perim myrec)
;40
;> (rec-square myrec)
;100