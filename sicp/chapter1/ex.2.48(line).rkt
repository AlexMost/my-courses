#lang racket
(define (make-vect x y) (cons x y))

(define (xcor-vect v) (car v))

(define (ycor-vect v) (cdr v))

(define (add-vect v1 v2)
  (let ([x (+ (xcor-vect v1) (xcor-vect v2))]
        [y (+ (ycor-vect v1) (ycor-vect v2))])
    (make-vect x y)))

(define (sub-vect v1 v2)
  (let ([x (- (xcor-vect v1) (xcor-vect v2))]
        [y (- (ycor-vect v1) (ycor-vect v2))])
    (make-vect x y)))

(define (scale-vect v s)
  (make-vect (* (xcor-vect v) s) (* (ycor-vect v) s)))

(define (make-frame origin edge1 edge2)
  (list origin edge1 edge2))

(define (origin-frame f) (car f))

(define (edge1-frame f) (car (cdr f)))

(define (edge2-frame f) (car (cdr (cdr f))))

; -------------------------------------------
(define (make-segment v1 v2) (cons v1 v2))
(define (start-segment s) (car s))
(define (end-segment s) (cdr s))
