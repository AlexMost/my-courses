CC = gcc
FILES_CH2 = ch2/2.5.c ch2/2.55.c ch2/2.58.c ch2/2.59.c

build: 2.5-build

ch2-build: $(FILES_CH2)
	$(CC) -o build/ch2 $(FILES_CH2)

ch2-debug: $(FILES_CH2)
	$(CC) -o build/ch2 -g $(FILES_CH2)

ch2: ch2-build
	build/ch2
