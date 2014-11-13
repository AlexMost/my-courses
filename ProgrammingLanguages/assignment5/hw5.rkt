;; Programming Languages, Homework 5

#lang racket
(provide (all-defined-out)) ;; so we can put tests in a second file

;; definition of structures for MUPL programs - Do NOT change
(struct var  (string) #:transparent)  ;; a variable, e.g., (var "foo")
(struct int  (num)    #:transparent)  ;; a constant number, e.g., (int 17)
(struct add  (e1 e2)  #:transparent)  ;; add two expressions
(struct ifgreater (e1 e2 e3 e4)    #:transparent) ;; if e1 > e2 then e3 else e4
(struct fun  (nameopt formal body) #:transparent) ;; a recursive(?) 1-argument function
(struct call (funexp actual)       #:transparent) ;; function call
(struct mlet (var e body) #:transparent) ;; a local binding (let var = e in body) 
(struct apair (e1 e2)     #:transparent) ;; make a new pair
(struct fst  (e)    #:transparent) ;; get first part of a pair
(struct snd  (e)    #:transparent) ;; get second part of a pair
(struct aunit ()    #:transparent) ;; unit value -- good for ending a list
(struct isaunit (e) #:transparent) ;; evaluate to 1 if e is unit else 0

;; a closure is not in "source" programs; it is what functions evaluate to
(struct closure (env fun) #:transparent) 

;; Problem 1
;; (a)
(define (racketlist->mupllist xs)
  (if (null? xs) (aunit) (apair (car xs) (racketlist->mupllist (cdr xs)))))

;; (b)
(define (mupllist->racketlist xs)
  (if (aunit? xs) null (cons (apair-e1 xs) (mupllist->racketlist (apair-e2 xs)))))
      
;; Problem 2

;; lookup a variable in an environment
;; Do NOT change this function
(define (envlookup env str)
  (cond [(null? env) (error "unbound variable during evaluation" str)]
        [(equal? (car (car env)) str) (cdr (car env))]
        [#t (envlookup (cdr env) str)]))

;; Adds binding to the environment
(define (env+ env v)
  (append 
   (filter (lambda (x) (not (equal? (car x) (car v)))) env)
   (list (cons (car v) (cdr v)))))

;; Adds a list of bindings to the environment
(define (env++ env vrs)
  (let ([new-env (lambda () (env+ env (car vrs)))])
    (if (null? vrs)
        env
        (env++ (new-env) (cdr vrs)))))
  
;; Do NOT change the two cases given to you.  
;; DO add more cases for other kinds of MUPL expressions.
;; We will test eval-under-env by calling it directly even though
;; "in real life" it would be a helper function of eval-exp.
(define (eval-under-env e env)
  (cond [(var? e) (envlookup env (var-string e))]
        [(int? e) e]
        [(aunit? e) e]
        [(closure? e) e]
        [(apair? e) (apair (eval-under-env (apair-e1 e) env) (eval-under-env (apair-e2 e) env)) ]
        
        [(fst? e)
         (let ([exp (eval-under-env (fst-e e) env)])
           (if (apair? exp)
               (apair-e1 exp)
               (error "MUPL fst applied to non-pair")))]
        
        [(snd? e)
         (let ([exp (eval-under-env (snd-e e) env)])
           (if (apair? exp)
               (apair-e2 exp)
               (error "MUPL snd applied to non-pair")))]
        
        [(fun? e) (closure env e)]
        
        [(add? e) 
         (let ([v1 (eval-under-env (add-e1 e) env)]
               [v2 (eval-under-env (add-e2 e) env)])
           (if (and (int? v1)
                    (int? v2))
               (int (+ (int-num v1) 
                       (int-num v2)))
               (error "MUPL addition applied to non-number")))]
        
        [(ifgreater? e)
         (let ([v1 (eval-under-env (ifgreater-e1 e) env)]
               [v2 (eval-under-env (ifgreater-e2 e) env)]
               [eval-e3 (lambda () (eval-under-env (ifgreater-e3 e) env))]
               [eval-e4 (lambda () (eval-under-env (ifgreater-e4 e) env))])
           (if (and (int? v1) (int? v2))
               (if (> (int-num v1) (int-num v2)) (eval-e3) (eval-e4))
               (error "MULP ifgreater applied to non-number")))]
        
        [(mlet? e)
         (letrec ([v (eval-under-env (mlet-e e) env)]
                  [local-env (env+ env (cons (mlet-var e) v))])
             (eval-under-env (mlet-body e) local-env))]
        
        [(call? e)
         (letrec ([funexp (eval-under-env (call-funexp e) env)]
                  [actual (eval-under-env (call-actual e) env)]
                  [fname (lambda () (fun-nameopt (closure-fun funexp)))]
                  [fargname (lambda () (fun-formal (closure-fun funexp)))]
                  [fbody (lambda () (fun-body (closure-fun funexp)))]
                  [f-env (lambda ()
                           (env++
                            (closure-env funexp)
                            (if (fname)
                                (list (cons (fname) funexp) (cons (fargname) actual))
                                (list (cons (fargname) actual)))))])
           (cond [(closure? funexp) (eval-under-env (fbody) (f-env))]
                 [#t (error "MUPL call applied to non-function")]))]
        
        [(snd? e)
         (letrec ([e-result (eval-under-env (snd-e e) env)])
           (if (apair? e-result)
               (eval-under-env (apair-e2 e-result) env)
               (error "MUPL snd is applied to non-apair")))]
        
        [(isaunit? e)
         (let ([e-result (eval-under-env (isaunit-e e) env)])
           (if (aunit? e-result) (int 1) (int 0)))]
                          
        [#t (error (format "bad MUPL expression: ~v" e))]))

;; Do NOT change
(define (eval-exp e)
  (eval-under-env e null))
        
;; Problem 3
(define (ifaunit e1 e2 e3) (ifgreater (isaunit e1) (int 0) e2 e3))

(define (mlet* lstlst e2)
  (if (null? lstlst)
      e2
      (mlet (caar lstlst) (cdar lstlst) (mlet* (cdr lstlst) e2))))

(define (ifeq e1 e2 e3 e4)
  (mlet* (list (cons "e1" e1)
               (cons "e2" e2))
         (ifgreater (var "e1") (var "e2") e4 (ifgreater (var "e2") (var "e1") e4 e3))))

;; Problem 4
(define mupl-map
  (fun #f "x" (fun "mapper" "list"
   (ifaunit (var "list")
            (aunit)
            (apair (call (var "x") (fst (var "list")))
                   (call (var "mapper") (snd (var "list"))))))))


(define mupl-mapAddN 
  (mlet "map" mupl-map
   (fun #f "i" (fun #f "lst"
    (call
     (call (var "map") (fun #f "x" (add (var "i") (var "x"))))
     (var "lst"))))))

;; Challenge Problem

(struct fun-challenge (nameopt formal body freevars) #:transparent) ;; a recursive(?) 1-argument function

;; We will test this function directly, so it must do
;; as described in the assignment
(define (update-freevars s v) ((if (set-member? s v) set-remove set-add) s v))
  
(define (compute-free-vars e)
  (letrec ([compute (lambda (e free-vars)
    ((cond
       [(int? e) e]
       [(aunit? e) e]
       [(closure? e) e]
       
       [(mlet? e)
        (let ([new-free-vars (update-freevars free-vars (mlet-var e))])
          (mlet (mlet-var e)
                (compute (mlet-e e) new-free-vars)
                (compute (mlet-body e) new-free-vars)))]
       
       [(fun? e)
        (letrec ([new-free-vars-formal (update-freevars free-vars (fun-formal e))]
                 [new-free-vars
                  (if (fun-nameopt e)
                     (update-freevars new-free-vars-formal (fun-nameopt e))
                     new-free-vars-formal)])
          (fun-challenge
           (fun-nameopt fun)
           (fun-formal fun)
           (compute (fun-body fun) new-free-vars)
           new-free-vars))]
       
       [#t (error (format "bad MUPL expression: ~v" e))])))])
    (compute e (set))))

;; Do NOT share code with eval-under-env because that will make
;; auto-grading and peer assessment more difficult, so
;; copy most of your interpreter here and make minor changes
(define (eval-under-env-c e env) "CHANGE")

;; Do NOT change this
(define (eval-exp-c e)
  (eval-under-env-c (compute-free-vars e) null))
