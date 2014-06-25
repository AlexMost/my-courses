package com.company;

import org.junit.Test;

import static org.junit.Assert.*;
import static org.junit.Assert.assertArrayEquals;

public class QuickUnionWeightedTest {

    @Test
    public void testConnected() throws Exception {
        QuickUnionWeighted su = new QuickUnionWeighted(10);
        su.union(0, 5);
        assertTrue(su.connected(0, 5));
    }

    @Test
    public void testUnion() throws Exception {
        // test cases from lecture https://class.coursera.org/algs4partI-005/lecture/8

        int [] union1 = {0, 1, 2, 4, 4, 5, 6, 7, 8, 9};
        QuickUnionWeighted su = new QuickUnionWeighted(10);
        su.union(4, 3);
        assertArrayEquals("0 and 1 must be equal to 1", su.get_id(), union1);

        int [] union2 = {0, 1, 2, 4, 4, 5, 6, 7, 4, 9};
        su.union(3, 8);
        assertArrayEquals("check union 3 to 8", su.get_id(), union2);

        int [] union3 = {0, 1, 2, 4, 4, 6, 6, 7, 4, 9};
        su.union(6, 5);
        assertArrayEquals("check union 6 to 5", su.get_id(), union3);

        int [] union4 = {0, 1, 2, 4, 4, 6, 6, 7, 4, 4};
        su.union(4, 9);
        assertArrayEquals("check union 4 to 9", su.get_id(), union4);

        int [] union5 = {0, 2, 2, 4, 4, 6, 6, 7, 4, 4};
        su.union(2, 1);
        assertArrayEquals("check union 2 to 1", su.get_id(), union5);

        int [] union6 = {6, 2, 2, 4, 4, 6, 6, 7, 4, 4};
        su.union(5, 0);
        assertArrayEquals("check union 5 to 0", su.get_id(), union6);
        assertTrue(su.connected(5, 0));

        int [] union7 = {6, 2, 2, 4, 4, 6, 6, 2, 4, 4};
        su.union(7, 2);
        assertArrayEquals("check union 7 to 2", su.get_id(), union7);
        assertTrue(su.connected(7, 2));

        int [] union8 = {6, 2, 6, 4, 4, 6, 6, 2, 4, 4};
        su.union(6, 1);
        assertArrayEquals("check union 6 to 1", su.get_id(), union8);
        assertTrue(su.connected(6, 1));

        int [] union9 = {6, 2, 6, 4, 6, 6, 6, 2, 4, 4};
        su.union(7, 3);
        assertArrayEquals("check union 7 to 3", su.get_id(), union9);
        assertTrue(su.connected(7, 3));
    }

}