#include <ctype.h>
#include "calc.h"

#define SPACE ' '
#define TAB '\t'
#define EOL '\0'

int getch(void);
void ungetchar(int c);


int getopt(char s[]) {
	int c, i;
	i = 0;

	while((c = getch()) == SPACE || c == TAB);
	s[0] = c;
	if(!isdigit(c)) {
		s[1] = EOL;
		return c;
	}

	while(isdigit(c = getch())){
		i++;
		s[i] = c;
	}

	ungetchar(c);
	s[++i] = EOL;

	return NUMBER_TYPE;
}
