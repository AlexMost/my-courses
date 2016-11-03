#include <stdio.h>
#include "calc.h"

double stack[MAX_STACK_SIZE];
int sp = 0;

void push(double n) {
	if (sp < MAX_STACK_SIZE) {
		stack[sp++] = n;
	} else {
		printf("Error: MAX_STACK_SIZE %d\n", MAX_STACK_SIZE);
	}
}

double pop() {
	if (sp > 0) {
		return stack[--sp];
	} else {
		printf("Error: no elements on stack\n");
		return 0.0;
	}
}
