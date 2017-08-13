/* eslint-env mocha */
const { expect } = require('chai');
const { _test } = require('../translator/push');
const { _test: testParser } = require('../parser');

const { translatePush } = _test;
const { parseStatement } = testParser;

const pushConst10 =
`@10
D=A
@SP
A=M
M=D
@SP
M=M+1`;

const pushArg10 =
`@10
D=A
@ARG
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const pushLocal10 =
`@10
D=A
@LCL
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const pushStatic10 =
`@Foo.10
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const pushTemp2 =
`@R7
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const pushPointer0 =
`@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1`;

const pushPointer1 =
`@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1`;

describe('translator translatePush', () => {
    it('should translate push constant', () => {
        const push = parseStatement('push constant 10', 'test');
        const result = translatePush(push);
        expect(result).to.eql(pushConst10);
    });

    it('should translate push arg', () => {
        const push = parseStatement('push argument 10', 'test');
        const result = translatePush(push);
        expect(result).to.eql(pushArg10);
    });

    it('should translate push local', () => {
        const push = parseStatement('push local 10', 'test');
        const result = translatePush(push);
        expect(result).to.eql(pushLocal10);
    });

    it('should translate push static', () => {
        const push = parseStatement('push static 10', 'Foo.vm');
        const result = translatePush(push);
        expect(result).to.eql(pushStatic10);
    });

    it('should translate push temp', () => {
        const push = parseStatement('push temp 2', 'Foo.vm');
        const result = translatePush(push);
        expect(result).to.eql(pushTemp2);
    });

    it('should translate push pointer 0', () => {
        const push = parseStatement('push pointer 0', 'Foo.vm');
        const result = translatePush(push);
        expect(result).to.eql(pushPointer0);
    });

    it('should translate push pointer 1', () => {
        const push = parseStatement('push pointer 1', 'Foo.vm');
        const result = translatePush(push);
        expect(result).to.eql(pushPointer1);
    });
});
