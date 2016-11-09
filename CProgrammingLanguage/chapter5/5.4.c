#include <stdio.h>

int strend(char *s1, char *s2) {
	int len = 0;
	while(s2[len] != '\0')
		len++;

	while(*s1 != '\0')
		s1++;

	s1 -= len;
	while (*s1 == *s2) {
		s1++;
		s2++;
	}
	
	if ((*(s1 - 1) == '\0') && (*(s2 - 1) == '\0'))
		return 1;
	return 0;
}

int main() {
	char s1[] = "start end";
	char s2[] = "end";

	if (strend(s1, s2)) {
		printf("contains string\n");
	} else {
		printf("doesn't contains string\n");
	}
	
	return 0;
}