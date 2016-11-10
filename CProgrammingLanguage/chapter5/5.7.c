#include <stdio.h>
#include <string.h>
#define MAXLEN 1000

int readlines1(char *lineptr[], int maxlines);
int readlines2(char *lineptr[], char stor[], int maxlines);

char *alloc(int n);
int mgetline(char *s, int lim);

int main() {
	char lines[MAXLEN];
	char *linesPtr[MAXLEN];
	int i;
	int nlines = 0;
	nlines = readlines2(linesPtr, lines, MAXLEN);
	
	printf("Lines total: %d\n", nlines);

	for (i = 0; i < nlines; i++)
		printf("%s\n", linesPtr[i]);
	
	return 0;
}
int readlines2(char *lineptr[], char *stor, int maxlines) {
	int len, i;
	char line[MAXLEN];
	i = 0;

	while((len = mgetline(line, MAXLEN)) > 0) {
		line[len - 1] = '\0';
		strcpy(stor, line);
		lineptr[i++] = stor;
		stor+=len;
	}

	return i;
}

int readlines1(char *lineptr[], int maxlines) {
	int len, i;
	char line[MAXLEN];
	char *p;
	i = 0;

	while((len = mgetline(line, MAXLEN)) > 0) {
		p = alloc(len);
		line[len -1 ] = '\0';
		strcpy(p, line);
		lineptr[i++] = p;
	}

	return i;
}