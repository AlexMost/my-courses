#lang racket
(define (reverse l)
  (if (null? (cdr l))
      l
      (append (reverse (cdr l))
              (list (car l)))))

(define (deep-reverse l)
  (cond [(not (pair? l)) l]
        [(null? (cdr l)) (list (deep-reverse (car l)))]
        [else
         (append
          (deep-reverse (cdr l))
          (list (deep-reverse (car l))))]))

(define x (list (list 1 2) (list 3 4)))

; (deep-reverse x)
; '((4 3) (2 1))