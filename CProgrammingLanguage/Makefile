run1: 1.3.o 1.4.o 1.5.o
	./dist/1.3
	./dist/1.4
	./dist/1.5

dist:
	mkdir -p dist

1.3.o: chapter1/1.3.c dist
	cc chapter1/1.3.c -o dist/1.3

1.4.o: chapter1/1.4.c dist
	cc chapter1/1.4.c -o dist/1.4

1.5.o: chapter1/1.5.c dist
	cc chapter1/1.5.c -o dist/1.5