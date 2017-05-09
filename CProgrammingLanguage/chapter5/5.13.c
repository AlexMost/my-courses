#include <stdio.h>
#include <string.h>
#define MAXLINE 1000
#define MAXLINES 1000
#define DEFAULT_SIZE 2;


int mgetline(char *s, int lim);
char *alloc(int size);
void print_lines(char *lines[], int len);
void offset_left(char *lines[], int len);
int get_tail_size(int argc, char *argv[]);
int atoi(char ch[]);

int main(int argc, char *argv[]) {
	int tail_size = get_tail_size(argc, argv);

	char line[MAXLINE];
	char *lines[tail_size];
	char *p;
	int len;
	int current_line_n = 0;

	while ((len = mgetline(line, MAXLINE)) > 0) {
		p = alloc(len);
		if (current_line_n >= tail_size) {
			current_line_n--;
			offset_left(lines, tail_size);
		}
		line[len-1] = '\0';
		strcpy(p, line);
		lines[current_line_n++] = p;
	}

	print_lines(lines, tail_size);
}

int get_tail_size(int argc, char *argv[]) {
	if (argc <= 1) {
		return DEFAULT_SIZE;
	}
	if (strncmp(argv[1], "-n", strlen(argv[1])) != 0) {
		return DEFAULT_SIZE;
	}
	return atoi(argv[2]);
}

void offset_left(char *lines[], int len) {
	int i;
	for (i = 1; i < len ; i++) {
		lines[i - 1] = lines[i];
	}
}

void print_lines(char *lines[], int len) {
	int i;
	for (i = 0; i < len; i++) {
		printf("%s\n", lines[i]);
	}
}