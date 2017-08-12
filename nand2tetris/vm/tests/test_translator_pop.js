/* eslint-env mocha */
const { expect } = require('chai');
const { _test } = require('../translator/pop');
const { _test: testParser } = require('../parser');

const { translatePop } = _test;
const { parseStatement } = testParser;

const popArg2 =
`// pop argument 2
@2
D=A
@ARG
D=M+D
@POPTMP
M=D
@SP
A=M
D=M
@POPTMP
A=M
M=D
@SP
M=M-1
`;

const popStatic2 =
`// pop static 2
@SP
A=M
D=M
@Foo.2
M=D
@SP
M=M-1
`;

const popTemp2 =
`// pop temp 2
@SP
A=M
D=M
@R7
M=D
@SP
M=M-1
`;

const popPointer0 =
`// pop pointer 0
@SP
A=M
D=M
@THIS
A=M
M=D
@SP
M=M-1
`;

const popPointer1 =
`// pop pointer 1
@SP
A=M
D=M
@THAT
A=M
M=D
@SP
M=M-1
`;

describe('translator translatePop', () => {
    it('should translate pop arg', () => {
        const pop = parseStatement('pop argument 2', 'test');
        const result = translatePop(pop);
        expect(result).to.eql(popArg2);
    });
    it('should translate pop static', () => {
        const pop = parseStatement('pop static 2', 'Foo.vm');
        const result = translatePop(pop);
        expect(result).to.eql(popStatic2);
    });
    it('should translate pop temp', () => {
        const pop = parseStatement('pop temp 2', 'Foo.vm');
        const result = translatePop(pop);
        expect(result).to.eql(popTemp2);
    });
    it('should translate pop pointer 0', () => {
        const pop = parseStatement('pop pointer 0', 'Foo.vm');
        const result = translatePop(pop);
        expect(result).to.eql(popPointer0);
    });
    it('should translate pop pointer 1', () => {
        const pop = parseStatement('pop pointer 1', 'Foo.vm');
        const result = translatePop(pop);
        expect(result).to.eql(popPointer1);
    });
});
