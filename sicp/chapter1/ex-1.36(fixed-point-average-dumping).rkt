#lang racket

(define tolerance 0.00001)

(define (fixed-point f first-guess)
  (define (close-enough? v1 v2)
    (< (abs (- v1 v2)) tolerance))
  (define (try guess)
    (let ((next (f guess)))
      (begin
        (display (exact->inexact guess))
        (newline)
        (if (close-enough? guess next)
          next
          (try next)))))
  (try first-guess))

; fixed point with average dumping
(exact->inexact (fixed-point (lambda (x) (/ (+ x (/ (log 100) (log x))) 2)) 2))

