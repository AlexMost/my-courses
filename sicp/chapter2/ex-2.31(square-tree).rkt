#lang racket
(define (square n) (* n n))

(define (square-tree t)
  (map (lambda (sub-tree)
         (if (pair? sub-tree)
             (square-tree sub-tree)
             (square sub-tree)))
       t))

(square-tree
 (list 1
       (list 2 (list 3 4) 5)
       (list 6 7)))