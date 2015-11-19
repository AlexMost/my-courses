#lang racket
; T(a, b) = (a + b, a)
;
; p = 0 q = 1
;
; Tpq(a, b) = (bq + aq + ap, bp + aq)
; a = bq + aq + ap
; b = bp + aq
;
; Tp'q' = ((bp + aq)q + (bq + aq + ap)q + (bq + aq + ap)p, (bp + aq)p + (bq + aq + ap)q)
;
; b = (bp + aq)p + (bq + aq + ap)q
; b = bpp + aqp + bqq + aqq + apq
; b = b(pp + qq) + a(qp + qq + pq)
;
; p' = pp + qq
; q' = 2qp + qq
;
; Tpq(bq + ay + ax, bx + ay)

(define (fib n) (fib-iter 1 0 0 1 n))

(define (fib-iter a b p q count)
  (cond [(= count 0) b]
        [(even? count)
         (fib-iter a
                   b
                   (+ (* p p) (* q q))
                   (+ (* 2 q p) (* q q))
                   (/ count 2))]
        [else (fib-iter (+ (* b q) (* a q) (* a p))
                        (+ (* b p) (* a q))
                        p
                        q
                        (- count 1))]))