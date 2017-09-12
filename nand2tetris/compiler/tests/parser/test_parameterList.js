const { expect } = require('chai');
const parseVarDec = require('../../parser/parameterList');
const { Tokenizer } = require('../../tokenizer');


const expectedSimple =
`<parameterList>
  <keyword> int </keyword>
  <identifier> a </identifier>
</parameterList>`;

const expectedMultiple =
`<parameterList>
  <keyword> int </keyword>
  <identifier> a </identifier>
  <symbol> , </symbol>
  <keyword> boolean </keyword>
  <identifier> b </identifier>
  <symbol> , </symbol>
  <keyword> int </keyword>
  <identifier> z </identifier>
</parameterList>`;

describe('parser parameter list', () => {
    it('should parse single parameter', () => {
        const input = `int a`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSimple);
    });

    it('should parse multiple parameters', () => {
        const input = `int a, boolean b, int z`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedMultiple);
    });
});
