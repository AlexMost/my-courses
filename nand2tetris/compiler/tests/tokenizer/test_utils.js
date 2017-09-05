const { expect } = require('chai');
const { parseLines, parseTokens } = require('../../tokenizer/utils');

describe('tokenizer utils parseLines', () => {
    it('should parseLines without comments', () => {
        const input = `
        let x = 5; // let statement
        // empty line
        let y = 6/2; // let statement
        `;
        expect(parseLines(input)).to.eql(['let x = 5;', 'let y = 6/2;']);
    });
});


describe('tokenizer utils parseTokens', () => {
    it('should parse tokens', () => {
        const input = `let x = 5;`;
        const tokens = parseTokens(input);
        const result = tokens.map((token) => [token.getType(), token.getValue()]);
        expect(result).to.eql([
                ['KEYWORD', 'let'],
                ['IDENTIFIER', 'x'],
                ['SYMBOL', '='],
                ['INTEGER_CONST', 5],
                ['SYMBOL', ';'],
        ]
        );
    });
    it('should throw unexpected token', () => {
        const input = `let 3x = 5;`;
        const fn = () => parseTokens(input);
        expect(fn).to.throw('Unexpected token \'3x\'');
    });
});
