run1: 1.3.o 1.4.o 1.5.o
	./dist/1.3
	./dist/1.4
	./dist/1.5

1.6: 1.6.o
	./dist/1.6

1.7: 1.7.o
	./dist/1.7

1.8: 1.8.o
	cat ./fixtures/1.8.txt | ./dist/1.8

1.9: 1.9.o
	cat ./fixtures/1.9.txt | ./dist/1.9

dist:
	mkdir -p dist

1.3.o: chapter1/1.3.c dist
	cc chapter1/1.3.c -o dist/1.3

1.4.o: chapter1/1.4.c dist
	cc chapter1/1.4.c -o dist/1.4

1.5.o: chapter1/1.5.c dist
	cc chapter1/1.5.c -o dist/1.5

1.6.o: chapter1/1.6.c dist
	cc chapter1/1.6.c -o dist/1.6

1.7.o: chapter1/1.7.c dist
	cc chapter1/1.7.c -o dist/1.7

1.8.o: chapter1/1.8.c dist
	cc chapter1/1.8.c -o dist/1.8

1.9.o: chapter1/1.9.c dist
	cc chapter1/1.9.c -o dist/1.9