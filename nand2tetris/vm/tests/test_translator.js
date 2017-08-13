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
});
