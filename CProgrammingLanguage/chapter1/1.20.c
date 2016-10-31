#include <stdio.h>

#define NEW_LINE '\n'
#define END_LINE '\0'
#define TAB '\t'
#define SPACE ' '
#define MAXLINE  10000

int get_line(char line[], int lim);
void revert(char line1[], char line2[]);
void print_line(char line[]);

int n = 4;

int main() {
	int len, maxlen;
	char line[MAXLINE];
	char reversed[MAXLINE];

	while((len = get_line(line, MAXLINE)) > 0) {
		revert(line, reversed);
		printf("%s\n", reversed);
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
	int i, j, c;
	i = j = c = 0;

	while(input[i] != END_LINE) {
		if (input[i] == TAB) {
			for (c = 0; c < n; c++) {
				output[j] = SPACE;
				j++;
			}
		} else {
			output[j] = input[i];
			j++;
		}
		i++;
	}
	
	output[j] = END_LINE;
}