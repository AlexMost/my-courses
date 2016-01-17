#lang racket
(define (fringe l)
  (if (pair? l)
      (if (not (null? (cdr l)))
          (append (fringe (car l)) (fringe (cdr l)))
          (fringe (car l)))
      (list l)))
         
(define x (list (list 1 2) (list 3 4)))

(fringe x)
