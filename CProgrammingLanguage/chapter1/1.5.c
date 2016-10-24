#include <stdio.h>

int main() {
	float fahr;

	for (fahr = 0; fahr <= 300; fahr += 20)
		printf("%.0f\t%.1f\n", fahr, (5.0/9.0) * (fahr - 32.0));

	return(0);
}
