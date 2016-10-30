#include <stdio.h>

#define NEW_LINE '\n'
#define END_LINE '\0'
#define MAXLINE  10000

int get_line(char line[], int lim);
void copy_line(char line1[], char line2[]);
void print_line(char line[]);

int main() {
	int len, maxlen;
	maxlen = 0;
	char line[MAXLINE];
	char longest_line[MAXLINE];

	while((len = get_line(line, MAXLINE)) > 0) {
		if (len > maxlen) {
			maxlen = len;
			copy_line(line, longest_line);
		}
	}
	printf("%s\n", longest_line);
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

void copy_line(char line1[], char line2[]) {
	int i = 0;

	while(line1[i] != END_LINE) {
		line2[i] = line1[i];
		i++;
	}
	line2[i] = END_LINE;
	return;
}
