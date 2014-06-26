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


    public void union(int p, int q) {
        int i = this.root(p);
        int j = this.root(q);
        this.id[i] = j;
    }

    public int [] get_id() {
        return this.id;
    }
}

