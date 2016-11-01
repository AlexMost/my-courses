#include <stdio.h>

#define EOS '\0'

void squeeze_ch(char s[], char c);
void squeeze(char s1[], char s2[]);

int main() {
	char s1[] = "aaa bbb ccc";
	char s2[] = "bzf";
	squeeze(s1, s2);
	printf("%s\n", s1);
	return 0;
}

void squeeze_ch(char s[], char c) {
	int i, j;
	for (i = j = 0; s[i] != EOS; i++)
		if (s[i] != c)
			s[j++] = s[i];
	s[j] = EOS;
}

void squeeze(char s1[], char s2[]) {
	int i;
	for (i = 0; s2[i] != EOS; i++)
		squeeze_ch(s1, s2[i]);
}
