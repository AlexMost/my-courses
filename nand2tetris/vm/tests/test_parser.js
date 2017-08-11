const { expect } = require('chai');
const { _test, parseVMCode } = require('../parser');
const { Push, Pop } = require('../types');
const { cleanLine, readRawLines, parseStatement } = _test;

describe('parser parseVMCode', () => {
	it('should parse vm code to statements', () => {
		const filepath = './tests/fixtures/test1.vm';
		const [push, pop] = parseVMCode(filepath);
		expect(push).to.be.an.instanceof(Push);
		expect(pop).to.be.an.instanceof(Pop);
	});

	it('shlould apply meta to statements', () => {
		const filepath = './tests/fixtures/static.vm'
		const [push] = parseVMCode(filepath);
		expect(push.getFilename()).to.eql('static.vm');
	});
});

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
		const stmt = parseStatement(line, 'test');
		expect(stmt).to.be.an.instanceof(Push);
	});

	it('should parse pop statement', () => {
		const line = 'pop local 10';
		const stmt = parseStatement(line, 'test');
		expect(stmt).to.be.an.instanceof(Pop);
	});
});