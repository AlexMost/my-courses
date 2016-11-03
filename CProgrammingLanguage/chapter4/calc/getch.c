#include <stdio.h>

#define GETCH_BUFF_SIZE 1000

static int buffer[GETCH_BUFF_SIZE];
static int bc = 0;

int getch(void) {
	int c;
	if (bc > 0) {
		c = buffer[--bc];
	} else {
		c = getchar();
	}

	return c;
}

void ungetchar(const int c) {
	if (bc == GETCH_BUFF_SIZE) {
		printf("Error: buffer is full\n");
	} else {
		buffer[bc++] = c;
	}
}
