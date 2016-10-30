#include <stdio.h>

#define NEW_LINE '\n'
#define END_LINE '\0'
#define TAB '\t'
#define SPACE ' '
#define MAXLINE  10000

int get_line(char line[], int lim);

int main() {
	int len, maxlen;
	char line[MAXLINE];

	while((len = get_line(line, MAXLINE)) > 0) {
		if (len > 80)
			printf("%s\n", line);
	}
	return(0);
}

int get_line(char line[], int lim) {
	int c, i;
	for (i = 0; i <= lim && ((c = getchar()) != EOF && c != NEW_LINE); i++)
		line[i] = c;

	if (c == NEW_LINE) {
		line[i] = c;
		i++;
	}
	line[i] = END_LINE;
	return(i);
};
