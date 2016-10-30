#include <stdio.h>

#define SPACE ' '
#define TAB '\t'
#define NL '\n'
#define IN 1
#define OUT 0


int main() {
	int c, nc, nw, nl, state;
	nc = nw = nl = 0;
	state = OUT;

	while((c = getchar()) != EOF) {
		nc++;

		if (c == NL)
			nl++;

		if (c == NL || c == SPACE || c == TAB) {
			state = OUT;
			nw++;
		} else if(state == OUT) {
			state = IN;
		}
	}
	printf("symbols - %d; words - %d; lines - %d\n", nc, nw, nl);
	return(0);
}
