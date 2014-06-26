package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        QuickUnion su = new QuickUnion(10);
        su.union(0, 8);
        System.out.println(Arrays.toString(su.id));
        su.union(3, 4);
        System.out.println(Arrays.toString(su.id));
        su.union(2, 1);
        System.out.println(Arrays.toString(su.id));
        su.union(0, 5);
        System.out.println(Arrays.toString(su.id));
        su.union(7, 8);
        System.out.println(Arrays.toString(su.id));
        su.union(7, 9);
        System.out.println(Arrays.toString(su.id));
        
    }
}
