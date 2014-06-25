package com.company;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        QuickFind su = new QuickFind(10);
        su.join(0, 8);
        su.join(3, 4);
        su.join(2, 1);
        su.join(0, 5);
        su.join(7, 8);
        su.join(7, 9);
        System.out.println(Arrays.toString(su.get_id()));
    }
}
