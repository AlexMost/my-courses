# -*- coding: utf-8 -*-
from unittest import TestCase
from lib.data_parser import parse_data_from_file
from lib.min_weighted_sum import count_weighted_sum_ratio


class TestWeightedSumByRatioCriteria(TestCase):
    def test_case1(self):
        data = parse_data_from_file('./question1_test_cases/case1.txt')
        result = count_weighted_sum_ratio(data)
        self.assertEqual(result, 10548)

    # def test_case2(self):
    #     data = parse_data_from_file('./question1_test_cases/case2.txt')
    #     result = count_weighted_sum_ratio(data)
    #     self.assertEqual(result, 138232)
