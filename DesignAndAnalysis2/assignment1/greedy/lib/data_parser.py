# -*- coding: utf-8 -*-


def parse_data_from_file(filename):
    with open(filename) as f:
        return [list(map(int, l.split(' '))) for l in
                f.readlines()[1:]]