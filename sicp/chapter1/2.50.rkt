#lang racket
(require racket/gui/base)

(define (make-vect x y) (cons x y))

(define (xcor-vect v) (car v))

(define (ycor-vect v) (cdr v))

(define (add-vect v1 v2)
  (let ([x (+ (xcor-vect v1) (xcor-vect v2))]
        [y (+ (ycor-vect v1) (ycor-vect v2))])
    (make-vect x y)))

(define (sub-vect v1 v2)
  (let ([x (- (xcor-vect v1) (xcor-vect v2))]
        [y (- (ycor-vect v1) (ycor-vect v2))])
    (make-vect x y)))

(define (scale-vect s v)
  (make-vect (* (xcor-vect v) s) (* (ycor-vect v) s)))

(define (make-frame origin edge1 edge2)
  (list origin edge1 edge2))

(define (origin-frame f) (car f))

(define (edge1-frame f) (car (cdr f)))

(define (edge2-frame f) (car (cdr (cdr f))))

; -------------------------------------------
(define (make-segment v1 v2) (cons v1 v2))
(define (start-segment s) (car s))
(define (end-segment s) (cdr s))

(define (frame-coord-map frame)
  (lambda (v)
    (add-vect (origin-frame frame)
              (add-vect
               (scale-vect (xcor-vect v) (edge1-frame frame))
               (scale-vect (ycor-vect v)(edge2-frame frame))))))

;------ segments painter
(define (draw-segment dc s)
  (let ([x1 (xcor-vect (start-segment s))]
        [y1 (ycor-vect (start-segment s))]
        [x2 (xcor-vect (end-segment s))]
        [y2 (ycor-vect (end-segment s))])
    (send dc draw-line x1 y1 x2 y2)))

(define (segments->painter dc segments)
  (lambda (frame)
    (for-each
     (lambda (segment)
       (draw-segment
        dc
        (make-segment
         ((frame-coord-map frame) (start-segment segment))
         ((frame-coord-map frame) (end-segment segment)))))
     segments)))

(define (frame->segments f)
  (let ([s1 (make-segment (origin-frame f) (edge1-frame f))]
        [s2 (make-segment (origin-frame f) (edge2-frame f))]
        [far-corner (make-vect
                     (xcor-vect (edge2-frame f))
                     (ycor-vect (edge1-frame f)))])
  (list s1
        s2
        (make-segment (edge2-frame f) far-corner)
        (make-segment (edge1-frame f) far-corner))))

(define (draw-frame dc f)
  (segments->painter dc (frame->segments f)))

(define line1 (make-segment (make-vect 0 0) (make-vect 200 200)))
(define f1 (make-frame
               (make-vect 0 0)
               (make-vect 0 1)
               (make-vect 1 0)))

(define frame (new frame%
                   [label "Example"]
                   [width 600]
                   [height 600]))

(new canvas% [parent frame]
             [paint-callback
              (lambda (canvas dc)
                ((segments->painter dc (list line1)) f1)
                )])
(send frame show #t)




