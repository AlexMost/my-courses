// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 10
@10
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
@EQTRUE.2
D;JLT
@SP
A=M
A=A-1
M=0
@END.2
0;JMP
(EQTRUE.2)
@SP
A=M
A=A-1
M=-1
(END.2)
