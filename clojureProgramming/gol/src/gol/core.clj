(ns gol.core
  (:gen-class))

(require '[gol.gol :as gol])
(require '[clojure.pprint :as pprint])

(defn clear-screen []
  (print (str (char 27) "[2J")) ; clear screen
  (print (str (char 27) "[;H")) ; move cursor to the top left corner of the screen
  )

(def initial-state
  (let [board (gol/empty-board 10 10)
        live-cells [[0 0] [0 1] [0 2] [2 0] [1 1] [1 0] [3 3]]]
    (gol/populate board live-cells)))


(defn board-view
  [board]
  (map
    (fn [row] (map #(if (= % nil) " " "*" ) row)) board))

(defn -main
  [& args]
  (loop [board initial-state]
    (clear-screen)
    (pprint/pprint (board-view board))
    (Thread/sleep 1000)
    (recur (gol/game-step board))))
