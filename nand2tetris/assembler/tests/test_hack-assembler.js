const { expect } = require('chai');
const fs = require('fs');
const { _test, assemble } = require('../hack-assembler');
const { parse } = require('../parser');
const { assembleA, getCompSymb, getComp, getDest, getJump,
	assembleC } = _test;

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
	});
	it('getCompSymb should get comp symbolic part without dest', () => {
		const input = 'D;JNZ';
		const expected = 'D';
		expect(getCompSymb(input)).to.eql(expected);
	});
	it('getCompSymb should get comp symbolic part when num', () => {
		const input = '0;JMP';
		const expected = '0';
		expect(getCompSymb(input)).to.eql(expected);
	});
	it('getComp should decode bin computation', () => {
		const input = 'D=D+A';
		const expected = '0000010';
		expect(getComp(input)).to.eql(expected);
	});
	it('getComp should decode bin with jump', () => {
		const input = 'D;JGT';
		const expected = '0001100';
		expect(getComp(input)).to.eql(expected);
	});
	it('getDest should decode dest', () => {
		const input = 'DM=M+1;JEQ';
		const expected = '011';
		expect(getDest(input)).to.eql(expected);
	});
	it('getJump should decode jump', () => {
		const input = 'DM=M+1;JEQ';
		const expected = '010';
		expect(getJump(input)).to.eql(expected);
	});
	it('assembleC should decode C instruction', () => {
		const input = 'D=D+A';
		const expected = '1110000010010000';
		expect(assembleC(input)).to.eql(expected);
	});
});

describe('assemble test', () => {
	it('should assemble lines', () => {
		const expected = [
			'0000000000000010',
			'1110110000010000',
			'0000000000000011',
			'1110000010010000',
			'0000000000000000',
			'1110001100001000',
		];
		const lines = parse('./tests/fixtures/Add.asm');
		const result = assemble(lines);
		expect(result).to.eql(expected);
	});
});
