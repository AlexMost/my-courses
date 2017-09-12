const { expect } = require('chai');
const parseVarDec = require('../../parser/returnStatement');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<returnStatement>
  <keyword> return </keyword>
  <symbol> ; </symbol>
</returnStatement>`;


const expectedExpression =
`<returnStatement>
  <keyword> return </keyword>
  <expression>
    <term>
      <identifier> x </identifier>
    </term>
  </expression>
  <symbol> ; </symbol>
</returnStatement>`;

describe('parser return statement', () => {
    it('should parse void return', () => {
        const input = `return;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });

    it('should parse return expression', () => {
        const input = `return x;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedExpression);
    });
});
