package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        QuickUnionWeighted quw = new QuickUnionWeighted(10);
        quw.union(2, 8);
        quw.union(5, 0);
        quw.union(0, 6);
        quw.union(4, 3);
        quw.union(4, 2);
        quw.union(1, 6);
        quw.union(7, 0);
        quw.union(8, 7);
        quw.union(4, 9);
        System.out.println(Arrays.toString(quw.get_id()));
    }
}
