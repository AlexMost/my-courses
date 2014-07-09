# -*- coding: utf-8 -*-
from lib.data_parser import parse_data_from_file
from lib.min_weighted_sum import count_weighted_sum_diff


if __name__ == "__main__":
    data = parse_data_from_file('./data/jobs.txt')
    question1_answer = count_weighted_sum_diff(data)
    print "Question1 - %s" % question1_answer



