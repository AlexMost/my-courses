#include <stdio.h>
#include <assert.h>

unsigned swap_least_byte(unsigned x, unsigned y) {
  return (y & ~0xFF) | (x & 0xFF);
}

void run_259() {
  unsigned x = 0x89abcdef;
  unsigned y = 0x76543210;
  assert(swap_least_byte(x, y) == 0x765432ef);
}
