(ns gol.core
  (:gen-class))

(require '[gol.gol :as gol])
(require '[clojure.pprint :as pprint])

(defn clear-screen []
  (print (str (char 27) "[2J")) ; clear screen
  (print (str (char 27) "[;H")) ; move cursor to the top left corner of the screen
  )

(defn -main
  [& args]
  (loop []
    (clear-screen)
    (println "step")
    (Thread/sleep 1000)
    (recur)))
