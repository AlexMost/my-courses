#include <stdio.h>
#include <string.h>

void map(int arr[], int (*mapper)(int arg), size_t size);
int incr(int i);

int main(int argc, char *argv[]) {
	int arr[] = { 1, 2, 3, 4, 5, 6 };
	int i;
	size_t arr_size = sizeof(arr)/sizeof(int);

	map(arr, incr, arr_size);

	for (i = 0; i < arr_size; i++) {
		printf("%d\n", arr[i]);
	}
	
	return 0;
}

void map(int *arr, int (*mapper)(int arg), size_t size) {
	int i;
	for (i = 0; i < size; i++) {
		arr[i] = (*mapper)(arr[i]);
	}
}

int incr(int i) {
	return i + 1;
}
