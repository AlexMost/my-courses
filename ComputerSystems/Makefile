CC=gcc

build: 2.55-build

2.55-build: pt2/2.55.c
	$(CC) -o build/2.55 pt2/2.55.c

2.55-debug: pt2/2.55.c
	$(CC) -o build/2.55 -g pt2/2.55.c

2.55: 2.55-build
	build/2.55
