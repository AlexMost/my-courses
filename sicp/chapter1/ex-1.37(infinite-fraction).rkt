#lang racket

(define (cont-fact n d k) 
   (define (recur i) 
     (if (> i k) 
         0 
         (/ (n i) (+ (d i) (recur (add1 i)))))) 
   (recur 1))


(cont-fact (lambda (i) 1.0) (lambda (i) 1.0) 10)
; 0.6179775280898876