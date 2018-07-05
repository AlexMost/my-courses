#include <stdio.h>
#include <assert.h>

int swap_least_byte(int x, int y) {
  return (y & ~0xFF) | (x & 0xFF);
}

void run_259() {
  int x = 0x89abcdef;
  int y = 0x76543210;
  assert(swap_least_byte(x, y) == 0x765432ef);
}
