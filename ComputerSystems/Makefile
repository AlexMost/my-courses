CC = gcc
FILES_25 = pt2/2.5.c pt2/2.55.c

build: 2.5-build

2.5-build: $(FILES_25)
	$(CC) -o build/2.5 $(FILES_25)

2.5-debug: $(FILES_25)
	$(CC) -o build/2.5 -g $(FILES_25)

2.5: 2.5-build
	build/2.5
