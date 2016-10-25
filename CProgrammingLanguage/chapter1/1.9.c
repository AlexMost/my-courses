#include <stdio.h>
#define SPACE ' '

int main() {
	int c;
	int spaces = 0;

	while ((c = getchar()) != EOF) {
		if (c != SPACE) {
			if(spaces > 0) {
				putchar(' ');
				spaces = 0;
			}
			putchar(c);
		} else {
			spaces++;
		}
	}

	return(0);
}
