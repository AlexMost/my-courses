(* Coursera Programming Languages, Homework 3, Provided Code *)

exception NoAnswer

datatype pattern = Wildcard
         | Variable of string
         | UnitP
         | ConstP of int
         | TupleP of pattern list
         | ConstructorP of string * pattern

datatype valu = Const of int
          | Unit
          | Tuple of valu list
          | Constructor of string * valu

fun g f1 f2 p =
    let 
    val r = g f1 f2 
    in
    case p of
        Wildcard          => f1 ()
      | Variable x        => f2 x
      | TupleP ps         => List.foldl (fn (p,i) => (r p) + i) 0 ps
      | ConstructorP(_,p) => r p
      | _                 => 0
    end

(**** for the challenge problem only ****)

datatype typ = Anything
         | UnitT
         | IntT
         | TupleT of typ list
         | Datatype of string

(********* some helpers *****)
val filter = List.filter

(**** you can put all your code here ****)
(* 1 *)
val only_capitals = filter (fn x => Char.isUpper (String.sub(x, 0)))

(* 2 *)
fun longest_string1 [] = ""
  | longest_string1 (x::xs) =
    foldl (fn (a, x) => if size(a) > size(x) then a else x) x xs

(* 3 *)
fun longest_string2 [] = ""
  | longest_string2 (x::xs) =
    foldl (fn (a, x) => if size(a) < size(x) then x else a) x xs

(* 4 *)
fun longest_string_helper f [] = ""
  | longest_string_helper f (x::xs) =
    foldl (fn (a, x) => if f(size(a), size(x)) then a else x) x xs

val longest_string3 = longest_string_helper (fn (a, x) => a > x)
val longest_string4 = longest_string_helper (fn (a, x) => not(a < x))

(* 5 *)
val longest_capitalized = longest_string1 o only_capitals

(* 6 *)
val rev_string = implode o rev o explode

(* 7 *)
fun first_answer _ [] = raise NoAnswer
  | first_answer f (x::xs) =
    case f(x) of
        SOME x => x
        | NONE => first_answer f xs

(* 8 *)
fun all_answers _ [] = SOME []
  | all_answers f lst =
    let
        fun all_answ ([], acc) = SOME acc
          | all_answ (x::xs, acc) =
            case f(x) of
                SOME r => all_answ (xs, acc @ r)
                | NONE => NONE
    in
        all_answ (lst, [])
    end

(* 9 *)
(* a *)
val count_wildcards = g (fn () => 1) (fn x => 0)

(* b *)
val count_wild_and_variable_lengths = g (fn () => 1) size

(* c *)
fun count_some_var (s, p) = g (fn () => 0) (fn x => if x = s then 1 else 0) p

(* 10 *)
fun var_strings p =
    case p of
        Variable x => [x]
        | TupleP ps => List.foldl (fn (p,acc) => (var_strings p) @ acc) [] ps
        | ConstructorP(_,p) => var_strings p
        | _ => []

fun distinct [] = true
  | distinct (x::xs) =
    if (List.exists (fn i => i = x) xs) then false else distinct xs

val check_pat = distinct o var_strings

(* 11 *)
fun match (v, p) =
    case (p, v) of
          (Wildcard, _)                             => SOME []
        | ((Variable s), v)                         => SOME [(s, v)]
        | (UnitP, Unit)                             => SOME []
        | ((ConstP v), (Const s))                   => SOME []
        | (ConstructorP(s1, p), Constructor(s2, v)) =>
            if s1 = s2 then match (v, p) else NONE
        | ((TupleP ps), (Tuple vs)) =>
            if (List.length ps) = (List.length vs)
            then all_answers match (ListPair.zip (vs, ps))
            else NONE
        | (_, _)                                    => NONE

(* 12 *)
fun first_match v plst =
  SOME (first_answer (fn p => match (v, p)) plst)
  handle NoAnswer => NONE