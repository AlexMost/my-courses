#include <stdio.h>

typedef unsigned char* byte_pointer;

void show_bytes(byte_pointer start, int size) {
  int i;
  for (i = 0; i < size; i++) {
    printf(" %.2x", start[i]);
  }
  printf("\n");
}

void show_int(int x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

int main() {
  show_int(12345);
  return 0;
}
