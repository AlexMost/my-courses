#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAXWORD 1000

int getword(char *word, int lim);

struct tnode {
	char *word;
	int count;
	struct tnode *left;
	struct tnode *right;
};

struct tnode *addtree(struct tnode *root, char *word);
struct tnode *talloc(void);
void treeprint(struct tnode *p);

int main() {
	printf("Word count is working ...\n");
	char word[MAXWORD];
	struct tnode *root;
	root = NULL;

	while(getword(word, MAXWORD) != EOF) {
		if (isalpha(word[0])) {
			root = addtree(root, word);
		}
	}
	treeprint(root);
	return 0;
}

struct tnode *addtree(struct tnode *root, char *word) {
	int cond;
	if (root == NULL) {
		root = talloc();
		root->word = strdup(word);
		root->count = 1;
		root->left = NULL;
		root->right = NULL;
	} else if ((cond = strcmp(word, root->word)) == 0) {
		root->count += 1;
	} else if (cond < 0) {
		root->left = addtree(root->left, word);
	} else {
		root->right = addtree(root->right, word);
	}
	return root;
}

struct tnode *talloc(void) {
	return (struct tnode *) malloc(sizeof(struct tnode));
}

void treeprint(struct tnode *p) {
	if (p != NULL) {
		treeprint(p->left);
		printf("%4d %s\n", p->count, p->word);
		treeprint(p->right);
	}
}
