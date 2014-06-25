package com.company;

import org.junit.Test;

import static org.junit.Assert.*;

public class QuickUnionTest {
    @Test
    public void testConnected() throws Exception {
        QuickUnion su = new QuickUnion(10);
        su.union(0, 5);
        assertTrue(su.connected(0, 5));
    }

    @Test
    public void testUnion() throws Exception {
        int [] union1 = {1, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        QuickUnion su = new QuickUnion(10);
        su.union(0, 1);
        assertArrayEquals("0 and 1 must be equal to 1", su.get_id(), union1);

        int [] union2 = {1, 1, 3, 3, 4, 5, 6, 7, 8, 9};
        su.union(2, 3);
        assertArrayEquals("2 and 3 must be equal", su.get_id(), union2);

        int [] union3 = {3, 1, 3, 3, 4, 5, 6, 7, 8, 9};
        su.union(0, 3);
        assertArrayEquals("first 4 must be equal", su.get_id(), union3);
    }
}