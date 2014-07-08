# -*- coding: utf-8 -*-
from unittest import TestCase

from question1 import count_weighted_sum
from question1 import parse_data_from_file
from question1 import sort_data

from test.test_count_weighted_sum1_fixtures import fixture_weighted_sum
from test.test_count_weighted_sum1_fixtures import case1_result
from test.test_count_weighted_sum1_fixtures import fixture_for_data_sort


class TestWeightedSum1(TestCase):
    def test_count_weighted_sum(self):
        result = count_weighted_sum(fixture_weighted_sum)
        self.assertEqual(result, 22)

    def test_data_sorting(self):
        sorted_data = sort_data(fixture_weighted_sum)
        self.assertEqual(sorted_data, [[3, 5], [1, 2]])

    def test_data_sorting_with_equal_weight(self):
        sorted_data = sort_data(fixture_for_data_sort)
        self.assertEqual(sorted_data, [[5, 6], [3, 4], [1, 2]])

    def test_parse_data_from_file(self):
        result = parse_data_from_file('./question1_test_cases/case1.txt')
        self.assertEqual(result, case1_result)

    def test_case1(self):
        data = parse_data_from_file('./question1_test_cases/case1.txt')
        result = count_weighted_sum(data)
        self.assertEqual(result, 11336)
