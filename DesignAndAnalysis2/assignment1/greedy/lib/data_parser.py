# -*- coding: utf-8 -*-


def read_data_for_min_weighted_sum(filename):
    with open(filename) as f:
        return [list(map(int, l.split(' '))) for l in
                f.readlines()[1:]]


def read_data_for_min_spanning_tree(filename):
    """
    Reads data for building minimum spanning tree
    :param filename: filename
    :return:
        {
            nodes: [number of nodes],
            edges: [number of edges],
            data:  [
                [one_node_of_edge_1] [other_node_of_edge_1] [edge_1_cost]
            ]
        }
    """

    with open(filename) as f:
        lines = f.readlines()
        [node_count, edges_count] = map(int, lines[0].split(' '))
        data = [map(int, l.split(' ')) for l in lines[1:]]

        return dict(
            node_count=node_count,
            edges_count=edges_count,
            data=data
        )