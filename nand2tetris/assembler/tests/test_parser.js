const { expect } = require('chai');
const fs = require('fs');
const { getLines } = require('../parser');

describe('parser.js getLines', () => {
	it('should parse lines without comments', () => {
		const lines = getLines('./tests/fixtures/Add.asm');
		expect(lines).to.eql([ '@2', 'D=A', '@3', 'D=D+A', '@0', 'M=D' ]);
	});
});
