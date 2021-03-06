(* Homework3 Simple Test*)
(* These are basic test cases. Passing these tests does not guarantee that your code will pass the actual homework grader *)
(* To run the test, add a new line to the top of this file: use "homeworkname.sml"; *)
(* All the tests should evaluate to true. For example, the REPL should say: val test1 = true : bool *)
use "hw3.sml";

val test1 = only_capitals ["A","B","C"] = ["A","B","C"]

val test2 = longest_string1 ["A","bc","C"] = "bc"
val test2_2 = longest_string1 ["aj","bc","cd"] = "aj"

val test3 = longest_string2 ["A","bc","C"] = "bc"
val test3_1 = longest_string2 ["aj","bc","cd"] = "cd"

val test4a = longest_string3 ["A","bc","C"] = "bc"
val test4a_2 = longest_string3 ["aj","bc","cd"] = "aj"

val test4b = longest_string4 ["A","B","C"] = "C"
val test4b_1 = longest_string4 ["A","bc","C"] = "bc"
val test4b_2 = longest_string4 ["aj","bc","cd"] = "cd"

val test5 = longest_capitalized ["A","bc","C"] = "A";

val test6 = rev_string "abc" = "cba";

val test7 = first_answer (fn x => if x > 3 then SOME x else NONE) [1,2,3,4,5] = 4

val test8 = all_answers (fn x => if x = 1 then SOME [x] else NONE) [2,3,4,5,6,7] = NONE
val test8_1 = all_answers (fn x => if x <> 1 then SOME [x] else NONE) [2,3,4,5,6,7] = SOME [2,3,4,5,6,7]

val test9a = count_wildcards Wildcard = 1
val test9a_1 = count_wildcards (TupleP [Wildcard, Wildcard]) = 2

val test9b = count_wild_and_variable_lengths (Variable("a")) = 1
val test9b_1 = count_wild_and_variable_lengths (TupleP [Variable("a"), Wildcard]) = 2

val test9c = count_some_var ("x", Variable("x")) = 1;

val test10 = check_pat (Variable("x")) = true
val test10_1 = var_strings (TupleP [Variable("a"), Variable("b"), Variable("c")]) = ["c", "b", "a"]
val test10_2 = distinct ["a", "b", "c"] = true
val test10_3 = distinct ["a", "b", "a"] = false
val test10_4 = check_pat (TupleP [Variable("a"), Variable("b"), Variable("c")]) = true
val test10_5 = check_pat (TupleP [Variable("a"), Variable("a"), Variable("c")]) = false

val test11 = match (Const(1), UnitP) = NONE
val test11_1 = match (Const(1), Variable("a")) = SOME [("a", Const(1))]
val test11_2 = match(Constructor("v", Const 1), ConstructorP("v", Variable "s")) = SOME [("s", Const(1))]
val test11_3 = match(Tuple [Const(1)], TupleP [(Variable "s")]) = SOME [("s", Const(1))]

val test12 = first_match Unit [UnitP] = SOME []

