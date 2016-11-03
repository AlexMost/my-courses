#include <stdio.h>

#define GETCH_BUFF_SIZE 1000

int buffer[GETCH_BUFF_SIZE];
int bc = 0;

int getch(void) {
	int c;
	if (bc > 0) {
		c = buffer[--bc];
	} else {
		c = getchar();
	}
	// printf("next char - %c %d\n", c, c);
	return c;
}

void ungetchar(int c) {
	if (bc == GETCH_BUFF_SIZE) {
		printf("Error: buffer is full\n");
	} else {
		buffer[bc++] = c;
	}
}
