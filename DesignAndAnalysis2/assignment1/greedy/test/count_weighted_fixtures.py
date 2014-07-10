# -*- coding: utf-8 -*-
fixture_weighted_sum = [[1, 2], [3, 5]]

fixture_for_data_sort = [[1, 2], [3, 4], [5, 6]]

case1_result = [[48, 14], [4, 90], [64, 22], [54, 66], [46, 6]]

correct_data = dict(
    node_count=6,
    edges_count=7,
    data=[
        [1, 2, 2474],
        [2, 4, -246],
        [4, 3, 640],
        [4, 5, 2088],
        [3, 6, 4586],
        [6, 5, 3966],
        [5, 1, -3824]
    ]
)
