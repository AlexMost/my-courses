const { expect } = require('chai');
const parseCall = require('../../parser/subroutineCall');
const { Tokenizer } = require('../../tokenizer');
const { ASTNode } = require('../../parser/types');


const expectedSingle =
`<term>
<identifier> x </identifier>
<symbol> ( </symbol>
<expressionList>
</expressionList>
<symbol> ) </symbol>
</term>`;


const methodCall =
`<term>
<identifier> User </identifier>
<symbol> . </symbol>
<identifier> test </identifier>
<symbol> ( </symbol>
<expressionList>
<expression>
<term>
<identifier> a </identifier>
</term>
</expression>
<symbol> , </symbol>
<expression>
<term>
<identifier> b </identifier>
</term>
</expression>
<symbol> , </symbol>
<expression>
<term>
<identifier> c </identifier>
</term>
</expression>
</expressionList>
<symbol> ) </symbol>
</term>`;

describe('parser expression', () => {
    it('should parse function call', () => {
        const input = `x()`;
        const tokenizer = new Tokenizer(input);
        const astNode = new ASTNode('term', parseCall(tokenizer));
        expect(astNode.toXML()).to.eql(expectedSingle);
    });
    it('should parse method call', () => {
        const input = `User.test(a, b, c)`;
        const tokenizer = new Tokenizer(input);
        const astNode = new ASTNode('term', parseCall(tokenizer));
        expect(astNode.toXML()).to.eql(methodCall);
    });
});
