const { expect } = require('chai');
const parseVarDec = require('../../parser/letStatement');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<letStatement>
  <keyword> let </keyword>
  <identifier> size </identifier>
  <symbol> = </symbol>
  <expression>
    <term>
      <identifier> size </identifier>
    </term>
  </expression>
  <symbol> ; </symbol>
</letStatement>`;

const expectedComputed =
`<letStatement>
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
</letStatement>`;

describe('parser letStatement', () => {
    it('should parse simple statement', () => {
        const input = 'let size = size;';
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });

    it('should parse computed properties', () => {
        const input = 'let a[i] = j;';
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedComputed);
    });
});
