#include <stdio.h>

#define SPACE ' '
#define TAB '\t'
#define NL '\n'
#define IN 1
#define OUT 0
#define HIST_X 10
#define HIST_Y 10

// this one will count the histogram only for the letters
int main() {
	int c, i, j, range, tabs, nls, spaces;
	range = 'z' - 'a';
	int letters[range];

	for (c = 0; c < range; c++)
		letters[c] = 0;

	while ((c = getchar()) != EOF) {
		if ((c - 'a') >= range)
			continue;
		letters[c - 'a']++;
	}

	// printing words counts stats
	printf("Histogram:\n");

	// printing histogram
	i = HIST_Y;
	for (i = HIST_Y; i > 0; i--) {
		for(j = 0; j < range; j++) {
			if (letters[j] >= i) {
				printf("%d ", 1);
			} else {
				printf("  ");
			}
		}
		printf("\n");
	}
	
	for (i = 0; i <= range; i++) {
		printf("%c ", i + 'a');
	}

	return(0);
}
