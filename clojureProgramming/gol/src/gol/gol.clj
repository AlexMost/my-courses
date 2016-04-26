(ns gol.gol
  (:require [clojure.core :refer :all]))


(defn empty-board
  "Creates empty board w x h"
  [w h]
  (vec (repeat h (vec (repeat w nil)))))


(defn populate
  "Populates living cells into the empty board"
  [board living-cells]
  (reduce
    (fn [board coordinates] (assoc-in board coordinates :on))
    board
    living-cells))


(defn neighbours
  [[x y]]
  [[(dec x) y] [(inc x) y]
  [x (dec y)] [x (inc y)]
  [(inc x) (inc y)] [(dec x) (dec y)]
  [(dec x) (inc y)] [(inc x) (dec y)]])


(defn count-neighbours
  [board loc]
  (count (filter #(get-in board %) (neighbours loc))))


