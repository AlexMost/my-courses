#include <stdio.h>

unsigned hash(char *word);
struct nlist;

int main() {
	printf("%d\n", hash("test"));
	return 0;
}