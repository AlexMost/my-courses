#include <stdio.h>
#include <string.h>
#include <math.h>

#define EOS '\0'

int h_letter(char let) {
	return 10 + let - 'a';
}

int h_number(char num) {
	return 0 + num - '0';
}

int htoi(char hex[]) {
	int len, i, n, p;
	len = strlen(hex);
	i = n = p = 0;

	for(i = len - 1; i >= 0; i--) {
		if ((hex[i] == 'x') || (i == 0 && hex[i] == '0'))
			continue;

		if (hex[i] >= '0' && hex[i] <= '9') {
			n = n + h_number(hex[i]) * pow(16, p);
			p++;
		} else if (hex[i] >= 'a' && hex[i] <= 'f') {
			n = n + h_letter(hex[i]) * pow(16, p);
			p++;
		}
	}

	return n;
}

// this is kinda of a naive implementation of htoi func
int main() {
	char test1[] = "0xff";
	char test2[] = "ff";
	char test3[] = "0xaa";
	printf("%s - %d\n", test1, htoi(test1));
	printf("%s - %d\n", test2, htoi(test2));
	printf("%s - %d\n", test3, htoi(test3));
	return 0;
}