#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAXWORD 1000
#define NKEYS sizeof(keytab) / sizeof(keytab[0])

int getword(char *word, int lim);
int getch(void);
void ungetchar(int);

struct key {
	char *word;
	int count;
};

struct key keytab[] = {
	"for", 0,
	"int", 0,
	"while", 0,
};

int binaryserch(char *word, struct key keytab[], int size);

int main() {
	printf("6.1 Start\n");
	int i, n;
	char word[MAXWORD];

	while((getword(word, MAXWORD) != EOF)) {
		if (isalpha(word[0]))
			if ((n = binaryserch(word, keytab, NKEYS)) >= 0) {
				keytab[n].count++;
			}
	}
	for (i = 0; i < NKEYS; i++) {
		if (keytab[i].count > 0)
			printf("%s -> %d\n", keytab[i].word, keytab[i].count);
	}

	return 0;
}

int binaryserch(char *word, struct key keytab[], int size) {
	int low = 0;
	int high = size -1;
	int mid;
	int cond;
	while(low <= high) {
		mid = (low + high) / 2;

		// printf("> %s, %s, %d | mid %d low %d high %d\n", word, keytab[mid].word, strcmp(word, keytab[mid].word), mid, low, high);

		if ((cond = strcmp(word, keytab[mid].word)) < 0) {
			high = mid - 1;
		} else if (cond > 0) {
			low = mid + 1;
		} else {
			return mid;
		}
	}
	return -1;
}


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