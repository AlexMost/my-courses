const { expect } = require('chai');
const parseVarDec = require('../../parser/varDec');
const { Tokenizer } = require('../../tokenizer');


const expectedMul =
`<varDec>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> i </identifier>
<symbol> , </symbol>
<identifier> sum </identifier>
<symbol> ; </symbol>
</varDec>`;

const expectedSingle =
`<varDec>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> x </identifier>
<symbol> ; </symbol>
</varDec>`;

describe('parser varDec', () => {
    it('should parse varDec', () => {
        const input = `var int x;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSingle);
    });
    it('should parse multiple varDec', () => {
        const input = `var int i, sum;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedMul);
    });
    it('should throw', () => {
        const input = `var 5 i, sum;`;
        const tokenizer = new Tokenizer(input);
        const fn = () => parseVarDec(tokenizer);
        expect(fn).to.throw('Unexpected token \'5\', identifier expected');
    });
});
