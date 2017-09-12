const { expect } = require('chai');
const parseIfStatement = require('../../parser/ifStatement');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<ifStatement>
  <keyword> if </keyword>
  <symbol> ( </symbol>
  <expression>
    <term>
      <identifier> i </identifier>
    </term>
  </expression>
  <symbol> ) </symbol>
  <symbol> { </symbol>
  <statements>
    <letStatement>
      <keyword> let </keyword>
      <identifier> s </identifier>
      <symbol> = </symbol>
      <expression>
        <term>
          <identifier> i </identifier>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
    <letStatement>
      <keyword> let </keyword>
      <identifier> s </identifier>
      <symbol> = </symbol>
      <expression>
        <term>
          <identifier> j </identifier>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
    <letStatement>
      <keyword> let </keyword>
      <identifier> a </identifier>
      <symbol> [ </symbol>
      <expression>
        <term>
          <identifier> i </identifier>
        </term>
      </expression>
      <symbol> ] </symbol>
      <symbol> = </symbol>
      <expression>
        <term>
          <identifier> j </identifier>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
  </statements>
  <symbol> } </symbol>
</ifStatement>`;


describe('parser ifStatement', () => {
    it('should parse simple if statement', () => {
        const input = `
        if (i) {
            let s = i;
            let s = j;
            let a[i] = j;
        }
        `;
        const tokenizer = new Tokenizer(input);
        const astNode = parseIfStatement(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });
});
