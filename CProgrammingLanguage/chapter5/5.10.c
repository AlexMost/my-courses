#include <stdio.h>
#include <ctype.h>
#include "calc.h"

int getopt(char s);
int getType(char *s);

int main(int argc, char *argv[]){
	int code, tmp, i;

	for(i = 1; i < argc; i++) {
		code = getType(argv[i]);
		switch(code) {
			case NUMBER_TYPE:
				push(atof(argv[i]));
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
				printf("Unknown op - %s\n", argv[i]);
		}
	}
	printf("%f\n", pop());
	return 0;
}

int getType(char *s) {
	char c = *s;
	
	while(c != EOL) {
		if (!isdigit(c))
			return c;
		c = *++s;
	}
	return NUMBER_TYPE;

}
