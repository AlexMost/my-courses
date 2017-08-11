const { expect } = require('chai');
const { _test } = require('../translator');
const { _test: testParser } = require('../parser');
const { Push, Pop } = require('../types');
const { SEGMENTS } = require('../defs');
const { translatePush } = _test;
const { parseStatement } = testParser;

const pushConst10 = 
`// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
`
const pushArg10 = 
`// push argument 10
@10
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
`

const pushLocal10 = 
`// push local 10
@10
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
`

const pushStatic10 = 
`// push static 10
@10
D=A
@Foo.10
A=M
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
`

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

});