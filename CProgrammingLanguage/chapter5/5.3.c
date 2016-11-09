#include <stdio.h>

void mystrcat(char *s1, char *s2) {
	while(*s1 != '\0')
		s1++;
	
	while((*s1 = *s2) != '\0') {
		s1++;
		s2++;
	}
}

int main() {
	char s1[] = "start ";
	char s2[] = "end ";
	mystrcat(s1, s2);
	printf("%s\n", s1);
	return 0;
}