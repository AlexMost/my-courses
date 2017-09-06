const { expect } = require('chai');
const { parseTokens } = require('../../tokenizer/utils');
const { dumpTokens } = require('../../tokenizer/dump');

const expected = 
`<tokens>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<integerConst> 5 </integerConst>
<symbol> ; </symbol>
</tokens>`

describe('tokenizer utils parseTokens', () => {
    it('should parse tokens', () => {
        const input = `let x = 5;`;
        const result = dumpTokens(parseTokens(input));
        expect(result).to.eql(expected);
    });
});
