const { expect } = require('chai');
const { parseLines, parseTokens } = require('../../tokenizer/utils');

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
    it('should parse string constants', () => {
        const input = `let x = "test";`;
        const tokens = parseTokens(input);
        const result = tokens.map((token) => [token.getType(), token.getValue()]);
        expect(result).to.eql([
                ['KEYWORD', 'let'],
                ['IDENTIFIER', 'x'],
                ['SYMBOL', '='],
                ['STRING_CONST', '"test"'],
                ['SYMBOL', ';'],
        ]
        );
    });
});
