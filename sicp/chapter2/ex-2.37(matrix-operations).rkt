#lang racket
(define (accumulate op initial sequence)
  (if (null? sequence)
      initial
      (op (car sequence)
          (accumulate op initial (cdr sequence)))))

(define nil (list))

(define (accumulate-n op init seqs)
  (if (null? (car seqs))
      nil
      (cons (accumulate op init (map (lambda (x) (car x)) seqs))
            (accumulate-n op init (map (lambda (x) (cdr x)) seqs)))))

(define (dot-product v w) (accumulate + 0 (map * v w)))

(define (matrix-*-vector m v) (map (lambda (vm) (dot-product v vm)) m))

(define (transpose mat) (accumulate-n cons (list) mat))

(define (matrix-*-matrix m n)
  (let ((cols (transpose n)))
    (map (lambda (v)
           (map (lambda (c) (dot-product c v)) cols))
         m)))

; testing
(define s (list (list 1 2 3) (list 4 5 6) (list 7 8 9)))

;(transpose s)
;'((1 4 7) (2 5 8) (3 6 9))

(define m1 (list (list 1 2) (list 3 4)))
(define m2 (list (list 5 6) (list 7 8)))

(matrix-*-matrix m1 m2)
; '((19 22) (43 50))