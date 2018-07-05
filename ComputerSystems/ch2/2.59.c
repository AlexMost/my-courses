#include <stdio.h>

int swap_least_byte(int x, int y) {
  return (y & ~0xFF) | (x & 0xFF);
}

void run_259() {
  int x = 0x89abcdef;
  int y = 0x76543210;
  printf("\nexersize 2.59\n");
  printf("%x\n", swap_least_byte(x, y));
}
