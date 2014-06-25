package com.company;

/**
 * Date: 6/25/14
 * Time: 12:30 AM
 */
public class QuickUnion {
    int [] id;


    public QuickUnion(int n) {
        this.id = new int[n];

        for (int i = 0; i < n; i++) {
            id[i] = i;
        }
    }


    public int root(int i) {
        while(i != this.id[i]) i = this.id[i];
        return i;
    }


    public boolean connected(int a, int b) {
        return root(a) == root(b);
    }


    public void union(int a, int b) {
        int root_b = this.root(b);
        this.id[a] = this.id[root_b];
    }

    public int [] get_id() {
        return this.id;
    }
}

