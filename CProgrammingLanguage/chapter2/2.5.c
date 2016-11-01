#include <stdio.h>

#define EOS '\0'

int any(char s1[], char s2[]);

int main() {
	char s1[] = "aaa bbb ccc";
	char s2[] = "zbf";
	char s3[] = "zzz";
	
	printf("%d\n", any(s1, s2));
	printf("%d\n", any(s1, s3));
	
	return 0;
}

int any(char s1[], char s2[]) {
	int i, j;
	for (i = 0; s2[i] != EOS; i++) {
		for(j = 0; s1[j] != EOS; j++) {
			if (s1[j] == s2[i])
				return j;
		}
		j = 0;
	}
	return -1;
}