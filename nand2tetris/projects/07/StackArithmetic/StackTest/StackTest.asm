// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.2
D;JEQ
@SP
A=M
A=A-1
M=0
@END.StackTest.2
0;JMP
(EQTRUE.StackTest.2)
@SP
A=M
A=A-1
M=-1
(END.StackTest.2)
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.5
D;JEQ
@SP
A=M
A=A-1
M=0
@END.StackTest.5
0;JMP
(EQTRUE.StackTest.5)
@SP
A=M
A=A-1
M=-1
(END.StackTest.5)
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.8
D;JEQ
@SP
A=M
A=A-1
M=0
@END.StackTest.8
0;JMP
(EQTRUE.StackTest.8)
@SP
A=M
A=A-1
M=-1
(END.StackTest.8)
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.11
D;JLT
@SP
A=M
A=A-1
M=0
@END.StackTest.11
0;JMP
(EQTRUE.StackTest.11)
@SP
A=M
A=A-1
M=-1
(END.StackTest.11)
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.14
D;JLT
@SP
A=M
A=A-1
M=0
@END.StackTest.14
0;JMP
(EQTRUE.StackTest.14)
@SP
A=M
A=A-1
M=-1
(END.StackTest.14)
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.17
D;JLT
@SP
A=M
A=A-1
M=0
@END.StackTest.17
0;JMP
(EQTRUE.StackTest.17)
@SP
A=M
A=A-1
M=-1
(END.StackTest.17)
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.20
D;JGT
@SP
A=M
A=A-1
M=0
@END.StackTest.20
0;JMP
(EQTRUE.StackTest.20)
@SP
A=M
A=A-1
M=-1
(END.StackTest.20)
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.23
D;JGT
@SP
A=M
A=A-1
M=0
@END.StackTest.23
0;JMP
(EQTRUE.StackTest.23)
@SP
A=M
A=A-1
M=-1
(END.StackTest.23)
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// gt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.StackTest.26
D;JGT
@SP
A=M
A=A-1
M=0
@END.StackTest.26
0;JMP
(EQTRUE.StackTest.26)
@SP
A=M
A=A-1
M=-1
(END.StackTest.26)
// push constant 57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 53
@53
D=A
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M+D
// push constant 112
@112
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M-D
// neg
@SP
A=M
A=A-1
M=-M
// and
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M&D
// push constant 82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1
// or
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M|D
// not
@SP
A=M
A=A-1
M=!M
