#include <stdio.h>

int main() {
	int lower, top, fahr, celcius, step;

	lower = 0;
	top = 400;
	step = 20;

	fahr = lower;

	printf("Fahr -> Celcius\n");
	while (fahr <= top) {
		celcius = 5 * (fahr - 32) / 9;
		printf("%d\t%d\n", fahr, celcius);
		fahr += step;
	}

	return(0);
}
