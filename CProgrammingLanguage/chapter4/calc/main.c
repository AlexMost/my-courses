#include <stdio.h>
#include "calc.h"

int getopt(char s[]);

int main(){
	char op[MAX_OP];
	int code, tmp;

	while((code = getopt(op)) != EOF) {
		switch(code) {
			case NUMBER_TYPE:
				push(atof(op));
				break;
			case '+':
				push(pop() + pop());
				break;
			case '*':
				push(pop() * pop());
				break;
			case '-':
				tmp = pop();
				push(pop() - tmp);
				break;
			case '\n':
				printf("%f\n", pop());
				break;
			default:
				printf("Unknown op - %s\n", op);
		}
	}
	return 0;
}
