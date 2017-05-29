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
	char *word,
	int (*cmp)(const char*, const char*)
);

struct tnode *talloc(void);
void treeprint(struct tnode *p);

int mycomp(char *word, char *word2);
int limit = 3;

int main() {
	printf("Word count is working ...\n");
	char word[MAXWORD];
	struct tnode *root;
	root = NULL;

	while(getword(word, MAXWORD) != EOF) {
		if (isalpha(word[0])) {
			root = addtree(root, word, &mycomp);
		}
	}

	treeprint(root);
	return 0;
}


void treeprint(struct tnode *p) {
	if (p != NULL) {
		treeprint(p->left);
		if (p->count >= 2) {
			printf("%4d %s\n", p->count, p->word);
		}
		treeprint(p->right);
	}
}

int mycomp(char *word, char *word2) {
	char c, c2;
	char *w = word;
	int i;
	while((c = *w++) != '\0') {
		i = w - word - 1;
		if (i >= limit) break;
		c2 = word2[i];
		if (c2 == '\0') break;
		if (c == c2) continue;
		if (c > c2) {
			return 1;
		}
		return -1;
	}
	return 0;
}
