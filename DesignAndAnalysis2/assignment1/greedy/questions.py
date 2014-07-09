# -*- coding: utf-8 -*-
from lib.data_parser import parse_data_from_file
from lib.min_weighted_sum import count_weighted_sum_diff
from lib.min_weighted_sum import count_weighted_sum_ratio


if __name__ == "__main__":
    data = parse_data_from_file('./data/jobs.txt')
    question1_answer = count_weighted_sum_diff(data)
    question2_answer = count_weighted_sum_ratio(data)
    print "Question1 - %s" % question1_answer
    print "Question2 - %s" % question2_answer



