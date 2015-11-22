#lang racket
 (require math/base)

(define (even? n) (= (remainder n 2) 0))

(define (square x) (* x x))

(define (expmod base exp m)
  (cond ((= exp 0) 1)
        ((even? exp)(remainder (square (expmod base (/ exp 2) m))m))
        (else (remainder (* base (expmod base (- exp 1) m)) m))))

; Ferma test
(define (fermat-test n)
  (define (try-it a)
    (= (expmod a n n) a))
  (try-it (+ 1 (random-natural (- n 1)))))

(define (fast-prime? n times)
  (cond ((= times 0) true)
        ((fermat-test n)
         (fast-prime? n (- times 1)))
        (else false)))

; time test
(define (timed-prime-test n)
  (start-prime-test n (current-milliseconds)))

(define (start-prime-test n start-time)
  (if (fast-prime? n 3) ; fix change even? -> fast-prime?
      (report-prime n (- (current-milliseconds) start-time))
      3))

(define (report-prime n elapsed-time)
  (newline)
  (display n)
  (display " *** ")
  (display elapsed-time))

(define (search-for-primes a b)
  (if (= a b)
      (begin (newline))
      (begin (timed-prime-test a) (search-for-primes (+ a 1) b))))
