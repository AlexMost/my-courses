const { expect } = require('chai');
const { _test } = require('../parser');
const { Push } = require('../types');
const { cleanLine, readRawLines, parseStatement } = _test;

describe('parser cleanLine', () => {
	it('should parse lines without comments', () => {
		const line = 'push constant 10 // comment'
		expect(cleanLine(line)).to.eql('push constant 10');
	});
	it('should return empty string for only comment line', () => {
		const line = '// comment'
		expect(cleanLine(line)).to.eql('');
	});
});

describe('parser readRawLines', () => {
	it('should parse lines without comments', () => {
		const filepath = './tests/fixtures/test1.vm';
		const expected = ['push constant 10', 'pop local 0'];
		expect(readRawLines(filepath)).to.eql(expected);
	});
});

describe('parser parseStatement', () => {
	it('should parse push statement', () => {
		const line = 'push constant 10';
		const stmt = parseStatement(line);
		expect(stmt).to.be.an.instanceof(Push);
	});
});