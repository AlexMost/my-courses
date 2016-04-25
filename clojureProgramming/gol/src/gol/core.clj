(ns gol.core
  (:gen-class))

(require '[gol.gol :as gol])
(require '[clojure.pprint :as pprint])

(defn -main
  [& args]
  (pprint/pprint (gol/empty-board 10 10)))
