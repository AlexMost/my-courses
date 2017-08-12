/* eslint-env mocha */
const { expect } = require('chai');
const { translate } = require('../translator');

const constResult =
`// push constant 1
@1
D=A
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
A=M
D=M
@POPTMP
A=M
M=D
@SP
M=M-1`;

describe('translator', () => {
    it('should translate push', () => {
        const input = `push constant 1`;
        const result = translate(input, 'Foo.vm');
        expect(result).to.eql(constResult);
    });
    it('should translate pop', () => {
        const input = `pop argument 1`;
        const result = translate(input, 'Foo.vm');
        expect(result).to.eql(popResult);
    });
});
