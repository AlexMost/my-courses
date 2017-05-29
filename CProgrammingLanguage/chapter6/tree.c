#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

struct tnode {
	char *word;
	int count;
	struct tnode *left;
	struct tnode *right;
};

struct tnode *talloc(void) {
	return (struct tnode *) malloc(sizeof(struct tnode));
}

struct tnode *addtree(
	struct tnode *root,
	char *word,
	int (*cmp)(const char *, const char *)
) {
	int cond;
	if (root == NULL) {
		root = talloc();
		root->word = strdup(word);
		root->count = 1;
		root->left = NULL;
		root->right = NULL;
	} else if ((cond = (*cmp)(word, root->word)) == 0) {
		root->count += 1;
	} else if (cond < 0) {
		root->left = addtree(root->left, word, cmp);
	} else {
		root->right = addtree(root->right, word, cmp);
	}
	return root;
}

struct tnode *addnode(struct tnode *tree, struct tnode *to_add) {
	if (tree == NULL) {
		tree = talloc();
		tree->word = strdup(to_add->word);
		tree->count = to_add->count;
		tree->left = NULL;
		tree->right = NULL;
	} else if (tree->count <= to_add->count) {
		tree->left = addnode(tree->left, to_add);
	} else {
		tree->right = addnode(tree->right, to_add);
	}
	return tree;
}
