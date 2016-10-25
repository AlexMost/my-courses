#include <stdio.h>

int main() {
	int c, b;
	c = getchar() != EOF;
	b = getchar() == EOF;
	printf("%d\t%d\n", c, b);
	return(0);
}
