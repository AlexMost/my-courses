#include <stdio.h>
#include "hash.h"

int main() {

	insert("test", "1");
	insert("test1", "11");
	insert("test2", "3");
	insert("test3", "4");
	insert("test4", "4");
	insert("test5", "3");
	insert("test6", "30");
	insert("test7", "300");
	insert("test8", "301");
	insert("test9", "301");
	insert("test10", "301");
	insert("test11", "301");
	insert("test12", "301");
	insert("test13", "301");
	insert("test14", "301");

	print_hash_table();

	undef("test2");
	undef("test");
	undef("test13");

	print_hash_table();

	return 0;
}
