(* some common helper functions *)
fun any (number: int, lst: int list) =
    if null lst
    then false
    else number = (hd lst) orelse any (number, tl lst)


(* 
    functions from homework
    date format - year/month/day
 *)
val MONTHS_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


val MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]


fun is_older (date1: int*int*int, date2: int*int*int) =
    let
        val days1 = #1 date1 * 365 + #2 date1 * 30 + #3 date1
        val days2 = #1 date2 * 365 + #2 date2 * 30 + #3 date2
    in
        days1 < days2
    end


fun number_in_month (dates: (int*int*int) list, month: int) =
    if null dates
    then 0
    else
        if #2 (hd dates) = month
        then 1 + number_in_month (tl dates, month)
        else number_in_month (tl dates, month)


fun number_in_months (dates: (int*int*int) list, months: int list) =
    if null dates
    then 0
    else
        if any (#2 (hd dates), months)
        then 1 + number_in_months (tl dates, months)
        else number_in_months (tl dates, months)


fun dates_in_month (dates: (int*int*int) list, month: int) =
    if null dates
    then []
    else
        if #2 (hd dates) = month
        then (hd dates)::(dates_in_month (tl dates, month))
        else (dates_in_month (tl dates, month))


fun dates_in_months (dates: (int*int*int) list, months: int list) =
    if null dates
    then []
    else
        if any (#2 (hd dates), months)
        then (hd dates)::(dates_in_months (tl dates, months))
        else (dates_in_months (tl dates, months))


fun get_nth (lst: string list, n: int) =
    if n = 1 then hd lst else get_nth (tl lst, n-1)


fun date_to_string (date: int*int*int) =
    let
        val month = get_nth (MONTHS, #2 date)
        val day = Int.toString (#3 date)
        val year = Int.toString (#1 date)
    in
        month ^ " " ^ day ^ ", " ^ year
    end


fun number_before_reaching_sum (sum: int, lst: int list) =
    let
        fun inner_sum (num: int, sum: int, lst: int list) =
            if sum - hd lst > 0
            then inner_sum (num + 1, sum - hd lst, tl lst)
            else num
    in
        inner_sum (0, sum, lst)
    end


fun what_month (day_num: int) =
    (number_before_reaching_sum (day_num, MONTHS_DAYS)) + 1