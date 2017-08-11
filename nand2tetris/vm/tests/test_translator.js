const { expect } = require('chai');
const { _test } = require('../translator');
const { Push, Pop } = require('../types');
const { SEGMENTS } = require('../defs');
const { translatePush } = _test;


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

describe('translator translatePush', () => {
	it('should translate push constant', () => {
		const push = new Push(SEGMENTS.CONST, 10, 'push constant 10');
		const result = translatePush(push);
		expect(result).to.eql(pushConst10);
	});
});