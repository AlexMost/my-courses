const { expect } = require('chai');
const fs = require('fs');
const { _test } = require('../hack-assembler');
const { assembleA, getCompSymb, getComp } = _test;

describe('hack-assembler', () => {
	it('assembleA should return valid machine code', () => {
		const input = '@16';
		const expected = '0000000000010000';
		expect(assembleA(input)).to.eql(expected);
	});
	it('getCompSymb should get comp symbolic part', () => {
		const input = 'M=A+1;JNZ';
		const expected = 'A+1';
		expect(getCompSymb(input)).to.eql(expected);
	})
	it('getComp should decode bin computation', () => {
		const input = 'D=D+A';
		const expected = '0000010';
		expect(getComp(input)).to.eql(expected);
	})
});
