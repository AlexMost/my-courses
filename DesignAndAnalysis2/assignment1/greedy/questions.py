# -*- coding: utf-8 -*-
from lib.data_parser import read_data_for_min_weighted_sum
from lib.data_parser import read_data_for_min_spanning_tree
from lib.min_spanning_tree import count_min_spanning_tree_path_sum
from lib.min_weighted_sum import count_weighted_sum_diff
from lib.min_weighted_sum import count_weighted_sum_ratio


if __name__ == "__main__":
    data = read_data_for_min_weighted_sum('./data/jobs.txt')
    question1_answer = count_weighted_sum_diff(data)
    question2_answer = count_weighted_sum_ratio(data)

    mst_data = read_data_for_min_spanning_tree('./data/edges.txt')
    mst_sum = count_min_spanning_tree_path_sum(mst_data)

    print "Question1 - %s" % question1_answer
    print "Question2 - %s" % question2_answer
    print "Question3 - %s" % mst_sum



