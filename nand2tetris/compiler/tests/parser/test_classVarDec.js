const { expect } = require('chai');
const parseVarDec = require('../../parser/classVarDec');
const { Tokenizer } = require('../../tokenizer');


const expectedSingle =
`<classVarDec>
<keyword> static </keyword>
<keyword> boolean </keyword>
<identifier> test </identifier>
<symbol> ; </symbol>
</classVarDec>`;

const expectedMul =
`<classVarDec>
<keyword> field </keyword>
<keyword> int </keyword>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> ; </symbol>
</classVarDec>`;

describe('parser classVarDec', () => {
    it('should parse single declaration', () => {
        const input = `static boolean test;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedSingle);
    });

    it('should parse multi declaration', () => {
        const input = `field int x, y;`;
        const tokenizer = new Tokenizer(input);
        const astNode = parseVarDec(tokenizer);
        expect(astNode.toXML()).to.eql(expectedMul);
    });
});
