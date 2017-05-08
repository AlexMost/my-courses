// entab

#include <stdio.h>
#include "calc.h"
#define SPACE ' '
#define TAB '\t'

const int TAB_SIZE = 4;


int main(int argc, char *argv[]) {
	int c;
	int tab_size = TAB_SIZE;

	if (argc > 1) {
		tab_size = atof(argv[1]);
	}

	int n = tab_size;

	printf("%s\n", argv[1]);

	while ((c = getchar()) != EOF) {
		if(c == TAB) {
			while(n-- > 0) {
				putchar(SPACE);
			}
			n = tab_size;
			continue;
		}
		putchar(c);
	}

	return(0);
}
