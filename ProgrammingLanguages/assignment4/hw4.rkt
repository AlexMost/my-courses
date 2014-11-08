#lang racket

(provide (all-defined-out)) ;; so we can put tests in a second file
;; put your code below

;; (1)
(define (sequence low high stride)
  (if (> low high) 
      '()
      (cons low (sequence (+ low stride) high stride))))

;; (2)
(define (string-append-map xs suffix)
  (map (lambda (x) (string-append x suffix)) xs))

;; (3)
(define (list-nth-mod xs n)
  (cond [(< n 0) (error "list-nth-mod: negative number")]
        [(= n 0) (error "list-nth-mod: empty list")]
        [#t (car (list-tail xs (remainder n (length xs))))]))

;; (4)
(define (stream-for-n-steps s n)
  (if (<= n 0)
      '()
      (cons (car (s)) (stream-for-n-steps (cdr (s)) (- n 1)))))

;; (5)
(define funny-number-stream
  (letrec ([f (lambda (x)
                (if (= (remainder x 5) 0)
                   (cons (- x) (lambda () (f (+ 1 x))))
                   (cons x (lambda () (f (+ 1 x))))))])
  (lambda () (f 1))))

;; (6)
(define dan-then-dog
  (letrec ([dog "dog.jpg"]
           [dan "dan.jpg"]
           [f (lambda (x)
                (if (equal? x dan)
                   (cons dan (lambda () (f dog)))
                   (cons dog (lambda () (f dan)))))])
  (lambda () (f dan))))

;; (7)
(define (stream-add-zero s)
  (lambda () (cons 
              (cons 0 (car (s)))
              (lambda () (stream-add-zero (cdr s))))))
  

