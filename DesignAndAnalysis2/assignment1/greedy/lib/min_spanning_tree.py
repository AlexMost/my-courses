# -*- coding: utf-8 -*-


def is_out_edge(x, edge):
    [v1, v2, dist] = edge
    return ((v1 in x and v2 not in x) or
            (v2 in x and v1 not in x))


def get_min_spanning_tree_path(data):
    """
    Counts minimum spanning tree
    :param data:
    :return: edges [[v1, v2, edge length] ... ]
    """

    x = set()
    min_spanning_tree_path = []
    node_count = data["node_count"]
    edges_list = data["data"]
    vertex = edges_list[0][0]
    x.add(vertex)

    while len(x) != node_count:
        out_edges = [e for e in edges_list if is_out_edge(x, e)]

        [v1, v2, distance] = min(
            out_edges, key=lambda i: i[2])

        min_spanning_tree_path.append([v1, v2, distance])

        if v1 not in x:
            vertex = v1
        else:
            vertex = v2

        x.add(vertex)

    return min_spanning_tree_path


def count_min_spanning_tree_path_sum(data):
    return sum([dist for [v1, v2, dist] in
                get_min_spanning_tree_path(data)])
