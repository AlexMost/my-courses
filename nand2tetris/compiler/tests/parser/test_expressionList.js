const { expect } = require('chai');
const parseExpressionList = require('../../parser/expressionList');
const { Tokenizer } = require('../../tokenizer');


const expectedSingle =
`<expressionList>
  <expression>
    <term>
      <identifier> x </identifier>
    </term>
  </expression>
  <symbol> , </symbol>
  <expression>
    <term>
      <identifier> y </identifier>
    </term>
    <symbol> + </symbol>
    <term>
      <integerConstant> 1 </integerConstant>
    </term>
  </expression>
</expressionList>`;


describe('parser expression list', () => {
    it('should parse expressionlist', () => {
        const input = `x, y + 1`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseExpressionList(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSingle);
    });
});
