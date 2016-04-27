(ns gol.gol
  (:require [clojure.core :refer :all]))


(defn empty-board
  [w h]
  (vec (repeat h (vec (repeat w nil)))))


(defn populate
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


(defn cell-check
  [board step]
  (let [n-count (count-neighbours board step)
        current (get-in board step)
        new-cell (case n-count
                   2 current
                   3 :on
                   nil)]
    (if (= current new-cell)
      board
      (assoc-in board step new-cell))))


(defn game-step
  [board]
  (let [h (count board)
        w (count (nth board 0))
        indicies (for [x (range 0 h) y (range 0 w)] [x y])]
        (reduce cell-check board indicies)))


