(ns gol.gol-test
  (:require [clojure.test :refer :all]
            [gol.gol :refer :all]
            [gol.gol :as gol]))


(deftest empty-board-test
  (testing "test empty board"
    (is
      (= (gol/empty-board 2 2)
         [[nil nil] [nil nil]]))))


(deftest populate-test
  (testing "test populate"
    (let [board (gol/empty-board 2 2)
          live-cells [[1 1]]]
      (is
        (= (gol/populate board live-cells)
           [[nil nil] [nil :on]])))))


(deftest neighbours-test
  (testing "test neighbours"
    (is
      (= (gol/neighbours [1 1])
         [[0 1] [2 1] [1 0] [1 2] [2 2] [0 0] [0 2] [2 0]]))))


(deftest count-neighbours-test
  (testing "test count neighbours"
    (let [board (gol/populate (gol/empty-board 3 3) [[0 0] [2 2]])]
      (is (= (gol/count-neighbours board [0 1])
             1)))))