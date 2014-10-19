 (* assignment 2 *)
fun same_string(s1, s2) = s1 = s2

(* solutions for problem 1 here *)
(* a *)
fun all_except_option (s1, options) =
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

datatype suit = Clubs | Diamonds | Hearts | Spades
datatype rank = Jack | Queen | King | Ace | Num of int 
type card = suit * rank

datatype color = Red | Black
datatype move = Discard of card | Draw 

exception IllegalMove

(* solutions for problem 2 here *)
(* a *)
fun card_color (Clubs, _) = Black
  | card_color (Spades, _) = Black
  | card_color _ = Red

(* b *)
fun card_value (_, Num a) = a
  | card_value (_, Ace) = 11
  | card_value _ = 10

(* c *)
fun remove_card (cs, c, e) =
    case all_except_option (c, cs) of
        NONE => raise e
        | SOME res => res

(* d *)
fun all_same_color (x::y::xs) =
    card_color(x) = card_color(y) andalso all_same_color(xs)
  | all_same_color _ = true

(* e *)
fun sum_cards cs =
    let 
        fun inner_sum ([], acc) = acc
          | inner_sum (c::xs, acc) = inner_sum (xs, (card_value c) + acc)
    in
        inner_sum (cs, 0)
    end

(* f *)
fun score (hc, goal) =
    let
        val sum = sum_cards hc
        val same_color = all_same_color hc
        val preliminary = if sum > goal then 3 * (sum - goal) else goal - sum
    in
        if same_color then preliminary div 2 else preliminary
    end

(* g *)
fun officiate (cards, moves, goal) =
    let
        fun remove (cs, c) = remove_card (cs, c, IllegalMove)
        fun game (hc, [], _) = score (hc, goal)
          | game (hc, _, []) = score (hc, goal)
          | game (hc, next_card::cl, move::moves) =
            case move of
                Draw =>
                    if (sum_cards hc) = goal
                    then score (hc, goal)
                    else game (next_card::hc, cl, moves)
                | Discard c => 
                    if (sum_cards hc) = goal
                    then score (hc, goal)
                    else game (remove (hc, c), cl, moves)
    in
        game ([], cards, moves)
    end


(* challenge problems *)
fun min (head::tail) =
    let
        fun inner_min ([], m) = m
          | inner_min (x::xs, m) =
            if x < m then inner_min(xs, x) else inner_min(xs, m)
    in
        inner_min (tail, head)
    end

(* a.1 *)
(* TODO: use get substitution *)
fun score_challenge (hc, goal) =
    let 
        fun get_scores (_, [], scores) = min scores
          | get_scores (head, card::tail, scores) =
            case card of
                (c, Ace) => get_scores (
                    (c, Num 1)::head,
                    tail,
                    (score (head @ (c, Num 1)::tail, goal))::scores
                    )
                | _ => get_scores(card::head, tail, scores)
    in
        get_scores([], hc, [score(hc, goal)])
    end

(* a.2 *)
fun officiate_challenge (cards, moves, goal) =
    let
        fun remove (cs, c) = remove_card (cs, c, IllegalMove)

        fun game (hc, [], _) = 
            if (sum_cards hc) > goal
            then score_challenge (hc, goal)
            else score (hc, goal)

          | game (hc, _, []) =
            if (sum_cards hc) > goal
            then score_challenge (hc, goal)
            else score (hc, goal)

          | game (hc, next_card::cl, move::moves) =
            case move of
                Draw =>
                    if (sum_cards hc) = goal
                    then score (hc, goal)
                    else game (next_card::hc, cl, moves)
                | Discard c => 
                    if (sum_cards hc) = goal
                    then score (hc, goal)
                    else game (remove (hc, c), cl, moves)
    in
        game ([], cards, moves)
    end

(* b *)
fun careful_player (cl, goal) =
    let
        fun get_discard (c, hc) =
            let 
                fun get_disc (_, []) = NONE
                  | get_disc (c, x::xs) =
                    let
                        val discard = remove_card (hc, x, IllegalMove)
                        val s = score (c::discard, goal)
                    in
                        if s = 0
                        then SOME x
                        else get_disc (c, xs)
                    end
            in
                get_disc (c, hc)
            end

        fun get_move (c1::cl, hc) =
            case get_discard(c1, hc) of
                NONE =>
                    if ((sum_cards hc) + 10) >= goal
                    then NONE
                    else SOME Draw
                | SOME c => SOME (Discard c)    

        fun get_moves ([], _, moves) = moves 
          | get_moves (c1::cl, hc, moves) =
            if score (hc, goal) = 0
            then moves
            else
                case get_move (c1::cl, hc) of
                    SOME Draw => get_moves (cl, c1::hc, moves @ [Draw])
                    | SOME (Discard c) => moves @ [(Discard c), Draw]
                    | NONE => moves
    in
        get_moves (cl, [], [])
    end