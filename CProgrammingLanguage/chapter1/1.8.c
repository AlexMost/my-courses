#include <stdio.h>

int main() {
	int c;
	long spaces = 0;
	long tabs = 0;
	long endl = 0;

	while ((c = getchar()) != EOF) {
		if (c == ' ') {
			spaces++;
			continue;
		}
		if (c == '\t') {
			tabs++;
			continue;
		}
		if (c == '\n') {
			endl++;
			continue;
		}
	}

	printf("spaces - %ld; tabs - %ld; endl - %ld\n",
		spaces, tabs, endl);

	return(0);
}
