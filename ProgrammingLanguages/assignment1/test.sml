use "assignment1.sml";

val test1 = is_older ((1, 2, 3), (2, 3, 4)) = true;
val test11 = is_older ((1, 2, 3), (1, 2, 3)) = false;
val test2 = number_in_month([(2012,2,28),(2012,2,28)],2) = 2;
val test3 = number_in_months([(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,4]) = 3;
val test4 = dates_in_month([(2012,2,28),(2013,12,1)],2) = [(2012,2,28)]
val test44 = dates_in_month([(2012,2,28),(2013,12,1), (2012,2,29)],2) = [(2012,2,28), (2012,2,29)]
val test5 = dates_in_months([(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,4]) = [(2012,2,28),(2011,3,31),(2011,4,28)]
val test6 = get_nth(["hi", "there", "how", "are", "you"], 2) = "there"
val test7 = date_to_string((2013, 6, 1)) = "June 1, 2013"
val test8 = number_before_reaching_sum(10, [1,2,3,4,5]) = 3
val test9 = what_month(70) = 3
val test10 = month_range(31, 34) = [1,2,2,2]
val test11 = oldest([(2012,2,28),(2011,3,31),(2011,4,28)]) = SOME (2011,3,31)

(* challenge tests *)
val test12 = filter_unique([1, 2, 3, 4, 4, 4]) = [1, 2, 3, 4]
val test13 = number_in_months_challenge(
    [(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,2,2,4]) = 3;
val test14 = dates_in_months_challenge(
    [(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,3,3,4]) = [(2012,2,28),(2011,3,31),(2011,4,28)]

(* negative year should fail *)
val test15 = reasonable_date ((~1, 8, 2)) = false

(* 13-th month should fail *)
val test16 = reasonable_date ((2000, 13, 2)) = false

(* leap years test *)
val test17 = is_leap_year(2000) = true
val test18 = is_leap_year(2001) = false
val test19 = is_leap_year(2008) = true

(* date day must fail *)
val test20 = reasonable_date ((2000, 12, 40)) = false

(* test februrary in leap year *)
val test21 = reasonable_date ((2000, 2, 29)) = true
val test22 = reasonable_date ((2000, 2, 30)) = false

(* only 30 days on april *)
val test23 = reasonable_date ((2001, 4, 31)) = false
val test24 = reasonable_date ((2001, 4, 30)) = true