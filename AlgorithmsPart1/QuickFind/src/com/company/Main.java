package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        QuickFind su = new QuickFind(10);
        su.join(6, 2);
        su.join(0, 9);
        su.join(3, 9);
        su.join(8, 9);
        su.join(5, 8);
        su.join(4, 6);
        System.out.println(Arrays.toString(su.get_id()));
    }
}
