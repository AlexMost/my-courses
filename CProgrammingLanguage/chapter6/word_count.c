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

struct tnode *traverse(struct tnode *root, struct tnode *root2);
struct tnode *addnode(struct tnode *tree, struct tnode *to_add);

int main() {
	printf("Word count is working ...\n");
	char word[MAXWORD];
	struct tnode *root;
	struct tnode *root2;
	root = NULL;
	root2 = NULL;

	while(getword(word, MAXWORD) != EOF) {
		if (isalpha(word[0])) {
			root = addtree(root, word, &strcmp);
		}
	}

	root2 = traverse(root, root2);
	treeprint(root2);
	return 0;
}

struct tnode *traverse(struct tnode *root, struct tnode *root2) {
	if (root != NULL) {
		root2 = addnode(root2, root);
		traverse(root->left, root2);
		traverse(root->right, root2);
	}
	return root2;
}

void treeprint(struct tnode *p) {
	if (p != NULL) {
		treeprint(p->left);
		printf("%4d %s\n", p->count, p->word);
		treeprint(p->right);
	}
}
