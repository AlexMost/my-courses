#include <stdio.h>

#define NEW_LINE '\n'
#define END_LINE '\0'
#define TAB '\t'
#define SPACE ' '
#define MAXLINE  10000

int get_line(char line[], int lim);
void revert(char line1[], char line2[]);
void print_line(char line[]);

int main() {
	int len, maxlen;
	char line[MAXLINE];
	char reversed[MAXLINE];

	while((len = get_line(line, MAXLINE)) > 0) {
		revert(line, reversed);
		printf("%s", reversed);
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

void revert(char input[], char output[]) {
	int i, input_size = 0;
	while(input[input_size] != END_LINE)
		input_size++;
	for (i = 0; i < input_size; i++) {
		output[i] = input[input_size - i - 1];
	}
	output[i] = END_LINE;
}