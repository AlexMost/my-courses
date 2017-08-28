const { expect } = require('chai');
const { parseLines } = require('../../tokenizer/utils');

describe('tokenizer utils parseLines', () => {
    it('should parseLines without comments', () => {
        const input = `
        let x = 5; // let statement
        let y = 6/2; // let statement
        `;
        expect(parseLines(input)).to.eql(['let x = 5;', 'let y = 6/2;']);
    });
});
