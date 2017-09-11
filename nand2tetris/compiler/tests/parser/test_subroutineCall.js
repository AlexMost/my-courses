const { expect } = require('chai');
const parseCall = require('../../parser/subroutineCall');
const { Tokenizer } = require('../../tokenizer');


const expectedSingle =
`<subroutineCall>
<identifier> x </identifier>
<symbol> ( </symbol>
<expressionList>
</expressionList>
<symbol> ) </symbol>
</subroutineCall>`;


const methodCall =
`<subroutineCall>
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
</subroutineCall>`;

describe('parser expression', () => {
    it('should parse function call', () => {
        const input = `x()`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseCall(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSingle);
    });
    it('should parse method call', () => {
        const input = `User.test(a, b, c)`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseCall(tokenizer);
        expect(astNode.toXML()).to.eql(methodCall);
    });
});
