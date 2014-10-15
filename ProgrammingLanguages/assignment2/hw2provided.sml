(* Dan Grossman, Coursera PL, HW2 Provided Code *)

(* if you use this function to compare two strings (returns true if the same
   string), then you avoid several of the functions in problem 1 having
   polymorphic types that may be confusing *)
fun same_string(s1 : string, s2 : string) =
    s1 = s2

(* put your solutions for problem 1 here *)
(* a *)
fun all_except_option (s1: string, options: string list) =
    let 
        fun filter (_, [], false) = NONE
          | filter (res, [], true) = SOME res
          | filter (res, x::xs, is_present) = 
            if same_string (s1, x)
            then filter (res, xs, true)
            else filter (res @ [x], xs, is_present orelse false)
    in
        filter ([], options, false)
    end

(* b *)
fun get_substitutions1 ([], _) = []
  | get_substitutions1 (x::xs, opt) =
    case all_except_option (opt, x) of
        NONE => get_substitutions1 (xs, opt)
        | SOME res => res @ get_substitutions1 (xs, opt)

(* c *)
fun get_substitutions2 (lst, opt) =
    let
        fun subst ([], acc) = acc
          | subst (x::xs, acc) =
                case all_except_option (opt, x) of
                    NONE => subst (xs, acc)
                    | SOME res => subst (xs, acc @ res)
    in
        subst (lst, [])
    end

(* d *)
fun similar_names (names, fullname) =
    let
        val {first=f, middle=m, last=l} = fullname
        fun make_name name = {first=name, middle=m, last=l}
        fun make_names [] = []
          | make_names (x::xs) =
            (make_name x)::(make_names xs)
    in
        (make_name f)::(make_names (get_substitutions2 (names, f)))
    end

(* you may assume that Num is always used with values 2, 3, ..., 10
   though it will not really come up *)
datatype suit = Clubs | Diamonds | Hearts | Spades
datatype rank = Jack | Queen | King | Ace | Num of int 
type card = suit * rank

datatype color = Red | Black
datatype move = Discard of card | Draw 

exception IllegalMove

(* put your solutions for problem 2 here *)
