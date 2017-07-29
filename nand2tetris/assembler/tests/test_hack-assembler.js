const { expect } = require('chai');
const fs = require('fs');
const { _test } = require('../hack-assembler');
const { assembleA, getCompSymb, getComp, getDest } = _test;

describe('hack-assembler', () => {
	it('assembleA should return valid machine code', () => {
		const input = '@16';
		const expected = '0000000000010000';
		expect(assembleA(input)).to.eql(expected);
	});
	it('getCompSymb should get comp symbolic part with dest', () => {
		const input = 'M=A+1;JNZ';
		const expected = 'A+1';
		expect(getCompSymb(input)).to.eql(expected);
	})
	it('getCompSymb should get comp symbolic part without dest', () => {
		const input = 'D;JNZ';
		const expected = 'D';
		expect(getCompSymb(input)).to.eql(expected);
	})
	it('getComp should decode bin computation', () => {
		const input = 'D=D+A';
		const expected = '0000010';
		expect(getComp(input)).to.eql(expected);
	})
	it('getComp should decode bin with jump', () => {
		const input = 'D;JGT';
		const expected = '0001100';
		expect(getComp(input)).to.eql(expected);
	})
	it('getDest should decode dest', () => {
		const input = 'DM=M+1;JEZ';
		const expected = '011';
		expect(getDest(input)).to.eql(expected);
	})
});
