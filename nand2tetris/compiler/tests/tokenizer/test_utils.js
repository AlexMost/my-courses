const { expect } = require('chai');
const { parseLines, parseTokens } = require('../../tokenizer/utils');

describe('tokenizer utils parseTokens', () => {
    it('should parse tokens', () => {
        const input = `let x = 5;`;
        const tokens = parseTokens(input);
        const result = tokens.map((token) => [token.getType(), token.getValue()]);
        expect(result).to.eql([
                ['keyword', 'let'],
                ['identifier', 'x'],
                ['symbol', '='],
                ['integerConstant', 5],
                ['symbol', ';'],
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
                ['keyword', 'let'],
                ['identifier', 'x'],
                ['symbol', '='],
                ['stringConstant', 'test'],
                ['symbol', ';'],
        ]
        );
    });
});
