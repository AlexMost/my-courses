#include <stdio.h>

int fahr_to_cel(int fahr);

int main() {
	int lower, top, fahr, celcius, step;

	lower = 0;
	top = 400;
	step = 20;

	fahr = lower;

	printf("Fahr -> Celcius\n");
	while (fahr <= top) {
		celcius = fahr_to_cel(fahr);
		printf("%d\t%d\n", fahr, celcius);
		fahr += step;
	}

	return(0);
}

int fahr_to_cel(int fahr) {
	return 5 * (fahr - 32) / 9;
}
