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
val size = String.size
val filter = List.filter
val map = List.map

(**** you can put all your code here ****)
(* 1 *)
val only_capitals = filter (fn x => Char.isUpper (String.sub(x, 0)))

(* 2 *)
fun longest_string1 [] = ""
  | longest_string1 (x::xs) =
  	foldl (fn (a, x) => if size(a) >  size(x) then a else x) x xs

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





