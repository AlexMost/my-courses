package com.company;

import junit.framework.TestCase;
import org.junit.Test;

import static org.junit.Assert.*;


public class QuickFindTest extends TestCase {

    @Test
    public void unionCreation() throws Exception {
        int [] test = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        QuickFind su = new QuickFind(10);
        assertArrayEquals("array must be equal", su.get_id(), test);
    }

    @Test
    public void testJoin() throws Exception {
        int [] union1 = {1, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        QuickFind su = new QuickFind(10);
        su.join(0, 1);
        assertArrayEquals("0 and 1 must be equal to 1", su.get_id(), union1);

        int [] union2 = {1, 1, 3, 3, 4, 5, 6, 7, 8, 9};
        su.join(2, 3);
        assertArrayEquals("2 and 3 must be equal", su.get_id(), union2);

        int [] union3 = {3, 3, 3, 3, 4, 5, 6, 7, 8, 9};
        su.join(0, 3);
        assertArrayEquals("first 4 must be equal", su.get_id(), union3);
    }

    @Test
    public void testIs_connected() throws Exception {
        QuickFind su = new QuickFind(10);
        su.join(0, 5);
        assertTrue(su.is_connected(0, 5));
    }
}