(define (cub n) (* n n n))
(define (square n) (* n n))

(define (good-enogh? guess x)
  (< (abs (- (cub guess) x)) 0.001))

(define (improve guess x)
  (/ (+(/ x (square guess)) (* 2 guess)) 3))

(define (cubic-iter guess x)
  (if (good-enogh? guess x)
    guess
    (cubic-iter (improve guess x) x)))

(define (cubic n) (cubic-iter 1.0 n))

;; tests
(good-enogh? (cubic 27) 27)
