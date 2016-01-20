#lang racket

(define nil (list))

(define (accumulate op initial sequence)
  (if (null? sequence)
      initial
      (op (car sequence)
          (accumulate op initial (cdr sequence)))))

(define (enumerate-interval s e)
  (if (> s e)
    nil  
    (cons s (enumerate-interval (+ s 1) e))))

(define (flatmap proc seq)
  (accumulate append nil (map proc seq)))

(define (smallest-divisor n)
  (find-divisor n 2))

(define (square n) (* n n))

(define (divides? a b) (= (remainder b a) 0))

(define (find-divisor n test-divisor)
  (cond ((> (square test-divisor) n) n)
        ((divides? test-divisor n) test-divisor)
        (else (find-divisor n (+ test-divisor 1)))))

(define (prime? n)
  (= n (smallest-divisor n)))

(define (prime-sum? pair)
  (prime? (+ (car pair) (cdr pair))))

(define (make-pair-sum pair)
  (list (car pair) (cdr pair) (+ (car pair) (cdr pair))))

(define (prime-sum-pairs n)
  (map make-pair-sum
       (filter prime-sum?
               (flatmap
                (lambda (i)
                  (map (lambda (j) (list i j))
                       (enumerate-interval 1 (- i 1))))
                (enumerate-interval 1 n)))))

(define (remove item sequence)
  (filter (lambda (x) (not (= x item))) sequence))

(define (permutations s)
  (if (null? s)
      (list nil)
      (flatmap
       (lambda (x) (map (lambda (p) (cons x p)) (permutations (remove x s))))
       s)))

(define (unique-pairs n)
  (flatmap
   (lambda (x)
     (map
      (lambda (y) (cons x y))
      (enumerate-interval 1 (- x 1))))
   (enumerate-interval 1 n)))

(define (prime-sum-p n)
  (map make-pair-sum
       (filter prime-sum? (unique-pairs n))))
              