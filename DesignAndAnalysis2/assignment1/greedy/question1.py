# -*- coding: utf-8 -*-
# Question 1

# In this programming problem and the next you'll code up the greedy algorithms from lecture for
# minimizing the weighted sum of completion times..
# Download the text file http://spark-public.s3.amazonaws.com/algo2/datasets/jobs.txt.
# This file describes a set of jobs with positive and integral weights and lengths. It has the format
# [number_of_jobs]
# [job_1_weight] [job_1_length]
# [job_2_weight] [job_2_length]
# ...
# For example, the third line of the file is "74 59", indicating that the second job has weight 74 and
# length 59. You should NOT assume that edge weights or lengths are distinct.
#
# Your task in this problem is to run the greedy algorithm that schedules jobs in
# decreasing order of the difference (weight - length).
# Recall from lecture that this algorithm is not always optimal.
# IMPORTANT: if two jobs have equal difference (weight - length),
# you should schedule the job with higher weight first.
# Beware: if you break ties in a different way, you are likely to get the wrong answer.
# You should report the sum of weighted completion times of the resulting
# schedule --- a positive integer --- in the box below.


def sort_data(data):
    return sorted(data, key=lambda i: (i[0] - i[1]))


def count_weighted_sum(data):
    weighted_sum = 0
    current_length = 0
    for [w, l] in sort_data(data):
        current_length += l
        weighted_sum += w * current_length
    return weighted_sum


def parse_data_from_file(filename):
    with open(filename) as f:
        return [list(map(int, l.split(' '))) for l in
                f.readlines()[1:]]

if __name__ == "__main__":
    count_weighted_sum(1)



