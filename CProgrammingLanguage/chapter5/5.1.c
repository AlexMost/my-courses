#include <stdio.h>
#include <ctype.h>
#define SIZE 100

int getint(int *);
int getch(void);
void ungetchar(const int c);

int main() {
	int array[SIZE];
	int n;
	for (n = 0; getint(&array[n]) != EOF; n++);

	while (n > 0)
		printf("%d\n", array[n-- - 1]);

	return 0;
}

int getint(int *pn) {
	int c, sign;

	while(isspace(c = getch()));
	
	if (!isdigit(c) && c != EOF && c != '+' && c != '-') {
		return 0;
	}

	sign = (c == '-') ? -1 : 1;

	if (c == '-' || c == '+')
		c = getch();

	for(*pn = 0; isdigit(c); c = getch())
		*pn = 10 * *pn + (c - '0');

	*pn *= sign;

	if (c != EOF)
		ungetchar(c);

	return c;
}