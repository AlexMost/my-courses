package com.company;

/**
 * Date: 6/26/14
 * Time: 12:00 AM
 */
public class QuickUnionWeighted {
    int [] id;
    int [] sz;


    public QuickUnionWeighted(int n) {
        this.id = new int[n];
        this.sz = new int[n];

        for (int i = 0; i < n; i++) {
            id[i] = i;
            sz[i] = 1;
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
        int root_a = this.root(a);

        if (this.sz[root_a] >= this.sz[root_b]) {
            this.id[root_b] = this.id[root_a];
            this.sz[root_a] += this.sz[root_b];
        } else {
            this.id[root_a] = this.id[root_b];
            this.sz[root_b] += this.sz[root_a];
        }
    }


    public int [] get_id() {
        return this.id;
    }
}
