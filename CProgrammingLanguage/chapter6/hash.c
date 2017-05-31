#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "hash.h"

#define HASHSIZE 10

struct nlist *hashtab[HASHSIZE];

unsigned hash(char *word) {
	unsigned hashval;
	for (hashval = 0; *word != '\0'; word++) {
		hashval = *word + 31 * hashval;
	}

	return hashval % HASHSIZE;
}

struct nlist *lookup(char *key) {
	struct nlist *np;
	for(np = hashtab[hash(key)]; np != NULL; np = np->next) {
		if(strcmp(key, np->name) == 0) {
			return np;
		}
	}
	return NULL;
}

struct nlist *insert(char *key, char *value) {
	struct nlist *np;
	unsigned hashval;

	if ((np = lookup(key)) == NULL) {
		np = (struct nlist *) malloc(sizeof(*np));
		if (np == NULL || (np->name = strdup(key)) == NULL)
			return NULL;
		hashval = hash(key);
		np->next = hashtab[hashval];
		hashtab[hashval] = np;
	} else {
		free((void *) np->defn);
	}
	if ((np->defn = strdup(value)) == NULL)
		return NULL;
	return np;
}

void undef(char *key) {
	struct nlist *np;
	struct nlist *prev;
	unsigned hashval = hash(key);
	if ((np = lookup(key)) != NULL) {
		prev = hashtab[hashval];
		// if no prev
		if(strcmp(prev->name, np->name) == 0) {
			hashtab[hashval] = prev->next;
		} else {
			for(;prev->next != NULL; prev = prev->next)
				if (strcmp(prev->next->name, np->name) == 0)
					break;
			prev->next = np->next;
		}
		
		free((void *) np);
	}
}

void print_hash_table() {
	int i;
	struct nlist *np;
	printf("Resulting hash table:\n");
	for (i = 0; i < HASHSIZE; i++) {
		if (hashtab[i] == NULL)
			continue;
		printf("%d | ", i);
		for(np = hashtab[i]; np != NULL; np = np->next)
			printf("[%s - %s] ", np->name, np->defn);
		printf("\n");
	}
}
