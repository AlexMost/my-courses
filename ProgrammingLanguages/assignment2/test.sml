(* Homework2 Simple Test *)
(* These are basic test cases. Passing these tests does not guarantee that your code will pass the actual homework grader *)
(* To run the test, add a new line to the top of this file: use "homeworkname.sml"; *)
(* All the tests should evaluate to true. For example, the REPL should say: val test1 = true : bool *)

use "hw2.sml";

val test1 = all_except_option("string", ["string"]) = SOME []
val test1_1 = all_except_option("string1", ["string"]) = NONE
val test1_2 = all_except_option("string", ["string", "abc", "avf"]) = SOME ["abc", "avf"]

val test2 = get_substitutions1([["foo"],["there"]], "foo") = []
val test22 = get_substitutions1(
    [["Fred","Fredrick"],["Elizabeth","Betty"],["Freddie","Fred","F"]], 
    "Fred") = ["Fredrick", "Freddie", "F"]
val test23 = get_substitutions1(
    [["Fred","Fredrick"],["Jeff","Jeffrey"],["Geoff","Jeff","Jeffrey"]],
    "Jeff") = ["Jeffrey","Geoff","Jeffrey"]

val test3 = get_substitutions2([["foo"],["there"]], "foo") = []
val test32 = get_substitutions1(
    [["Fred","Fredrick"],["Elizabeth","Betty"],["Freddie","Fred","F"]], 
    "Fred") = ["Fredrick", "Freddie", "F"]
val test33 = get_substitutions1(
    [["Fred","Fredrick"],["Jeff","Jeffrey"],["Geoff","Jeff","Jeffrey"]],
    "Jeff") = ["Jeffrey","Geoff","Jeffrey"]

val test4 = similar_names(
    [["Fred","Fredrick"],["Elizabeth","Betty"],["Freddie","Fred","F"]],
    {first="Fred", middle="W", last="Smith"}) =
	    [
            {first="Fred", last="Smith", middle="W"},
            {first="Fredrick", last="Smith", middle="W"},
	        {first="Freddie", last="Smith", middle="W"},
            {first="F", last="Smith", middle="W"}
        ]

val test5 = card_color((Clubs, Num 2)) = Black
val test52 = card_color((Diamonds, Num 2)) = Red

val test6 = card_value((Clubs, Num 2)) = 2
val test62 = card_value((Clubs, Ace)) = 11
val test63 = card_value((Clubs, Queen)) = 10

val test7 = remove_card([(Hearts, Ace)], (Hearts, Ace), IllegalMove) = []
val test71 = remove_card(
    [(Hearts, Ace), (Clubs, Num 2)], 
    (Hearts, Ace),
    IllegalMove) = [(Clubs, Num 2)]
val test72 = remove_card(
    [(Hearts, Ace), (Clubs, Num 2), (Hearts, Ace)],
    (Hearts, Ace),
    IllegalMove) = [(Clubs, Num 2), (Hearts, Ace)] 

val test8 = all_same_color([(Hearts, Ace), (Hearts, Ace)]) = true
val test81 = all_same_color([(Hearts, Ace), (Diamonds, Ace)]) = true
val test82 = all_same_color([(Hearts, Ace), (Clubs, Ace)]) = false
val test83 = all_same_color([(Clubs,Ace),(Spades,Ace),(Diamonds,Ace)]) = false

val test9 = sum_cards([(Clubs, Num 2),(Clubs, Num 2)]) = 4

val test10 = score([(Hearts, Num 2),(Clubs, Num 4)],10) = 4

val test11 = officiate([(Hearts, Num 2),(Clubs, Num 4)],[Draw], 15) = 6
val test12 = officiate([(Clubs,Ace),(Spades,Ace),(Clubs,Ace),(Spades,Ace)],
                       [Draw,Draw,Draw,Draw,Draw],
                       42)
             = 3
val test12_1 = min([1, 3, 10, 2]) = 1
val test12_2 = officiate(
    [(Hearts, Ace), (Clubs, Ace)],[Draw, Draw, Draw],
    10 
    ) = 1

val test13_1 = score_challenge([(Clubs,Ace),(Spades,Ace),(Clubs,Ace)], 23) = 0
val test13_2 = score_challenge([(Clubs,Ace),(Spades,Ace),(Clubs,Ace)], 33) = 0
val test13_3 = score_challenge(
    [(Clubs, Num 2), (Clubs,Ace), (Spades,Ace), (Clubs,Ace)], 5) = 0

val test14_1 = officiate_challenge(
    [(Clubs, Num 2), (Clubs,Ace), (Spades,Ace), (Clubs,Ace)],
    [Draw, Draw, Draw, Draw], 5) = 0

val test13 = ((officiate([(Clubs,Jack),(Spades,Num(8))],
                         [Draw,Discard(Hearts,Jack)],
                         42);
               false) 
              handle IllegalMove => true)

val test14 = careful_player (
    [(Clubs,Ace),(Spades,Ace),(Clubs,Ace),(Spades, Ace)],
    43) = [Draw, Draw, Draw]

val test14_2 = careful_player (
    [(Clubs,Ace),(Spades,Ace),(Clubs,Ace),(Spades, Ace)],
    22) = [Draw,Draw]

val test14_3 = careful_player (
    [(Clubs,Ace),(Spades,Ace),(Clubs,Ace),(Spades, Num 1), (Spades, Ace)],
    44) = [Draw, Draw, Draw, Draw, Discard (Spades,Num 1), Draw]
             
             
