

(define (good-enogh? guess x)
  (< (abs (- (square guess) x)) 0.001))

(define (good-enogh-diff? first second)
  (< (abs (- first second)) 0.01))

(define (avg x y)
  (/ (+ x y) 2))

(define (improve guess x)
  (avg guess (/ x guess)))

(define (sqrt-iter-diff prevGuess guess x)
  (if (good-enogh-diff? prevGuess guess)
    guess
    (sqrt-iter-diff guess (improve guess x) x)))

(define (sqrt-iter guess x)
  (if (good-enogh? guess x)
    guess
    (sqrt-iter-diff guess (improve guess x) x)))

(define (sqrt n) (sqrt-iter 1.0 n))

;; tests
(good-enogh? (sqrt 128) 128)
