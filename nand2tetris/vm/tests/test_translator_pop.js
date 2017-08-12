const { expect } = require('chai');
const { _test } = require('../translator/pop');
const { _test: testParser } = require('../parser');
const { Pop } = require('../types');
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
`

describe('translator translatePop', () => {
	it('should translate pop arg', () => {
		const pop = parseStatement('pop argument 2', 'test');
		const result = translatePop(pop);
		expect(result).to.eql(popArg2);
	});
});
