(* Assignment1 homework *)
(*1*)
fun is_older (date1: int*int*int, date2: int*int*int) =
    let
        val days1 = #1 date1 * 365 + #2 date1 * 30 + #3 date1
        val days2 = #1 date2 * 365 + #2 date2 * 30 + #3 date2
    in
        days1 < days2
    end

(*2*)
fun number_in_month (dates: (int*int*int) list, month: int) =
    if null dates
    then 0
    else
        if #2 (hd dates) = month
        then 1 + number_in_month (tl dates, month)
        else number_in_month (tl dates, month)

(*3*)
fun number_in_months (dates: (int*int*int) list, months: int list) =
    if null dates
    then 0
    else
        if any (#2 (hd dates), months)
        then 1 + number_in_months (tl dates, months)
        else number_in_months (tl dates, months)

(*4*)
fun dates_in_month (dates: (int*int*int) list, month: int) =
    if null dates
    then []
    else
        if #2 (hd dates) = month
        then (hd dates)::(dates_in_month (tl dates, month))
        else (dates_in_month (tl dates, month))

(*5*)
fun dates_in_months (dates: (int*int*int) list, months: int list) =
    if null dates
    then []
    else
        if any (#2 (hd dates), months)
        then (hd dates)::(dates_in_months (tl dates, months))
        else (dates_in_months (tl dates, months))

(*6*)
fun get_nth (lst: string list, n: int) =
    if n = 1 then hd lst else get_nth (tl lst, n-1)

(*7*)
fun date_to_string (date: int*int*int) =
    let
        val month = get_nth (MONTHS, #2 date)
        val day = Int.toString (#3 date)
        val year = Int.toString (#1 date)
    in
        month ^ " " ^ day ^ ", " ^ year
    end

(*8*)
fun number_before_reaching_sum (sum: int, lst: int list) =
    let
        fun inner_sum (num: int, sum: int, lst: int list) =
            if sum - hd lst > 0
            then inner_sum (num + 1, sum - hd lst, tl lst)
            else num
    in
        inner_sum (0, sum, lst)
    end

(*9*)
fun what_month (day_num: int) =
    (number_before_reaching_sum (day_num, MONTHS_DAYS)) + 1

(*10*)
fun month_range (day1: int, day2: int) =
    if day1 > day2
    then []
    else (what_month day1)::month_range (day1 + 1, day2)

(*11*)
fun oldest (dates: (int*int*int) list) =
    let
        fun inner_oldest (date: int*int*int, dates: (int*int*int) list) =
            if null dates
            then date
            else
                if is_older (hd dates, date)
                then inner_oldest (hd dates, tl dates)
                else inner_oldest (date, tl dates)
    in
        if null dates
        then NONE
        else SOME (inner_oldest (hd dates, tl dates))
    end


(* Challenge problems *)
(*12.1*)
fun number_in_months_challenge (dates: (int*int*int) list, months: int list) =
    number_in_months (dates, filter_unique months)

(*12.2*)
fun dates_in_months_challenge (dates: (int*int*int) list, months: int list) =
    dates_in_months (dates, filter_unique months)

(*13*)
fun reasonable_date (date: int*int*int) =
    let
        val year = #1 date
        val month = #2 date
        val day = #3 date

        fun is_valid_year () = year >= 0

        fun is_valid_month () = month > 0 andalso month <= 12

        fun validate_day_by_month (months: int list) =
            day > 0 andalso day <= get_nth_int (months, month)

        fun is_valid_day () =
            if is_leap_year year
            then validate_day_by_month LEAP_MONTH_DAYS
            else validate_day_by_month MONTHS_DAYS
    in
        is_valid_year() andalso is_valid_month() andalso is_valid_day()
    end


(*  ================  some common helpers ================ *)
val MONTHS_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

val LEAP_MONTH_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

val MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]


fun get_nth_int (lst: int list, n: int) =
    if n = 1 then hd lst else get_nth_int (tl lst, n-1)


fun any (number: int, lst: int list) =
    if null lst
    then false
    else number = (hd lst) orelse any (number, tl lst)


fun filter_unique (lst: int list) =
    let
        fun is_unique (el: int, lst: int list) =
            if null lst
            then true
            else
                if el = hd lst
                then false
                else is_unique (el, tl lst)
    in
        if null lst
        then []
        else
            if is_unique (hd lst, tl lst)
            then (hd lst)::filter_unique (tl lst)
            else filter_unique (tl lst)
    end


fun is_leap_year (year: int) =
    let
        val divisible400 = year mod 400 = 0
        val divisible4 = year mod 4 = 0
        val divisible100 = year mod 100 = 0
    in
        divisible400 orelse (divisible4 andalso not divisible100)
    end
