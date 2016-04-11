#lang racket
(define (variable? x) (symbol? x))

(define (same-variable? v1 v2)
  (and (variable? v1) (variable? v2) (eq? v1 v2)))

(define (make-sum a1 a2)
  (cond [(and (number? a1) (= a1 0)) a2]
        [(and (number? a2) (= a2 0)) a1]
        [(and (number? a1) (number? a2)) (+ a1 a2)]
        [else (list '+ a1 a2)]))

(define (=number? n v)
  (and (number? n) (= n v)))

(define (make-product a1 a2)
  (cond [(or (=number? a1 0) (=number? a2 0)) 0]
        [(=number? a1 1) a2]
        [(=number? a2 1) a1]
        [(and (number? a1) (number? a2)) (* a1 a2)]
        [else (list '* a1 a2)]))

(define (sum? x)
  (and (pair? x) (eq? (car x) '+)))

(define (addend s) (cadr s))

(define (augend s) (caddr s))

(define (product? x)
  (and (pair? x) (eq? (car x) '*)))

(define (multiplier p) (cadr p))

(define (multiplicand p) (caddr p))

(define (exp? x)
  (and (pair? x) (eq? (car x) '**)))

(define (base x) (cadr x))

(define (exponent x) (caddr x))

(define (make-exp b e)
  (list '** b e))

(define (deriv exp var)
  (cond [(number? exp) 0]
        [(variable? exp) (if (same-variable? exp var) 1 0)]
        [(sum? exp) (make-sum (deriv (addend exp) var)
                               (deriv (augend exp) var))]
        [(product? exp)
         (make-sum
          (make-product (multiplier exp)
                        (deriv (multiplicand exp) var))
          (make-product (multiplicand exp)
                        (deriv (multiplier exp) var)))]
        [(exp? exp)
         (make-product
          (make-product (exponent exp) (make-exp (base exp) (make-sum (exponent exp) -1)))
          (deriv (base exp) var))]
        [else (error "fail")]))

;(deriv '(* (* x y) (+ x 3)) 'x)
(deriv '(** x 5) 'x)