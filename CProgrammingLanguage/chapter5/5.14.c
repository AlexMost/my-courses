#include <stdio.h>
#include <string.h>

void swap(char s[], int i, int j);
void qsort(char s[], int left, int right, int (*comp)(char, char));
int asc(char s1, char s2);
int desc(char s1, char s2);

int main(int argc, char *argv[]) {
	int is_reverse = 0;

	if (argc > 1 && strcmp(argv[1], "-r") == 0) {
		is_reverse = 1;
	}
	
	char arr[] = {'6', '3', '4', '1', '5', '2'};
	qsort(arr, 0, sizeof(arr) - 1, is_reverse ? desc : asc);
	printf("%s\n", arr);
	return 0;
}

void swap(char s[], int i, int j) {
	char tmp;
	tmp = s[i];
	s[i] = s[j];
	s[j] = tmp;
}

void qsort(char s[], int left, int right, int (*comp)(char, char)) {
	int i, last;
	if (left >= right)
		return;
	swap(s, left, (left + right) / 2);
	last = left;
	for (i = left + 1; i <= right; i++) {
		if (comp(s[i], s[left]) < 0){
			swap(s, ++last, i);
		}
	}
	swap(s, left, last);
	qsort(s, left, (last - 1), comp);
	qsort(s, last + 1, right, comp);
}

int asc(char s1, char s2) {
	return s1 < s2 ? -1 : 1;
}

int desc(char s1, char s2) {
	return s1 < s2 ? 1 : -1;
}