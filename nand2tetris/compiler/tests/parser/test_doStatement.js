const { expect } = require('chai');
const parseDo = require('../../parser/doStatement');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<doStatement>
  <keyword> do </keyword>
  <identifier> Screen </identifier>
  <symbol> . </symbol>
  <identifier> setColor </identifier>
  <symbol> ( </symbol>
  <expressionList>
    <expression>
      <term>
        <keyword> false </keyword>
      </term>
    </expression>
  </expressionList>
  <symbol> ) </symbol>
  <symbol> ; </symbol>
</doStatement>`;

const expectedComplex =
`<doStatement>
  <keyword> do </keyword>
  <identifier> Screen </identifier>
  <symbol> . </symbol>
  <identifier> drawRectangle </identifier>
  <symbol> ( </symbol>
  <expressionList>
    <expression>
      <term>
        <symbol> ( </symbol>
        <expression>
          <term>
            <identifier> x </identifier>
          </term>
          <symbol> + </symbol>
          <term>
            <identifier> size </identifier>
          </term>
        </expression>
        <symbol> ) </symbol>
      </term>
      <symbol> - </symbol>
      <term>
        <integerConstant> 1 </integerConstant>
      </term>
    </expression>
    <symbol> , </symbol>
    <expression>
      <term>
        <identifier> y </identifier>
      </term>
    </expression>
    <symbol> , </symbol>
    <expression>
      <term>
        <identifier> x </identifier>
      </term>
      <symbol> + </symbol>
      <term>
        <identifier> size </identifier>
      </term>
    </expression>
    <symbol> , </symbol>
    <expression>
      <term>
        <identifier> y </identifier>
      </term>
      <symbol> + </symbol>
      <term>
        <identifier> size </identifier>
      </term>
    </expression>
  </expressionList>
  <symbol> ) </symbol>
  <symbol> ; </symbol>
</doStatement>`;

describe('parser letStatement', () => {
    it('should parse simple do statement', () => {
        const input = 'do Screen.setColor(false);';
        const tokenizer = new Tokenizer(input);
        const astNode = parseDo(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
    it('should parse do statement', () => {
        const input = 'do Screen.drawRectangle((x + size) - 1, y, x + size, y + size);';
        const tokenizer = new Tokenizer(input);
        const astNode = parseDo(tokenizer);
        expect(astNode.toXML()).to.eql(expectedComplex);
    });
});
