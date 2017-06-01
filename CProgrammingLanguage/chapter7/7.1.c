#include <stdio.h>
#include <ctype.h>

// ctype funcs
int toupper(int c);
int tolower(int c);
int isalpha(int c);

int is_upper(char *word);


int main(int arc, char **argv) {
	int c;
	while((c = getchar()) != EOF)
		putchar(is_upper(*argv) ? toupper(c) : tolower(c));
	return 0;
}

int is_upper(char *word) {
	int c;
	while((c = *word++) != '\0')
		if (isalpha(c))
			return c >= 'A' && c <= 'Z';
	return 0;
}
