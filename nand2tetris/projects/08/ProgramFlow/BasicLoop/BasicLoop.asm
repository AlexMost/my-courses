// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 0
@0
D=A
@LCL
D=M+D
@POPTMP
M=D
@SP
M=M-1
@SP
A=M
D=M
@POPTMP
A=M
M=D
// label LOOP_START
(LOOP_START.BasicLoop)
// push argument 0
@0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 0
@0
D=A
@LCL
A=M
A=D+A
D=M
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
// pop local 0
@0
D=A
@LCL
D=M+D
@POPTMP
M=D
@SP
M=M-1
@SP
A=M
D=M
@POPTMP
A=M
M=D
// push argument 0
@0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 1
@1
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
// pop argument 0
@0
D=A
@ARG
D=M+D
@POPTMP
M=D
@SP
M=M-1
@SP
A=M
D=M
@POPTMP
A=M
M=D
// push argument 0
@0
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// if-goto LOOP_START
@SP
M=M-1
A=M
D=M
@LOOP_START.BasicLoop
D;JNE
// push local 0
@0
D=A
@LCL
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
