#include <stdio.h>

int main()
{
	double sum, v;
	sum = 0;
	while (scanf("e %lf", &v) == 1)
		printf("\t%.2f\n", sum += v);
	return 0;
}
