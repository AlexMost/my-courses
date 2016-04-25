(ns gol.gol)

(defn empty-board
  [width height]
  (repeat height (repeat width nil)))
