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
});
