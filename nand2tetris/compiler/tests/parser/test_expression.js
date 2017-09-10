const { expect } = require('chai');
const parseExpression = require('../../parser/expression');
const { Tokenizer } = require('../../tokenizer');


const expectedSingle =
`<expression>
<term>
<identifier> x </identifier>
</term>
</expression>`;

const expectedMultiple =
`<expression>
<term>
<identifier> x </identifier>
</term>
<symbol> + </symbol>
<term>
<identifier> y </identifier>
</term>
</expression>`;

describe('parser expression', () => {
    it('should parse single expression', () => {
        const input = `x`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseExpression(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSingle);
    });
    it('should parse multiple expressions', () => {
        const input = `x + y`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseExpression(tokenizer);
        expect(astNode.toXML()).to.eql(expectedMultiple);
    });
});
