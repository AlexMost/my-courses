package com.company;


public class QuickFind {
    int [] id;

    public QuickFind(int n){
        this.id = new int [n];

        // initialization
        for (int i=0; i < n; i++) {
            this.id[i] = i;
        }
    }

    public void join(int n1, int n2) {
        int n1_symb = this.id[n1];
        int n2_symb = this.id[n2];
        for (int i=0; i < this.id.length; i++) {
            if(this.id[i] == n1_symb) {
                this.id[i] = n2_symb;
            }
        }
    }

    public boolean is_connected(int n1, int n2) {
        return id[n1] == id[n2];
    }

    public int [] get_id() {
        return this.id;
    }
}
