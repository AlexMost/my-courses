// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.


@0
D=A  // D=0

@color
M=-1

(KBDLOOP)
	@KBD
	D=M

	@BLACK
	D;JNE

	@WHITE
	0;JMP

(WHITE)
	@color
	M=0

	@FILL
	0;JMP

(BLACK)
	@color
	M=-1

	@FILL
	0;JMP

(FILL)
	@SCREEN
	D=A
	@scrn  // save screen offset
	M=D

	@32
	D=A
	@col    // col = 32
	M=D

	@256
	D=A
	@row    // row = 256
	M=D

	(ROW)
		(COLUMN)
			@color
			D=M

			@scrn   // scr = -1
			A=M
			M=D

			@scrn   // scr = scr + 1
			M=M+1

			@col
			M=M-1
			D=M

			@COLUMN
			D;JNE

		@32
		D=A
		@col  // col = 32
		M=D

		@row
		M=M-1 // row = row - 1
		D=M

		@ROW
		D;JNE

		@KBDLOOP
		0;JMP
