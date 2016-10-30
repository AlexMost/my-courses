#include <stdio.h>

#define NEW_LINE '\n'
#define END_LINE '\0'
#define TAB '\t'
#define SPACE ' '
#define MAXLINE  10000

int get_line(char line[], int lim);
void copy_line(char line1[], char line2[]);
void print_line(char line[]);
void trim(char line[]);

int main() {
	int len, maxlen;
	char line[MAXLINE];

	while((len = get_line(line, MAXLINE)) > 0) {
		trim(line);
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

void trim(char line[]) {
	int len = 0;
	while(line[len] != END_LINE)
		len++;

	while((line[len]) == END_LINE ||  (line[len]) == SPACE || (line[len]) == TAB) {
		len--;
	}
	line[len] = END_LINE;
}