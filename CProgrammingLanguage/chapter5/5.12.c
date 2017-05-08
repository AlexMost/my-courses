// entab
#include <stdio.h>
#define SPACE ' '
#define TAB '\t'

const int TAB_SIZE = 4;
int atoi(char ch[]);
int parse_arg(char ch[]);

int main(int argc, char *argv[]) {
	char c;
	int current_col = 0;
	int cols = parse_arg(argv[1]);
	int cols_offset = parse_arg(argv[2]);

	printf("cols: %d\n", cols);
	printf("cols offset: %d\n", cols_offset);

	int current_idx = 0;
	int tab_num = 0;

	while ((c = getchar()) != EOF) {
		if (current_idx < cols_offset) {
			putchar(c);
			current_idx++;
			continue;
		}
		
		if (current_idx >= cols_offset && current_idx % cols == 0) {
			while(tab_num++ < TAB_SIZE) {
				putchar(TAB);
			}
			tab_num = 0;
		}
		putchar(c);
		current_idx++;
	}

	return(0);
}

int parse_arg(char *ch) {
	return atoi(ch + 1);
}