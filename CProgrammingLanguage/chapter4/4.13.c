#include <stdio.h>

int reverse(char s[], int i) {
	int c;
	if (s[i] == '\0') {
		return i - 1;
	} else {
		c = reverse(s, i + 1);
		printf("%c", s[c]);
		return c - 1;
	}
}

int main() {
	char s[] = "abcd";
	reverse(s, 0);
	return 0;
}
