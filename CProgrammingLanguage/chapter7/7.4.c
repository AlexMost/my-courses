#include <stdio.h>

void minscanf(char *fmt, ...);

int main()
{
	int res = -1;
	
	minscanf("c %d", &res);

	if (res != -1)
		printf("%d\n", res);

	return 0;
}
