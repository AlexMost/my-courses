#include <stdio.h>

int is_little_endian() {
  unsigned char* c;
  unsigned short i = 0xff;
  c = (unsigned char*) &i;
  return c[0] == 0xff;
}

void run_258() {
  printf("\nexersize 2.58: \n");
  if (is_little_endian()) {
    printf("is little endian\n");
  } else {
    printf("is not little endian\n");
  }
}