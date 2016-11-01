#include <stdio.h>

#define EOS '\0'

int strrindex(char s[], char t[]);
int len(char s[]);

int main() {
	char s[] = "www zzz dww ffff";
	char s2[] = "www zzz www ffff";
	char c[] = "www";

	printf("%d\n", strrindex(s, c));
	printf("%d\n", strrindex(s2, c));
	
	return 0;
}

int strrindex(char s[], char t[]) {
	int i, k, t_max_idx;
	t_max_idx = len(t) - 1;

	for (i = len(s) - 1; i != -1; i--)
		for(k = 0; t[k] == s[i - k]; k++)
			if (k == t_max_idx)
				return i - t_max_idx;

	return -1;
}

int len(char s[]) {
	int i = 0;
	while(s[i++] != EOS);
	return i - 1;
}
