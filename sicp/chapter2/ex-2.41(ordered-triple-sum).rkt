#lang racket
(define nil (list))

(define (accumulate op initial sequence)
  (if (null? sequence)
      initial
      (op (car sequence)
          (accumulate op initial (cdr sequence)))))

(define (flatmap proc seq)
  (accumulate append nil (map proc seq)))

(define (enumerate-interval s e)
  (if (> s e)
    nil  
    (cons s (enumerate-interval (+ s 1) e))))

(define (triples n)
  (flatmap (lambda (i)
             (flatmap (lambda (j)
                        (map (lambda (k) (list i j k))
                             (enumerate-interval 1 (- j 1))))
                      (enumerate-interval 1 (- i 1))))
           (enumerate-interval 1 n)))

(define (sum l) (accumulate + 0 l))

(define (ordered-triple-sum n s)
  (filter (lambda (l) (= (sum l) s)) (triples n)))

;> (ordered-triple-sum 10 8)
;'((4 3 1) (5 2 1))
