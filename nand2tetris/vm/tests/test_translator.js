/* eslint-env mocha */
const { expect } = require('chai');
const { translate } = require('../translator');
const { parseVMAST } = require('../parser');

const constResult =
`// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1`;

const staticResult =
`// push static 1
@Foo.1
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const popResult =
`// pop argument 1
@1
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
M=D`;

const addResult =
`// add
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M+D`;

const subResult =
`// sub
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M-D`;

const eqResult =
`// eq
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.Foo.0
D;JEQ
@SP
A=M
A=A-1
M=0
@END.Foo.0
0;JMP
(EQTRUE.Foo.0)
@SP
A=M
A=A-1
M=-1
(END.Foo.0)`;

const ltResult =
`// lt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.Foo.0
D;JLT
@SP
A=M
A=A-1
M=0
@END.Foo.0
0;JMP
(EQTRUE.Foo.0)
@SP
A=M
A=A-1
M=-1
(END.Foo.0)`;

const gtResult =
`// gt
@SP
M=M-1
@SP
A=M
D=M
A=A-1
D=M-D
@EQTRUE.Foo.0
D;JGT
@SP
A=M
A=A-1
M=0
@END.Foo.0
0;JMP
(EQTRUE.Foo.0)
@SP
A=M
A=A-1
M=-1
(END.Foo.0)`;

const negResult =
`// neg
@SP
A=M
A=A-1
M=-M`;

const andResult =
`// and
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M&D`;

const orResult =
`// or
@SP
M=M-1
@SP
A=M
D=M
A=A-1
M=M|D`;

const notResult =
`// not
@SP
A=M
A=A-1
M=!M`;

const labelResult =
`// label MY_LABEL
(MY_LABEL.Foo)`;

const ifgotoResult =
`// if-goto MY_LABEL
@SP
M=M-1
A=M
D=M
@MY_LABEL.Foo
D;JGT`;

const gotoResult =
`// goto MY_LABEL
@MY_LABEL.Foo
0;JMP`;

const func =
`// function Foo.test 2
(Foo.test)
@2
D=A
@i
M=D
(LOOP.Foo.0)
@SP
A=M
M=0
@SP
M=M+1
@i
M=M-1
D=M
@LOOP.Foo.0
D;JGT`;

const ret =
`// return
@LCL
D=M
@endFrame
M=D
@5
D=A
@endFrame
D=M-D
@retAddr
M=D
@SP
M=M-1
A=M
D=M
@ARG
A=M
M=D
@ARG
D=M
@SP
M=D+1
@endFrame
A=M-1
D=M
@THAT
M=D
@2
D=A
@endFrame
A=M-D
D=M
@THIS
M=D
@3
D=A
@endFrame
A=M-D
D=M
@ARG
M=D
@4
D=A
@endFrame
A=M-D
D=M
@LCL
M=D
@retAddr
A=M
0;JMP`;

describe('translator', () => {
    it('should translate push', () => {
        const input = `push constant 1`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(constResult);
    });

    it('should translate push static', () => {
        const input = `push static 1`;
        const result = translate(
            parseVMAST(input, 'some/path/Foo.vm'));
        expect(result).to.eql(staticResult);
    });

    it('should translate pop', () => {
        const input = `pop argument 1`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(popResult);
    });

    it('should translate add', () => {
        const input = `add`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(addResult);
    });

    it('should translate sub', () => {
        const input = `sub`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(subResult);
    });

    it('should translate eq', () => {
        const input = `eq`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(eqResult);
    });

    it('should translate lt', () => {
        const input = `lt`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(ltResult);
    });

    it('should translate gt', () => {
        const input = `gt`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(gtResult);
    });

    it('should translate neg', () => {
        const input = `neg`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(negResult);
    });

    it('should translate and', () => {
        const input = `and`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(andResult);
    });

    it('should translate or', () => {
        const input = `or`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(orResult);
    });

    it('should translate not', () => {
        const input = `not`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(notResult);
    });

    it('should translate label', () => {
        const input = `label MY_LABEL`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(labelResult);
    });

    it('should translate if-goto', () => {
        const input = `if-goto MY_LABEL`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(ifgotoResult);
    });

    it('should translate goto', () => {
        const input = `goto MY_LABEL`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(gotoResult);
    });

    it('should translate function', () => {
        const input = `function Foo.test 2`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(func);
    });

    it('should translate return', () => {
        const input = `return`;
        const result = translate(parseVMAST(input, 'Foo.vm'));
        expect(result).to.eql(ret);
    });
});
