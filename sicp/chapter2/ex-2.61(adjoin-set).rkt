#lang racket
(define (adjoin-set set item)
  (if (or (null? set) (< item (car set)))
      (cons item set)
      (cons (car set) (adjoin-set (cdr set) item))))

;> (adjoin-set '(3 5 7) 6)
;'(3 5 6 7)
;> (adjoin-set '(3 5 7) 1)
;'(1 3 5 7)
;> (adjoin-set '(3 5 7) 8)
;'(3 5 7 8)
;>

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