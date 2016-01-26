#lang racket
(define (variable? x) (symbol? x))

(define (same-variable? v1 v2)
  (and (variable? v1) (variable? v2) (eq? v1 v2)))

(define (not-0 l) (filter (lambda (x) (not (=number? x 0))) l))

(define (make-sum . args)
  (let ([nums (filter number? args)]
        [not-nums (filter (lambda (x) (not (number? x))) args)])
    (cond [(= 1 (+ (length (not-0 nums)) (length not-nums)))
           (car (not-0 (append nums not-nums)))]
          [(= 0 (+ (length (not-0 nums)) (length not-nums))) 0]
          [else (if (not (null? nums))
        (append (list '+ (foldr + 0 nums)) not-nums)
        (append (list '+) not-nums))])))
    
(define (=number? n v)
  (and (number? n) (= n v)))

(define (has-zero l)
  (foldr (lambda (x y) (or (=number? x 0) y)) false l))

(define (skip-1 l)
  (filter (lambda (x) (not (=number? x 1))) l))

(define (make-product a1 a2)
  (cond [(or (=number? a1 0) (=number? a2 0)) 0]
        [(=number? a1 1) a2]
        [(=number? a2 1) a1]
        [(and (number? a1) (number? a2)) (* a1 a2)]
        [else (list '* a1 a2)]))

(define (sum? x)
  (and (pair? x) (eq? (car x) '+)))

(define (addend s) (cadr s))

(define (augend s)
  (if (= (length s) 2) 0 (append (list '+) (cddr s))))

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

(define r1 (deriv '(* (* x y) (+ x 3)) 'x))
;(deriv '(** x 5) 'x)

(define r2 (deriv '(* x y (+ x 3)) 'x))

(list r1 "|" r2)