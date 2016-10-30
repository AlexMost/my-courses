#include <stdio.h>

#define SPACE ' '
#define TAB '\t'
#define NL '\n'
#define IN 1
#define OUT 0
#define HIST_X 10


int main() {
	int i, j, c, nc, nw, nl, state, length;
	int words_lengths[HIST_X];
	nc = nw = nl = length = 0;
	state = OUT;

	for (i = 0; i < HIST_X; i++) {
		words_lengths[i] = 0;
	}

	while((c = getchar()) != EOF) {
		nc++;

		if (c == NL)
			nl++;

		if (c == NL || c == SPACE || c == TAB) {
			if (state == IN)
				words_lengths[length]++;
				length = 0;
			state = OUT;
			nw++;
		} else if(state == OUT) {
			state = IN;
		}

		if (state == IN)
			length++;
	}

	// printing words counts stats
	printf("Histogram:\n");

	// printing histogram
	i = HIST_X;
	for (i = HIST_X - 1; i > 0; i--) {
		for(j = 0; j < HIST_X; j++) {
			if (words_lengths[j] >= i) {
				printf("%d ", 1);
			} else {
				printf("  ");
			}
		}
		printf("\n");
	}
	
	for (i = 0; i < HIST_X; i++) {
		printf("%d ", i);
	}
	return(0);
}
