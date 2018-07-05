#include <stdio.h>

typedef unsigned char* byte_pointer;

void show_bytes(byte_pointer start, int size) {
  int i;
  for (i = 0; i < size; i++) {
    // start[i] === *(start + i)
    printf(" %.2x", start[i]);
  }
  printf("\n");
}

void show_int(int x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

void show_long(long x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

void show_double(double x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

void show_short(short x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

void run_255() {
  printf("\nexersize 2.55: \n");
  show_int(1);
  show_short(12345);
  show_int(12345);
  show_long(12345);
  show_double(12345);
}