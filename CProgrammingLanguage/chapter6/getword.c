#include <stdio.h>
#include <ctype.h>

int getch(void);
void ungetchar(int);

int getword(char *word, int lim) {
	char c;

	while(isspace(c = getch()))
		;
	if (c != EOF)
		*word++ = c;
	if (!isalpha(c)) {
		*word = '\0';
		return c;
	}
	for (; --lim > 0; word++) {
		if (!isalnum(*word = getch())) {
			ungetchar(*word);
			break;
		}
	}
	word[0] = '\0';
	return word[0];
}
