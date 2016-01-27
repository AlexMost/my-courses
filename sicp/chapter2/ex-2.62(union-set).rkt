#lang racket

(define (union-set set1 set2)
  (cond [(null? set1) set2]
        [(null? set2) set1]
        [else
         (let ([i1 (car set1)]
               [i2 (car set2)])
           (cond [(< i2 i1) (cons i2 (union-set set1 (cdr set2)))]
                 [(> i2 i1) (cons i1 (union-set (cdr set1) set2))]
                 [else (cons i1 (union-set (cdr set1) (cdr set2)))]))]))

; > (union-set '(1 2 3) '(2 5 7))
; '(1 2 3 7)
; > (union-set '(1 2 3 4) '(1 2 7 8))
; '(1 2 3 4 7 8)