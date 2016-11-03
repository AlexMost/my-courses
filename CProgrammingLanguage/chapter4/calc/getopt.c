#include <ctype.h>
#include "calc.h"

#define SPACE ' '
#define TAB '\t'
#define EOL '\0'

int getch(void);
void ungetchar(int c);


int getopt(char s[]) {
	int c, i = 0;

	while((s[0] = c = getch()) == SPACE || c == TAB);

	s[1] = EOL;
	if(!isdigit(c))
		return c;

	while(isdigit(c = getch()))
		s[++i] = c;

	ungetchar(c);
	s[++i] = EOL;

	return NUMBER_TYPE;
}
