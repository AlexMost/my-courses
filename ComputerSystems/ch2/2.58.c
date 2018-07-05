#include <stdio.h>
#include <assert.h>

int is_little_endian() {
  unsigned char* c;
  unsigned short i = 0xff;
  c = (unsigned char*) &i;
  return c[0] == 0xff;
}

void run_258() {
  assert(is_little_endian());
}