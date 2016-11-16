#include <stdio.h>
void swap(char s[], int i, int j);
void qsort(char s[], int left, int right);

int main() {
	char arr[] = {'6', '3', '4', '1', '5', '2'};
	qsort(arr, 0, sizeof(arr) - 1);
	printf("%s\n", arr);
	return 0;
}

void swap(char s[], int i, int j) {
	char tmp;
	tmp = s[i];
	s[i] = s[j];
	s[j] = tmp;
}

void qsort(char s[], int left, int right) {
	int i, last;
	if (left >= right)
		return;
	swap(s, left, (left + right) / 2);
	last = left;
	for (i = left + 1; i <= right; i++) {
		if (s[i] < s[left]){
			swap(s, ++last, i);
		}
	}
	swap(s, left, last);
	qsort(s, left, last - 1);
	qsort(s, last + 1, right);
}
