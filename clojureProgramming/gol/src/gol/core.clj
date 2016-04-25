(ns gol.core
  (:gen-class))

(require '[gol.gol :as gol])
(require '[clojure.pprint :as pprint])

(defn -main
  [& args]
  (pprint/pprint (gol/render-scene 10 10 [])))
