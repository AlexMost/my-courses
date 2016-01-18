#lang racket
(define (accumulate op initial sequence)
  (if (null? sequence)
      initial
      (op (car sequence)
          (accumulate op initial (cdr sequence)))))


(define (count-leaves t)
  (accumulate + 0
              (map (lambda (node) (if (pair? node) (count-leaves node) 1)) t)))


(define (count-leaves-2 t)
  (accumulate
   (lambda (l1 l2) (if (pair? l1) (+ (count-leaves-2 l1) l2) (+ 1 l2)))
   0 t))
                         

