#define HASHSIZE 101

struct nlist {
	struct nlist *next;
	char *name;
	char *defn;
};

static struct nlist *hastab[HASHSIZE];

unsigned hash(char *word) {
	unsigned hashval;
	for (hashval = 0; *word != '\0'; word++) {
		hashval = *word + 31 * hashval;
	}
	
	return hashval % HASHSIZE;
}
