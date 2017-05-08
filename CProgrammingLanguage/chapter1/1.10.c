#include <stdio.h>
#define SPACE ' '
#define TAB '\t'
#define SLASH '\\'
#define BACKSPACE '\b'

int main() {
	int c;
	int spaces = 0;

	while ((c = getchar()) != EOF) {
		if(c == TAB) {
			putchar('\\');
			putchar('t');
			continue;
		}
		if(c == BACKSPACE) {
			putchar('\\');
			putchar('b');
			continue;
		}
		if (c == SLASH) {
			putchar('\\');
			putchar('\\');
			continue;
		}
		putchar(c);
	}

	return(0);
}
