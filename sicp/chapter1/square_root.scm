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
    (sqrt-iter (improve guess x) x)))

(define (sqrt n) (sqrt-iter 1.0 n))

(define (new-if condition a b)
  (cond (condition a) (else b)))

(define (sqrt-iter-new guess x)
  (new-if (good-enogh? guess x)
    guess
    (sqrt-iter (improve guess x) x)))

;; tests
(good-enogh? (sqrt 9) 9)
(good-enogh? (sqrt-iter-new 1.0 9) 9)
