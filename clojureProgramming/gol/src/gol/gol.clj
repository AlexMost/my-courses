(ns gol.gol)

(defn render-scene
  [width height live-cells]
  (repeat height (repeat width nil)))
