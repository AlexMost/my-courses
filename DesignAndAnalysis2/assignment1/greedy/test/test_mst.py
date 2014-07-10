# -*- coding: utf-8 -*-
from unittest import TestCase
from lib.data_parser import read_data_for_min_spanning_tree
from lib.min_spanning_tree import count_min_spanning_tree_path_sum
from lib.min_spanning_tree import get_min_spanning_tree_path
from test.count_weighted_fixtures import correct_data


class TestMST(TestCase):
    def test_file_read(self):
        data = read_data_for_min_spanning_tree(
            './question1_test_cases/case3.txt')
        self.assertEqual(data, correct_data)

    def test_mst_case3(self):
        data = read_data_for_min_spanning_tree(
            './question1_test_cases/case3.txt')
        mst_sum = count_min_spanning_tree_path_sum(data)
        self.assertEqual(mst_sum, 2624)

    def test_min_spanning_tree_path(self):
        data = read_data_for_min_spanning_tree(
            './question1_test_cases/case4.txt')
        tree_path = get_min_spanning_tree_path(data)
        self.assertEqual(tree_path, [[1, 2, 1], [2, 4, 2], [1, 3, 4]])

    def test_min_spanning_tree_sum(self):
        data = read_data_for_min_spanning_tree(
            './question1_test_cases/case4.txt')
        mst_sum = count_min_spanning_tree_path_sum(data)
        self.assertEqual(7, mst_sum)



