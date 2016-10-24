#include <stdio.h>

int main() {
	int top, step, lower;
	float celcius, fahr;

	lower = 0;
	top = 400;
	step = 20;

	fahr = lower;

	printf("Fahr -> Celcius\n");
	while (fahr <= top) {
		celcius = (5.0/9.0) * (fahr - 32.0);
		printf("%.0f\t%.1f\n", fahr, celcius);
		fahr += step;
	}

	printf("Celcius -> Fahr\n");
	celcius = lower;

	while (celcius <= top) {
		fahr = 1.8 * celcius + 32;
		printf("%.0f\t%.1f\n", celcius, fahr);
		celcius += step;
	}

	return(0);
}
