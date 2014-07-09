# -*- coding: utf-8 -*-


def count_weighted_sum_diff(data):
    """
    Counts minimum weighted jobs sum by difference weight - length
    """

    weighted_sum = 0
    current_length = 0
    sorted_data = sort_data_by_diff(data)
    for [w, l] in sorted_data:
        current_length += l
        weighted_sum += w * current_length
    return weighted_sum


def sort_data_by_diff(data):
    """
    Sorts jobs by difference of weight and length
    :param data: [[job weight, job length], ...]
    :return: Sorted job list
    """

    def comparator(i1, i2):
        w = (i2[0] - i2[1]) - (i1[0] - i1[1])
        if w == 0:
            return i2[0] - i1[0]
        return w

    return sorted(data, cmp=comparator)


def sort_data_by_ratio(data):
    """
    Sorts jobs by ratio of weight and length
    :param data: [[job weight, job length], ...]
    :return: Sorted job list
    """

    def comparator(i1, i2):
        w = (i2[0]/i2[1]) - (i1[0]/i1[1])
        if w == 0:
            return i2[0] - i1[0]
        return w

    return sorted(data, cmp=comparator)


def count_weighted_sum_ratio(data):
    """
    Counts minimum weighted jobs sum by ratio weight/length
    """

    weighted_sum = 0
    current_length = 0
    sorted_data = sort_data_by_ratio(data)
    for [w, l] in sorted_data:
        current_length += l
        weighted_sum += w * current_length
    return weighted_sum