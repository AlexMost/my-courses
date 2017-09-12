const { expect } = require('chai');
const parseWhileStatement = require('../../parser/whileStatement');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<whileStatement>
  <keyword> while </keyword>
  <symbol> ( </symbol>
  <expression>
    <term>
      <identifier> x </identifier>
    </term>
  </expression>
  <symbol> ) </symbol>
  <symbol> { </symbol>
  <statements>
    <letStatement>
      <keyword> let </keyword>
      <identifier> a </identifier>
      <symbol> = </symbol>
      <expression>
        <term>
          <integerConstant> 1 </integerConstant>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
  </statements>
  <symbol> } </symbol>
</whileStatement>`;


describe('parser whileStatement', () => {
    it('should parse simple while statement', () => {
        const input = `
        while(x) {
            let a = 1;
        }
        `;
        const tokenizer = new Tokenizer(input);
        const astNode = parseWhileStatement(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
});
