struct nlist {
	struct nlist *next;
	char *name;
	char *defn;
};

struct nlist *insert(char *key, char *value);
struct nlist *lookup(char *word);
void print_hash_table();
void undef(char *key);
