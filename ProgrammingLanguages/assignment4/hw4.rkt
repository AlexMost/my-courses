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
        [(= (length xs) 0) (error "list-nth-mod: empty list")]
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
  (lambda () (cons (cons 0 (car (s))) (stream-add-zero (cdr (s))))))

;; (8)
(define (cycle-lists xs ys)
  (letrec ([f (lambda (n)
               (cons
                (cons (list-nth-mod xs n) (list-nth-mod ys n))
                (lambda () (f (+ 1 n)))))])
    (lambda () (f 0))))

;; (9)
(define (vector-assoc v vec)
  (letrec 
      ([f (lambda (n)
            (if (< n (vector-length vec))
                (let ([item (vector-ref vec n)])
                  (if (and (pair? item) (equal? (car item) v))
                      item
                      (f (+ 1 n))))
                #f))])
    (f 0)))

;; (10)
(define (cached-assoc xs n)
  (letrec
      ([cache-index 0]
       [cache (make-vector n #f)])
    (lambda (v)
        (or (vector-assoc v cache)
            (let ([assoc-result (assoc v xs)])
              (if assoc-result
                  (begin
                    (vector-set! cache (remainder cache-index n) assoc-result)
                    (set! cache-index (+ 1 cache-index)))
                  '())
              assoc-result)))))

;; Challenge problems
;; (11)
(define-syntax while-less
  (syntax-rules (do)
    [(while-less e1 do e2)
     (letrec ([evaluated-e1 e1]
              [loop (lambda () (if (> evaluated-e1 e2) (loop) #t))])
       (loop))]))