const { expect } = require('chai');
const fs = require('fs');
const { _test, parse } = require('../parser');
const { getLines, AsmState, discoverLabels, 
	discoverVariables, resolveAddresses } = _test;

const expectedRect = [
  '@0',
  'D=M',
  '@23',
  'D;JLE',
  '@16',
  'M=D',
  '@16384',
  'D=A',
  '@17',
  'M=D',
  '@17',
  'A=M',
  'M=-1',
  '@17',
  'D=M',
  '@32',
  'D=D+A',
  '@17',
  'M=D',
  '@16',
  'MD=M-1',
  '@10',
  'D;JGT',
  '@23',
  '0;JMP'
];

describe('parser', () => {
	it('should parse lines without comments', () => {
		const lines = getLines('./tests/fixtures/Add.asm');
		expect(lines).to.eql([ '@2', 'D=A', '@3', 'D=D+A', '@0', 'M=D' ]);
	});

	it('discoverLabels should apply label declarations', () => {
		const expectedMax = [
		  '@R0',
		  'D=M',
		  '@R1',
		  'D=D-M',
		  '@OUTPUT_FIRST',
		  'D;JGT',
		  '@R1',
		  'D=M',
		  '@OUTPUT_D',
		  '0;JMP',
		  '@R0',
		  'D=M',
		  '@R2',
		  'M=D',
		  '@INFINITE_LOOP',
		  '0;JMP'
		]

		const lines = getLines('./tests/fixtures/Max.asm');
		const state = new AsmState();
		const resultLines = discoverLabels(lines, state);
		
		expect(resultLines.length).to.eql(16);
		expect(resultLines).to.eql(expectedMax);
		expect(state.getSymbol('OUTPUT_FIRST')).to.eql(10);
		expect(state.getSymbol('OUTPUT_D')).to.eql(12);
		expect(state.getSymbol('INFINITE_LOOP')).to.eql(14);
	});

	it('discoverVariables should discover variables', () => {
		const lines = getLines('./tests/fixtures/Rect.asm');
		const state = new AsmState();
		const resultLines = discoverLabels(lines, state);
		discoverVariables(lines, state);
		expect(state.getSymbol('counter')).to.eql(16);
		expect(state.getSymbol('address')).to.eql(17);
	});

	it('resolveAddresses replace all vars and labels with addresses', () => {
		const lines = getLines('./tests/fixtures/Rect.asm');
		const state = new AsmState();
		const resultLines = discoverLabels(lines, state);
		discoverVariables(lines, state);
		const result = resolveAddresses(resultLines, state);
		expect(result.length).to.eql(25);
		expect(result).to.eql(expectedRect);
	});

	it('should parse the program', () => {
		const result = parse('./tests/fixtures/Rect.asm');
		expect(result).to.eql(expectedRect);
	});
});
