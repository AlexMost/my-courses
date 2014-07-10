# -*- coding: utf-8 -*-
from unittest import TestCase
from lib.data_parser import read_data_for_min_weighted_sum
from lib.min_weighted_sum import count_weighted_sum_diff, sort_data_by_diff

from test.count_weighted_fixtures import fixture_weighted_sum
from test.count_weighted_fixtures import case1_result
from test.count_weighted_fixtures import fixture_for_data_sort


class TestWeightedSumByDiffCriteria(TestCase):
    def test_count_weighted_sum(self):
        result = count_weighted_sum_diff(fixture_weighted_sum)
        self.assertEqual(result, 23)

    def test_data_sorting(self):
        sorted_data = sort_data_by_diff(fixture_weighted_sum)
        self.assertEqual(sorted_data, [[1, 2], [3, 5]])

    def test_data_sorting_with_equal_weight(self):
        sorted_data = sort_data_by_diff(fixture_for_data_sort)
        self.assertEqual(sorted_data, [[5, 6], [3, 4], [1, 2]])

    def test_case_from_lecture(self):
        data = [[3, 1], [2, 2], [1, 3]]
        result = count_weighted_sum_diff(data)
        self.assertEqual(result, 15)

    def test_parse_data_from_file(self):
        result = read_data_for_min_weighted_sum('./question1_test_cases/case1.txt')
        self.assertEqual(result, case1_result)

    def test_case1(self):
        data = read_data_for_min_weighted_sum('./question1_test_cases/case1.txt')
        result = count_weighted_sum_diff(data)
        self.assertEqual(result, 11336)

    def test_case2(self):
        data = read_data_for_min_weighted_sum('./question1_test_cases/case2.txt')
        result = count_weighted_sum_diff(data)
        self.assertEqual(result, 145924)

