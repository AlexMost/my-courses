#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAXWORD 1000

struct tnode {
	char *word;
	int count;
	struct tnode *left;
	struct tnode *right;
};

int getword(char *word, int lim);
struct tnode *addtree(
	struct tnode *root,
	char *word, int (*cmp)(const char *, const char *));
struct tnode *talloc(void);
void treeprint(struct tnode *p);

int main() {
	printf("Word count is working ...\n");
	char word[MAXWORD];
	struct tnode *root;
	root = NULL;

	while(getword(word, MAXWORD) != EOF) {
		if (isalpha(word[0])) {
			root = addtree(root, word, &strcmp);
		}
	}
	treeprint(root);
	return 0;
}


void treeprint(struct tnode *p) {
	if (p != NULL) {
		treeprint(p->left);
		printf("%4d %s\n", p->count, p->word);
		treeprint(p->right);
	}
}
