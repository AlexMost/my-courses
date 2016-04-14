#lang racket

(define (square x) (* x x))

(define (make-from-real-imag x y)
  (define (dispatch op)
    (cond ((eq? op 'real-part) x)
          ((eq? op 'imag-part) y)
          ((eq? op 'magnitude)
           (sqrt (+ (square x) (square y))))
          ((eq? op 'angle) (atan y x))
          (else
           (error "Неизвестная оп. -- MAKE-FROM-REAL-IMAG" op))))
  dispatch)

(define (make-from-mag-ang r a)
  (define (dispatch op)
    (let ((real (* r (cos a)))
          (imag (* r (sin a))))
      (cond [(eq? op 'real-part) real]
            [(eq? op 'imag-part) imag]
            [(eq? op 'magnitute) r]
            [(eq? op 'angle) a])))
  dispatch)
          

(define (apply-generic op arg) (arg op))