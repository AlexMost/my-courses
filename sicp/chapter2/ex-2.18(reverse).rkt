#lang racket
(define (reverse l)
  (if (null? (cdr l))
      l
      (append (reverse (cdr l))
              (list (car l)))))
  
  